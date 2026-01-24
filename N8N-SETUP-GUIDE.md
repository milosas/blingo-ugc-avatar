# n8n Workflow Setup Guide - UGC Avatar Generator

Šis dokumentas paaiškina, kaip sukurti n8n workflow Phase 2 (Backend) daliai.

## Prieš pradedant

Reikia turėti:
- ✅ Prieigą prie n8n instance (Hostinger)
- ✅ kie.ai API key arba OpenAI API key
- ✅ Frontend kodą (Phase 1) jau sukurtą

---

## Workflow Architektūra

```
┌─────────────────┐
│ Webhook Trigger │ POST /webhook/generate-ugc
└────────┬────────┘
         │
         ↓
┌────────────────────┐
│ Validate Input     │ (Optional) Check if config is valid
└────────┬───────────┘
         │
         ↓
┌────────────────────┐
│ Generate 3 Prompts │ Code Node: n8n-prompt-generator.js
└────────┬───────────┘
         │
         ↓
┌────────────────────┐
│ Split Into Batches │ Process 3 items (far, close, veryClose)
└────────┬───────────┘
         │
         ↓
┌────────────────────┐
│ HTTP Request       │ Loop: Call OpenAI/kie.ai 3 times
│ (kie.ai/OpenAI)    │ Size: 1024x1792
└────────┬───────────┘
         │
         ↓
┌────────────────────┐
│ Format Response    │ Code Node: n8n-response-formatter.js
└────────┬───────────┘
         │
         ↓
┌────────────────────┐
│ Respond to Webhook │ Return JSON with 3 image URLs
└────────────────────┘

[Error Trigger] → [Error Handler] → [Respond with Error]
```

---

## Step-by-Step Setup

### Node 1: Webhook Trigger

1. Pridėk **Webhook** node
2. Nustatymai:
   - **HTTP Method**: POST
   - **Path**: `generate-ugc` (arba kitas)
   - **Response Mode**: `Wait for Response`
   - **Response Code**: 200

**Test URL bus**: `https://your-n8n.hostinger.com/webhook/generate-ugc`

**Expected Webhook Input**:
```json
{
  "image": "base64-encoded-string-of-clothing-photo",
  "config": {
    "avatar": "modern-city",
    "scene": "studio",
    "style": "casual"
  }
}
```

---

### Node 2: Generate Prompts (Code Node)

1. Pridėk **Code** node
2. **Mode**: Run Once for All Items
3. Įkopijuok kodą iš failo: `n8n-prompt-generator.js`

Šis node:
- Paima webhook input
- Susiranda avatar/scene/style aprašymus
- Sugeneruoja 3 prompt'us (far, close, veryClose)
- Grąžina array su 3 objektais

**Output** (3 items):
```json
[
  { "angle": "far", "prompt": "Full body shot of..." },
  { "angle": "close", "prompt": "Medium shot of..." },
  { "angle": "veryClose", "prompt": "Close-up shot of..." }
]
```

---

### Node 3: Split Into Batches

1. Pridėk **Split In Batches** node
2. Nustatymai:
   - **Batch Size**: 1
   - **Options**: Reset

Šis node sukuria loop'ą, kuris kiekvieną prompt'ą apdoros atskirai.

---

### Node 4: HTTP Request (OpenAI API per kie.ai)

1. Pridėk **HTTP Request** node
2. Nustatymai:
   - **Method**: POST
   - **URL**: `https://api.kie.ai/v1/images/generations`
     (arba jei naudoji tiesiai OpenAI: `https://api.openai.com/v1/images/generations`)

3. **Authentication**: Generic Credential Type
   - **Header Auth**: Authorization
   - **Value**: `Bearer YOUR_KIE_AI_API_KEY`

4. **Headers**:
   ```json
   {
     "Content-Type": "application/json"
   }
   ```

5. **Body** (JSON):
   ```json
   {
     "model": "dall-e-3",
     "prompt": "={{ $json.prompt }}",
     "size": "1024x1792",
     "quality": "hd",
     "n": 1
   }
   ```

6. **Options**:
   - **Timeout**: 45000 (45 sekundės)
   - **Response**: Auto-detect

**OpenAI Response Structure**:
```json
{
  "created": 1234567890,
  "data": [
    {
      "url": "https://oaidalleapiprodscus.blob.core.windows.net/...",
      "revised_prompt": "..."
    }
  ]
}
```

---

### Node 5: Loop Back to Split In Batches

1. Sujunk HTTP Request node atgal į **Split In Batches** node
2. Tai sukurs loop'ą, kuris 3 kartus iškviečia OpenAI API

---

### Node 6: Format Response (Code Node)

1. Pridėk **Code** node AFTER Split In Batches (kai loop baigiasi)
2. **Mode**: Run Once for All Items
3. Įkopijuok kodą iš failo: `n8n-response-formatter.js`

Šis node:
- Paima visus 3 OpenAI response'us
- Ištraukia image URL iš kiekvieno
- Suformatuoja galutinį JSON frontend'ui

**Output**:
```json
{
  "success": true,
  "images": [
    { "angle": "far", "url": "https://...", "prompt": "..." },
    { "angle": "close", "url": "https://...", "prompt": "..." },
    { "angle": "veryClose", "url": "https://...", "prompt": "..." }
  ],
  "generatedAt": "2025-01-24T12:34:56.789Z",
  "count": 3
}
```

---

### Node 7: Respond to Webhook

1. Pridėk **Respond to Webhook** node
2. **Mode**: Using 'Respond to Webhook' Node
3. **Response**: `={{ $json }}`

Šis node grąžins JSON atgal frontend'ui.

---

## Error Handling Setup

### Node 8: Error Trigger

1. Pridėk **Error Trigger** node (atskirame workflow šakoje)
2. **Trigger On**: Workflow Error

---

### Node 9: Error Handler (Code Node)

1. Pridėk **Code** node prie Error Trigger
2. **Mode**: Run Once for All Items
3. Įkopijuok kodą iš failo: `n8n-error-handler.js`

Šis node:
- Paima error informaciją
- Suformatuoja lietuvišką klaidos pranešimą
- Grąžina error response

---

### Node 10: Respond to Webhook (Error Path)

1. Pridėk **Respond to Webhook** node
2. Sujunk su Error Handler
3. **Response**: `={{ $json }}`
4. **Response Code**: 500

---

## Testing Workflow

### Test 1: Manual Test n8n UI

1. Spausk "Execute Workflow" n8n editor'iuje
2. n8n sukurs test webhook URL
3. Naudok test data:
   ```json
   {
     "image": "test-base64-string",
     "config": {
       "avatar": "modern-city",
       "scene": "studio",
       "style": "casual"
     }
   }
   ```

### Test 2: cURL Test

```bash
curl -X POST https://your-n8n.hostinger.com/webhook/generate-ugc \
  -H "Content-Type: application/json" \
  -d '{
    "image": "base64...",
    "config": {
      "avatar": "elegant",
      "scene": "urban",
      "style": "formal"
    }
  }'
```

### Test 3: Frontend Integration Test

1. Gauk webhook URL iš n8n (production URL)
2. Įrašyk URL į frontend ENV variable
3. Spausk "Generuoti" mygtuke frontend'e
4. Turėtų veikti pilnas flow

---

## Troubleshooting

### Klaida: "Invalid API Key"
- Patikrink kie.ai API key
- Įsitikink, kad naudoji `Bearer YOUR_KEY` formatu

### Klaida: "Timeout"
- Padidink timeout Node 4 (HTTP Request) settings
- Sumažink image quality arba size

### Klaida: "Invalid configuration"
- Patikrink ar avatar/scene/style ID atitinka konstantose
- Įsitikink kad frontend siunčia teisingą config objektą

### Nuotraukos negeneruojasi
- Patikrink OpenAI API balance
- Pažiūrėk n8n execution logs
- Įsitikink kad prompt'ai yra aiškūs

---

## Performance Optimization

| Optimizacija | Aprašymas | Poveikis |
|--------------|-----------|----------|
| Parallel API calls | Vietoj Split In Batches, naudok 3 atskirus HTTP nodes | -20-30s |
| Lower quality | Naudok `quality: "standard"` vietoj `"hd"` | -10-15s |
| Smaller size | Naudok `1024x1024` vietoj `1024x1792` | -5-10s |
| Cache responses | Talpink jau sugeneruotas nuotraukas | Instant |

---

## Next Steps

✅ Kai workflow veikia ir grąžina 3 nuotraukas:
1. **Išsaugok webhook production URL**
2. **Test su real clothing images**
3. **Document API usage costs**
4. **Move to Phase 3**: Frontend integration

---

## Workflow Export/Backup

1. n8n: Workflows → Your Workflow → "..." → Download
2. Išsaugok JSON failą git repository: `.n8n/ugc-generator-workflow.json`
3. Version control workflow changes

---

*Created: 2025-01-24*
*For: UGC Avatar Generator - Phase 2*

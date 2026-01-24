#!/bin/bash

# Test n8n Webhook for UGC Avatar Generator
# Usage: ./test-webhook.sh <webhook-url>

# Check if URL provided
if [ -z "$1" ]; then
  echo "Usage: ./test-webhook.sh <webhook-url>"
  echo "Example: ./test-webhook.sh https://your-n8n.hostinger.com/webhook/generate-ugc"
  exit 1
fi

WEBHOOK_URL="$1"

echo "Testing n8n webhook: $WEBHOOK_URL"
echo ""

# Test payload
PAYLOAD='{
  "image": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "config": {
    "avatar": "modern-city",
    "scene": "studio",
    "style": "casual"
  }
}'

echo "Sending request..."
echo "Payload:"
echo "$PAYLOAD" | jq '.'
echo ""

# Send request and measure time
START_TIME=$(date +%s)

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

# Extract HTTP code (last line) and body (everything else)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "Response Code: $HTTP_CODE"
echo "Duration: ${DURATION}s"
echo ""
echo "Response Body:"
echo "$BODY" | jq '.'

# Check if successful
if [ "$HTTP_CODE" -eq 200 ]; then
  echo ""
  echo "✅ SUCCESS! Workflow completed successfully."

  # Count images
  IMAGE_COUNT=$(echo "$BODY" | jq '.images | length')
  echo "Generated $IMAGE_COUNT images:"

  echo "$BODY" | jq -r '.images[] | "  - \(.angle): \(.url)"'
else
  echo ""
  echo "❌ FAILED! HTTP $HTTP_CODE"

  # Show error details
  ERROR_MSG=$(echo "$BODY" | jq -r '.error.message // "No error message"')
  ERROR_DETAILS=$(echo "$BODY" | jq -r '.error.details // ""')

  echo "Error: $ERROR_MSG"
  if [ -n "$ERROR_DETAILS" ]; then
    echo "Details: $ERROR_DETAILS"
  fi
fi

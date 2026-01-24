# Test n8n Webhook for UGC Avatar Generator (PowerShell)
# Usage: .\test-webhook.ps1 -WebhookUrl "https://your-n8n.hostinger.com/webhook/generate-ugc"

param(
    [Parameter(Mandatory=$true)]
    [string]$WebhookUrl
)

Write-Host "Testing n8n webhook: $WebhookUrl" -ForegroundColor Cyan
Write-Host ""

# Test payload (minimal base64 test image)
$payload = @{
    image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    config = @{
        avatar = "modern-city"
        scene = "studio"
        style = "casual"
    }
} | ConvertTo-Json -Depth 10

Write-Host "Sending request..." -ForegroundColor Yellow
Write-Host "Payload:" -ForegroundColor Gray
Write-Host $payload
Write-Host ""

# Measure time
$startTime = Get-Date

try {
    # Send request
    $response = Invoke-WebRequest -Uri $WebhookUrl `
        -Method POST `
        -ContentType "application/json" `
        -Body $payload `
        -UseBasicParsing

    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalSeconds

    Write-Host "Response Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Duration: $([math]::Round($duration, 2))s" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Response Body:" -ForegroundColor Gray

    # Parse and display JSON response
    $jsonResponse = $response.Content | ConvertFrom-Json
    $jsonResponse | ConvertTo-Json -Depth 10

    Write-Host ""
    Write-Host "✅ SUCCESS! Workflow completed successfully." -ForegroundColor Green

    # Count and display images
    $imageCount = $jsonResponse.images.Count
    Write-Host "Generated $imageCount images:" -ForegroundColor Cyan

    foreach ($image in $jsonResponse.images) {
        Write-Host "  - $($image.angle): $($image.url)" -ForegroundColor White
    }

} catch {
    $endTime = Get-Date
    $duration = ($endTime - $startTime).TotalSeconds

    Write-Host "Response Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host "Duration: $([math]::Round($duration, 2))s" -ForegroundColor Gray
    Write-Host ""
    Write-Host "❌ FAILED!" -ForegroundColor Red

    # Try to parse error response
    $errorStream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorStream)
    $errorBody = $reader.ReadToEnd()

    try {
        $errorJson = $errorBody | ConvertFrom-Json
        Write-Host "Error: $($errorJson.error.message)" -ForegroundColor Red
        if ($errorJson.error.details) {
            Write-Host "Details: $($errorJson.error.details)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "Raw Error:" -ForegroundColor Red
        Write-Host $errorBody
    }
}

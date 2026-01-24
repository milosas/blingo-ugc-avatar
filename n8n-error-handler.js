/**
 * n8n Code Node: Error Handler
 *
 * This code handles errors from the workflow and formats
 * error responses in Lithuanian for the frontend.
 *
 * Place this in the Error Trigger workflow path.
 */

// Get error information
const error = $input.first().json;

// Determine error type and create appropriate Lithuanian message
let errorCode = 'UNKNOWN_ERROR';
let errorMessage = 'Įvyko nežinoma klaida';
let errorDetails = '';

// Check for specific error types
if (error.message?.includes('API') || error.message?.includes('request')) {
  errorCode = 'API_ERROR';
  errorMessage = 'Nepavyko susisiekti su AI generavimo paslauga';
  errorDetails = 'Patikrinkite API rakto galiojimą ir tinklo ryšį';
} else if (error.message?.includes('timeout')) {
  errorCode = 'TIMEOUT_ERROR';
  errorMessage = 'Generavimas užtruko per ilgai';
  errorDetails = 'Bandykite dar kartą. Jei problema kartojasi, susisiekite su administratoriumi';
} else if (error.message?.includes('rate limit')) {
  errorCode = 'RATE_LIMIT';
  errorMessage = 'Viršytas API užklausų limitas';
  errorDetails = 'Palaukite kelias minutes ir bandykite dar kartą';
} else if (error.message?.includes('Invalid configuration')) {
  errorCode = 'INVALID_CONFIG';
  errorMessage = 'Neteisingi nustatymai';
  errorDetails = 'Patikrinkite pasirinkto avataro, scenos ir stiliaus duomenis';
} else {
  // Generic error
  errorCode = 'GENERATION_FAILED';
  errorMessage = 'Nepavyko sugeneruoti nuotraukų';
  errorDetails = error.message || 'Bandykite dar kartą';
}

// Create error response
const errorResponse = {
  success: false,
  error: {
    code: errorCode,
    message: errorMessage,
    details: errorDetails,
    timestamp: new Date().toISOString()
  }
};

// Log error for debugging
console.error('Workflow Error:', {
  code: errorCode,
  originalError: error.message,
  timestamp: new Date().toISOString()
});

// Return error response
return [{ json: errorResponse }];

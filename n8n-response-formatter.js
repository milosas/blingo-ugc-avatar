/**
 * n8n Code Node: Format Response
 *
 * This code formats the OpenAI API responses into the final response
 * that will be sent back to the frontend.
 *
 * Input: Array of OpenAI API responses with image URLs
 * Output: Formatted JSON response for frontend
 */

// Get all items from previous node (should be 3 OpenAI responses)
const items = $input.all();

// Extract image data from each response
const images = items.map((item, index) => {
  const data = item.json;

  // OpenAI API response structure: data.data[0].url
  const imageUrl = data.data?.[0]?.url;
  const revisedPrompt = data.data?.[0]?.revised_prompt;

  // Get angle from the original prompt data
  const angles = ['far', 'close', 'veryClose'];
  const angle = angles[index] || 'unknown';

  return {
    angle: angle,
    url: imageUrl,
    prompt: revisedPrompt || 'No prompt available'
  };
});

// Create final response
const response = {
  success: true,
  images: images,
  generatedAt: new Date().toISOString(),
  count: images.length
};

// Return formatted response
return [{ json: response }];

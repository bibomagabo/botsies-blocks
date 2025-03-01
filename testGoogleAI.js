const { PredictionServiceClient } = require('@google-cloud/aiplatform');

// Initialize the Prediction Service Client
const client = new PredictionServiceClient({
  keyFilename: '/home/magabobibo/gcloud-keys/botsies-v1-0b68d178bf31.json', // Full path to your JSON key file
});

async function testGoogleAI() {
  const project = 'YOUR_PROJECT_ID'; // Replace with your project ID
  const location = 'us-central1';   // Adjust if your AI model is in another region
  const endpoint = `projects/botsies-v1/locations/us-central1/publishers/google/models/gemini-001`;
  
  const prompt = 'Hello, world!';

  const instances = [
    { content: prompt }, // Your input prompt
  ];

  try {
    const [response] = await client.predict({
      endpoint,
      instances,
      parameters: {},
    });

    console.log('AI Response:', response.predictions[0].content);
  } catch (error) {
    console.error('Error accessing Google AI:', error);
  }
}

testGoogleAI();

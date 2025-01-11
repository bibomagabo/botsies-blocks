// Simulate an asynchronous API call to process messages
export async function fetchChatResponse(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (message.toLowerCase().includes('error')) {
        reject(new Error('API error occurred.'));
      } else {
        resolve({ response: `You said: "${message}"` });
      }
    }, 500); // Simulate network delay (500ms)
  });
}

import axios from 'axios';

export const fetchChatResponse = async (input) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
      { input },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; // Return the response data from the server
  } catch (error) {
    console.error('Error fetching chat response:', error.message);
    throw new Error('Failed to fetch chat response');
  }
};

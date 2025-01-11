export const fetchGPTResponse = async (input) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input }),
        });

        const data = await response.json();
        return { response: data.response };
    } catch (error) {
        console.error('Error fetching GPT response:', error);
        return { response: 'Sorry, something went wrong. Please try again later.' };
    }
};

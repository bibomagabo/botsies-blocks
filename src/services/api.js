// Base URL for the backend API
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Function to fetch GPT response for general chat
export const fetchBotResponse = async (input) => {
    console.log('Sending input to backend:', input); // Debug input
    try {
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input }),
        });

        const data = await response.json();
        console.log('Backend response:', data); // Debug response
        return data.response; // Return the GPT response
    } catch (error) {
        console.error('Error fetching bot response:', error);
        return 'Server unavailable. Try again later.';
    }
};

// Function to audit coaching transcripts
export const auditTranscript = async (transcript) => {
    console.log('Sending transcript to backend for auditing:', transcript); // Debug transcript
    try {
        const response = await fetch(`${BACKEND_URL}/api/assistant/audit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transcript }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response from API');
        }

        const data = await response.json();
        console.log('Backend audit response:', data); // Debug response
        return data.response; // Return the audit results
    } catch (error) {
        console.error('Error auditing transcript:', error);
        throw error; // Rethrow error for handling in the caller function
    }
};

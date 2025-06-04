import { useCallback } from "react";

const Service = () => {
    const _apiBase = import.meta.env.VITE_API_BASE;

    const makeRequest = useCallback(
        async (endpoint, body) => {
            try {
                const response = await fetch(`${_apiBase}${endpoint}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                console.error("API request failed:", error);
                throw error;
            }
        },
        [_apiBase]
    );

    const writeEQS = async (message) => {
        const data = await makeRequest('/write/EQS', { message });
        return data;
    }

    const readEQS = async (m, s, e, n) => {
        const data = await makeRequest('/read/EQS', { m, s, e, n });
        return data.isValid;
    }
    
    const writeEQS2 = async (message) => {
        const data = await makeRequest('/write/EQS2', { message });
        return data.result;
    }

    const readEQS2 = async (message, publicKey, signature) => {
        const data = await makeRequest('/read/EQS2', { message, publicKey, signature });
        return data.isValid;
    }

    return { 
        writeEQS,
        readEQS,
        writeEQS2,
        readEQS2
    };
};

export default Service;
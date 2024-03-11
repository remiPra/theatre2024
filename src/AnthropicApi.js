import React, { useState } from 'react';

const Anthropic = () => {
    const [response, setResponse] = useState('');
    const [inputContent, setInputContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const apiUrl = 'https://api.anthropic.com/v1/messages'; // Supposant que vous avez configuré un proxy pour rediriger vers https://api.anthropic.com
        const apiUrl = '/v1/messages'; // Supposant que vous avez configuré un proxy pour rediriger vers https://api.anthropic.com
        const requestBody = {
            model: "claude-3-opus-20240229",
            max_tokens: 1024,
            messages: [{
                role: "user",
                content: inputContent
            }]
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.REACT_APP_ANTHROPIC_KEY, // Assurez-vous que cette variable d'environnement est définie
                    'anthropic-version': '2023-06-01' // La version de l'API comme spécifié dans la documentation
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResponse(data);
        } catch (error) {
            console.error("Erreur lors de l'appel à l'API Anthropic:", error);
        }
    };

    return (
        <div>
            <form className='' onSubmit={handleSubmit}>
                <textarea className='h-[50px] bg-transparent'
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                    placeholder="Entrez votre message ici"
                />
                <button type="submit">Envoyer</button>
            </form>
            {response && response.content && (
                <div>
                    {response.content.map((message, index) => (
                        <p key={index}>{message.text}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Anthropic;

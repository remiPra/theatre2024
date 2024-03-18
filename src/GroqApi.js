import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone } from "react-icons/fa";

const GroqApiComponent = () => {
    const [response, setResponse] = useState('');
    const [inputContent, setInputContent] = useState('');
    const textareaRef = useRef(null);

    const [voice, setVoice] = useState(null);


    const [utterance, setUtterance] = useState(null);

    useEffect(() => {
        const synth = window.speechSynthesis;
        function setVoiceList() {
            setVoice(synth.getVoices()[0]);
        }

        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = setVoiceList;
        }

        // Assurez-vous de supprimer l'event listener quand le composant est démonté ou mis à jour
        return () => {
            synth.onvoiceschanged = null;
        };
    }, []);

    useEffect(() => {
        // Cette fonction est appelée à chaque mise à jour de inputContent pour ajuster la hauteur
        const adjustHeight = () => {
            if (textareaRef.current) {
                textareaRef.current.style.height = 'inherit'; // Réinitialiser la hauteur pour obtenir la hauteur de défilement correcte
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajuster la hauteur au contenu
            }
        };

        adjustHeight();
    }, [inputContent]); // Se déclenche chaque fois que inputContent change

    //speech
    useEffect(() => {
        startAudio();
        // Stop listening when the component is unmounted or updated
        return () => {
            SpeechRecognition.stopListening();
        }
    }, [])

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    // À chaque mise à jour du transcript, mettez à jour l'état de l'inputContent
    useEffect(() => {
        setInputContent(transcript);
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const startAudio = () => {
        SpeechRecognition.startListening({ language: 'fr-FR', continuous: true });
    }

    const stopAudio = () => {
        SpeechRecognition.stopListening();
    }

    const handleReset = () => {
        resetTranscript();
        setInputContent('');
    }

    const cancelSpeech = () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        stopAudio()
        // const GROQ_API_KEY = 'votre_clé_api_ici'; // Remplacez avec votre clé API réelle
        const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

        const requestBody = {
            messages: [{
                role: "user",
                content: inputContent + "réponds en francais uniquement"
            }],
            model: "mixtral-8x7b-32768",
            temperature: 0.5,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            console.log(data)
            setResponse(data.choices[0].message.content); // Vous pouvez ajuster selon la structure de réponse
            // Parlez après avoir reçu la réponse
            const synth = window.speechSynthesis;
            if (voice) {
                const utterance = new SpeechSynthesisUtterance(data.choices[0].message.content);
                utterance.voice = voice;
                utterance.volume = 1; // La valeur de volume doit être entre 0 et 1
                synth.speak(utterance);
            }




        } catch (error) {
            console.error("Erreur lors de l'appel à l'API GROQ:", error);
        }
    };

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button className='bg-white border-2 border-black rounded-lg p-2 m-2'
                onClick={startAudio}><FaMicrophone /></button>
            <button className='bg-white border-2 border-black rounded-lg p-2 m-2'
                onClick={stopAudio}>Stop</button>
            <button className='bg-white border-2 border-black rounded-lg p-2 m-2'
                onClick={handleReset}>Reset</button>
            <button className='bg-white border-2 border-black rounded-lg p-2 m-2' onClick={cancelSpeech}>Arrêter la parole</button>
            <form className='absolute flex h-[40px] items-center bottom-2.5 left-0 w-full bg-cornflowerblue px-4' onSubmit={handleSubmit}>
                <textarea className='flex-1 h-full rounded-2xl bg-white text-blue-700 p-2'
                    value={inputContent}
                    // onChange={(e) => setInputContent(e.target.value)}
                    placeholder="Entrez votre message ici"
                    onChange={(e) => setInputContent(e.target.value)}
                    rows="1" // Commence avec une seule ligne

                />
                <button className='h-full px-6 bg-blue-500 text-white rounded-full' type="submit">Envoyer</button>
            </form>

            <div>
                <p>{response}</p>
                {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
            </div>
        </div>
    );
};

export default GroqApiComponent;

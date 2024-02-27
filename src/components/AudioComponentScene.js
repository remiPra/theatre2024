import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone } from "react-icons/fa";

const Dictaphone = (props) => {
    
    useEffect(()=>{
        startAudio()
    },[])
    ///////////////////////////////////////////////////////
    const [comparison, setComparison] = useState([]);

    const createWordObjects = (sentence) => {
        return sentence.split(/\s+/).map((word, index) => ({ word, position: index }));
    };

    const compareTranscripts = () => {
        const originalWords = createWordObjects(props.replique.line);
        const transcriptWords = createWordObjects(transcript);
    
        const comparisonResult = originalWords.map((originalWordObj, index) => {
            const transcriptWordObj = transcriptWords[index] || {};
            // Vérifiez si le mot du transcript existe avant de comparer
            const isCorrect = transcriptWordObj.word
                ? originalWordObj.word.toLowerCase() === transcriptWordObj.word.toLowerCase()
                : false;
            return {
                ...originalWordObj,
                correct: isCorrect,
            };
        });
    
        setComparison(comparisonResult);
    };
    
    /////////////////////////////////////////




    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const [register, setRegister] = useState(false)
    const [compareLine, setCompareLine] = useState(false)

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }




    const startAudio = () => {
        Reset()
        SpeechRecognition.startListening({ language: 'fr-FR', continuous: true })
        setCompareLine(false)
        setRegister(true)
    }

    const stopAudio = () => {
        SpeechRecognition.stopListening()
        setRegister(false)
        setCompareLine(true)
        console.log(transcript)
        compareTranscripts()

    }
    const Reset = () => {
        resetTranscript()
        setRegister(false)
        setCompareLine(false)
    }


    return (
        <div className='p-5 rounded-lg mt-5 mx-[20%] flex flex-col text-center bg-white '>
            <p>Microphone: {props.replique.line_number} {listening ? 'on' : 'off'}</p>
            {/* {compareLine && JSON.stringify(props.replique)} */}
            <div>
                {register && <><p className='flex justify-center'><FaMicrophone 
                className='text-[30px] mt-4 mb-2'/></p>
                <p>Attention ca enregistre !</p>
                </>} 
                {!register &&
                    <button className='bg-white border-2 border-black rounded-lg p-2 m-2'
                        onClick={() => startAudio()}>Start</button>}
                {register && <button className='bg-white border-2 border-black rounded-lg p-2 m-2'
                    onClick={() => stopAudio()}>Stop</button>}
                {/* {!register && <button className='bg-white border-2 border-black rounded-lg p-2 m-2' onClick={Reset}>Reset</button>} */}
              {!register &&
              <button className='bg-white border-2 border-black rounded-lg p-2 m-2' onClick={props.onclose}>Quitter</button>
              }  
            </div>
           {compareLine &&  <p className='mt-2 font-bold'>Vous avez dit : </p>}
            <p>{transcript}</p>
           {compareLine!="" && <> <div>
            <p className='mt-2 font-bold'>
                La réplique exact est : 
                </p>
                {comparison.map((wordObj, index) => (
                    <span key={index} style={{ color: wordObj.correct ? 'green' : 'red' }}>
                        {wordObj.word}{' '}
                    </span>
                ))}
            </div>
            </>}

        </div>
    );
};
export default Dictaphone;
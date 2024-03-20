import React, { useEffect, useRef, useState } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

function TrainingScene(props) {
    const [audios, setAudios] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const audioElementRef = useRef(null); // Référence pour l'élément audio actuellement en lecture
    const timeoutRef = useRef(null); // Référence pour le timeout actuel
    const [play,setPlay] = useState(true)
 
    useEffect(() => {
        const storage = getStorage();
        const fetchUrls = props.repliques[0].lines.map(line => {
            if (line) {
                const fileName = `${props.repliques[0].play_name}+${line.line}+${line.character}`;
                const filePath = `audios/${fileName}`;
                return getDownloadURL(ref(storage, filePath))
                    .then(url => ({
                        url: url,
                        character: line.character,
                        line: line.line,
                        position: line.position // Je suppose que la position est directement disponible
                    }))
                    .catch(error => {
                        console.error("Error fetching file:", error);
                        return null;
                    });
            } else {
                console.log('Line is empty or undefined');
                return null;
            }
        });

        Promise.all(fetchUrls).then(results => {
            const filteredResults = results.filter(result => result !== null);
            setAudios(filteredResults);
        });
    }, [props.repliques]);
    // Fonction pour obtenir la durée d'un audio
    const getAudioDuration = (url) => {
        return new Promise((resolve, reject) => {
            const audio = new Audio(url);
            audio.addEventListener('loadedmetadata', () => {
                resolve(audio.duration);
            });
            audio.addEventListener('error', (e) => {
                reject(e);
            });
        });
    };

    // Fonction pour jouer les audios séquentiellement
    const playAudios = (index = 0) => {
        if (index < audios.length) {
            setIsPlaying(true);
            setCurrentAudioIndex(index);

            if (props.character === audios[index].character) {
                // Simuler un silence pour cet audio
                const audioElement = new Audio(audios[index].url);

                audioElementRef.current = audioElement;

                getAudioDuration(audios[index].url).then(duration => {
                    timeoutRef.current = setTimeout(() => {
                        console.log(duration )
                        playAudios(index + 1);
                    }, 8000);
                });
            } else {
                // Jouer l'audio
                const audioElement = new Audio(audios[index].url);
                audioElementRef.current = audioElement;
                audioElement.play();
                audioElement.onended = () => {
                    playAudios(index + 1);
                };
            }
        } else {
            setIsPlaying(false);
        }
    };
    const handlePlayClick = () => {
        if (!isPlaying && audios.length > 0) {
            playAudios();
        }
    };
    
    // Fonction pour arrêter la lecture
    const stopAudio = () => {
        if (audioElementRef.current) {
            audioElementRef.current.pause();
            audioElementRef.current.currentTime = 0;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsPlaying(false);
        setCurrentAudioIndex(0);
    };
    return (
        <>
            <div>TrainingScene</div>
            <button onClick={handlePlayClick} disabled={isPlaying}>Jouer la scène</button>
            <button onClick={stopAudio} disabled={!isPlaying}>Arrêter</button>
            <div>
                {play && audios.length > 0 && <>
                    <p>Index: {currentAudioIndex}</p>
                    <p>Character: {audios[currentAudioIndex
                    ].character}</p>
                  {props.character != audios[currentAudioIndex].character  }  
                  <p className='text-green-900 font-extrabold'>Line: {audios[currentAudioIndex].line}</p>
                </>}
            </div>
        </>
    );
}

export default TrainingScene;


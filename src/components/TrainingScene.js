import React, { useEffect, useRef, useState } from 'react';
import { getStorage, ref, getDownloadURL, getMetadata } from 'firebase/storage';
import { Howl } from 'howler';


function TrainingScene(props) {
    const [audios, setAudios] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const audioElementRef = useRef(null); // Référence pour l'élément audio actuellement en lecture
    const timeoutRef = useRef(null); // Référence pour le timeout actuel
    const [play,setPlay] = useState(true)
    useEffect(() => {
        const storage = getStorage();
        const audioInfos = props.repliques[0].lines.map(line => {
          if (line) {
            const fileName = `${props.repliques[0].play_name}+${line.line}+${line.character}`;
            const filePath = `audios/${fileName}`;
            const fileRef = ref(storage, filePath);
      
            // Utilisez getMetadata pour récupérer les métadonnées
            return getMetadata(fileRef)
              .then(metadata => {
                // Les métadonnées personnalisées sont dans metadata.customMetadata
                const duration = metadata.customMetadata?.duration;
                console.log(duration)
                // Ensuite, récupérez l'URL de téléchargement
                return getDownloadURL(fileRef).then(url => {
                  // Créer une instance Howl avec l'URL
                  const sound = new Howl({
                    src: [url], // Utilisez l'URL pour la source
                    onload: function() {
                      console.log('Duration from metadata:', duration);
                      // Vous pouvez stocker la durée ou d'autres informations ici
                    }
                  });
      
                  // Retournez un objet avec l'URL, la durée des métadonnées et les autres informations
                  return {
                    url: url,
                    sound,
                    duration, // Stockez la durée des métadonnées ici
                    character: line.character,
                    line: line.line,
                    position: line.position
                  };
                });
              })
              .catch(error => {
                console.error("Error fetching metadata/file:", error);
                return null; // Retourne null en cas d'erreur, à filtrer plus tard
              });
          } else {
            console.log('Line is empty or undefined');
            return null;
          }
        });
      
        // Puisque audioInfos est maintenant un tableau de promesses, utilisez Promise.all() pour l'aplatir
        Promise.all(audioInfos).then(finalResults => {
          const filteredResults = finalResults.filter(result => result !== null);
          setAudios(filteredResults);
        });
      }, [props.repliques]); // S'exécute chaque fois que `props.repliques` change
      
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
                console.log(audioElementRef.current.duration)

                getAudioDuration(audios[index].url).then(duration => {
                    timeoutRef.current = setTimeout(() => {
                        console.log(audios[index] )
                        console.log(audios[index].duration * 1000 )
                        playAudios(index + 1);
                    }, audios[index].duration * 1000);
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
        <> <div className='relative'>
            <h1>Audio de La scène</h1>

            <button className=' bg-red-200 w-[100px] mx-auto rounded-xl my-2   ' onClick={()=>{ props.onclose() }} >Fermer</button>
          {!isPlaying &&  <button className='bg-blue-200 w-[150px] mx-auto rounded-xl my-2  '  onClick={handlePlayClick} disabled={isPlaying}>Jouer la scène</button>}
     {isPlaying &&        <button className='bg-red-900 rounded-3xl text-white w-[150px] my-2   mx-auto ' onClick={()=>{ props.onclose() ; stopAudio()}} disabled={!isPlaying}>Arrêter</button>}
           {isPlaying && <p className='bg-red-900 rounded-3xl text-white w-[150px] my-2  mx-auto '> ca joue</p>}
            <div>
                {play && audios.length > 0 && <>
                    {/* <p>Index: {currentAudioIndex}</p> */}
                    <p>Character: {audios[currentAudioIndex
                    ].character}</p>
                  {props.character != audios[currentAudioIndex].character  }  
                  {/* <p className='text-green-900 font-extrabold'>Line: {audios[currentAudioIndex].duration}</p> */}
                  <p className='text-green-900 font-extrabold'>Line: {audios[currentAudioIndex].line}</p>
                </>}
            </div>
            </div>
        </>
    );
}

export default TrainingScene;


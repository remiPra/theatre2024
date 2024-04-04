import React, { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { storage } from '../../firebase'; // Assurez-vous que ce chemin mène à votre fichier d'initialisation Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AudioRecorder = (props) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
  const [audioURL, setAudioURL] = React.useState('');


  //duration
  // const getAudioDuration = async (blobUrl) => {
  //   return new Promise((resolve, reject) => {
  //     const audio = new Audio();
  //     audio.addEventListener('loadedmetadata', () => {
  //      console.log(audio.duration)
  //     });
  //     audio.onloadedmetadata = () => {
  //       resolve(audio.duration);
  //     };
  //     audio.onerror = () => {
  //       reject("Failed to load audio metadata");
  //     };
  //     audio.src = blobUrl;
  //   });
  // };
  const getAudioDuration = (blobUrl) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = blobUrl;

      audio.oncanplaythrough = () => {
        resolve(audio.duration);
      };

      audio.onerror = () => {
        reject("Failed to load audio");
      };

      audio.load();
    });
  };







  const uploadAudio = async () => {
    if (!mediaBlobUrl) return;
    if(durations == 0) return;
    const audioBlob = await fetch(mediaBlobUrl).then(r => r.blob());
    const duration = await getAudioDuration(mediaBlobUrl);
    console.log('Duration:', duration); // Vous avez la durée ici
    const audioFile = new File([audioBlob], "recording.webm", { type: "audio/webm" });
    
    // Créez un objet metadata pour stocker la durée et d'autres informations si nécessaire
    const metadata = {
      contentType: 'audio/webm',
      customMetadata: {
        'duration': `${durations}`, // Assurez-vous que la durée est une chaîne
        // Ajoutez d'autres paires clé-valeur personnalisées si nécessaire
      }
    };
    
    const storageRef = ref(storage, `audios/${props.replique.scene}+${props.replique.line}+${props.replique.character}`);
    
    // Incluez l'objet metadata dans uploadBytes
    uploadBytes(storageRef, audioFile, metadata).then((snapshot) => {
      console.log('Audio uploaded successfully with metadata');
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setAudioURL(downloadURL);
        console.log('File available at', downloadURL);
        props.close()
      });
    }).catch((error) => {
      console.error('Error uploading audio:', error);
    });
  };
  


  const [durations,setDuration] = useState(0)
  

  return (
    <div>
      {/* {JSON.stringify(props)} */}
      {/* <p>{status}</p>    */}
   {status == 'idle' &&    <button className='bg-blue-200 m-2 w-[150px]  rounded-xl my-2 text-white  ' onClick={startRecording}>Commencer l'enregistrement</button>}
   {status == 'recording' &&   <button className='bg-red-800 m-2 w-[150px]  rounded-xl my-2 text-white  ' onClick={stopRecording}>
        Arreter l'enregistrement</button>}
        {status == 'recording' && <h2>c'est le moment de parler , let's go</h2>}

      <button className='bg-red-800 m-2 w-[150px]  rounded-xl my-2 text-white  ' onClick={() => { props.ononsortir() }}>Recommencer</button>
      {status === 'stopped' && <audio src={mediaBlobUrl} controls autoPlay loop />}
      {status === 'stopped' && 
      <>
      <label> !Important :  Rajouter le nombre de secondes total du son en secondes svp : </label>
      <input className='block border border-red-700 text-center mx-auto w-[200px] my-3 ' type='number' value={durations} onChange={(e)=>setDuration(e.target.value)} />
        <button className='bg-blue-200 m-2 w-[150px]  rounded-xl my-2 text-white  ' onClick={uploadAudio}>Sauver l'enregistrement</button>
      </>
      }
      {/* Jouer l'audio téléchargé si l'URL est disponible */}
      {audioURL &&
        <div>
          <p>Uploaded Audio:</p>
          <audio src={audioURL} controls />
        </div>
      }
    </div>
  );
};

export default AudioRecorder;

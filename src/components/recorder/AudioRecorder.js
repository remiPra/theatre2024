import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { storage } from '../../firebase'; // Assurez-vous que ce chemin mène à votre fichier d'initialisation Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AudioRecorder = (props) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
  const [audioURL, setAudioURL] = React.useState('');

  const uploadAudio = async () => {
    if (!mediaBlobUrl) return;

    const audioBlob = await fetch(mediaBlobUrl).then(r => r.blob());
    const audioFile = new File([audioBlob], "recording.webm", { type: "audio/webm" });
    const storageRef = ref(storage, `audios/${props.replique.scene}+${props.replique.line}+${props.replique.character}`);
    
    uploadBytes(storageRef, audioFile).then((snapshot) => {
      console.log('Audio uploaded successfully');
      // Récupérer et définir l'URL du fichier téléchargé
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setAudioURL(downloadURL);
        console.log('File available at', downloadURL);
      });
    //   props.close(); // Ferme le composant/modal si nécessaire
    }).catch((error) => {
      console.error('Error uploading audio:', error);
    });
  };

  return (
    <div>
      {JSON.stringify(props)}
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      {status === 'stopped' && <audio src={mediaBlobUrl} controls autoPlay loop />}
      {status === 'stopped' && 
        <button onClick={uploadAudio}>Upload and Retrieve</button>
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

import React, { useState, useEffect } from 'react';
import playData from './data/piece.json'; // Assurez-vous que le chemin est correct
import AudioComponentScene from './components/AudioComponentScene'
import { MdOutlineSpatialAudioOff } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";




function PlayComponentAudio() {
    // Utilisez useState pour gérer les données
    const [playLines, setPlayLines] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [characterPlay, setCharacterPlay] = useState("")
    const [scene, setScene] = useState("")
    const [specificScene, setSpecificScene] = useState({})

    const [showAudio, setShowAudio] = useState(false)
    const [replique, setReplique] = useState(null)

    useEffect(() => {

        // Play lines
        const playLines = playData
        setPlayLines(playLines);
        const filteredLines = playLines.filter(line => {
            return line.play_name === scene;
        });

        setSpecificScene(filteredLines);



    }, [scene]);


    const openAudio = (rep) => {
        console.log(rep);
        setReplique(rep);
        setShowAudio(true)
    }





    const sceneChoose = async (el) => {
        setScene(el);
        console.log(scene)

        setTimeout(() => { console.log(specificScene) }, 3000)


    }
    const [continuer, setContinuer] = useState(false)
    const caractersChoose = () => {
        console.log(specificScene[0].lines)
        const characters = [];
        specificScene[0].lines.map(el => (

            characters.push(el.character)

        ));
        console.log(characters)
        // Remove duplicates
        const uniqueChars = [...new Set(characters)];
        setCharacters(uniqueChars);
        setContinuer(true)
    }

    const see = (index) => {
        let set = [...specificScene]
        set[0].lines[index].textShadow = true
        setSpecificScene(set)
        console.log(specificScene[0].lines[index].textShadow)
        console.log(set)
    }

    const unsee = (index) => {
        let set = [...specificScene]
        set[0].lines[index].textShadow = false
        setSpecificScene(set)
        console.log(specificScene[0].lines[index].textShadow)
        console.log(set)
    }

    return (<>
        {(characterPlay == '' && scene == "") && (
            <><h1 className='text-center mt-6 mb-6'>Choisissez votre scene :</h1>
                <div className='flex justify-center'>

                    {
                        playLines.map((el, index) => (<>
                            <button
                                onClick={() => (sceneChoose(el.play_name))} key={index}
                                className='rubik text-black text-[30px] max-w-[200px] border border-2 rounded-lg m-2 p-2'>{el.play_name}</button>
                        </>))
                    }
                </div>
            </>
        )}
        {(characterPlay == "" && scene != "" && !continuer) && <>
            <p className='text-center mt-6 mb-6'>Vous avez chosi votre piece maintenat passons au personnage</p>
            <div className='flex justify-center'>
                <button className='text-red-100 max-w-[200px] bg-red-700 rounded-lg m-2 p-2' onClick={caractersChoose}>Continuer </button>
            </div>
        </>}
        {(characterPlay == '' && scene != "" && continuer) &&
            <div>
                <p className='flex justify-center text-center mt-5'> Choisissez le personnage que vous voulez incarner </p>
                <div className='flex justify-center mt-5 flex-wrap' >

                    {characters.map((el, index) => (<>
                        {(el != null) && <button onClick={() => setCharacterPlay(el)} key={index} className='text-red-100 bg-red-700 rounded-lg m-2 p-2'>{el}</button>}
                    </>))}

                </div>
            </div>
        }
        {(characterPlay != '' && scene != "") &&
            <div>
                <h1 className='text-center mt-6 mb-6'>{specificScene[0].play_name}</h1>
                {specificScene[0].lines.map((line, index) => (
                    <div key={index} className=' p-2 m-2 '>

                        {(line.character == characterPlay && !line.textShadow) &&
                            <div className='flex justify-between border p-2 bg-slate-600'>
                                <div>
                                    <strong>{line.character}</strong>
                                </div>
                                <div className='flex'>
                                    <button className='text-red-100 bg-red-700 rounded-lg m-2 p-2 flex' onClick={() => openAudio(line)}>
                                        <MdOutlineSpatialAudioOff />

                                        Audio
                                    </button>
                                    <button className='text-red-100 bg-red-700 rounded-lg m-2 p-2 flex' onClick={() => see(index)}>
                                        <FaEye />


                                        voir </button>
                                </div>
                            </div>
                        }
                        {(line.character == characterPlay && line.textShadow) &&
                            <div className='flex flex-wrap justify-between p-2 bg-green-800'>
                                <div>
                                    <strong>{line.character}</strong> : <span className='text-white'>
                                        {line.line}
                                    </span>
                                </div>
                                <div className='flex justify-end w-full '>
                                    <button className='flex text-red-100 bg-red-700 rounded-lg m-2 p-2'
                                        onClick={() => { openAudio(line) }}>
                                        <MdOutlineSpatialAudioOff />

                                        Audio</button>
                                    <button className='flex text-red-100 bg-red-700 rounded-lg m-2 p-2'
                                        onClick={() => unsee(index)}>
                                        <FaEyeSlash />
                                        masquer </button>
                                </div>
                            </div>
                        }
                        {(line.character != characterPlay) && <div className='p-2 border border-black'>
                            <strong>{line.character}</strong> : {line.line}</div>
                        }
                    </div>
                ))}
            </div>}

        {/* template de microhpone  */}
        {showAudio &&
            <div className='fixed bg-blue-500 bg-opacity-50 h-full bottom-0 right-0 top-0 left-0 w-full z-10'>
                <AudioComponentScene onclose={() => setShowAudio(false)} replique={replique}>
                </AudioComponentScene>
            </div>
        }


    </>
    );
}

export default PlayComponentAudio;
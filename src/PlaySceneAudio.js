import React, { useState, useEffect } from 'react';
import playData from './data/piece.json'; // Assurez-vous que le chemin est correct
import AudioComponentScene from './components/AudioComponentScene'
import { MdOutlineSpatialAudioOff } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Drawer } from '@mui/joy';
import DrawerBasic from './components/Drawer';




function PlayComponentAudio() {
    // Utilisez useState pour gérer les données
    const [playLines, setPlayLines] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [characterPlay, setCharacterPlay] = useState("")
    const [scene, setScene] = useState("")
    const [description, setDescription] = useState("")
    const [specificScene, setSpecificScene] = useState({})

    const [showAudio, setShowAudio] = useState(false)
    const [replique, setReplique] = useState(null)


    useEffect(() => {
        setCharacterPlay('')
        setScene('')
        // characterPlay == '' && scene == ""
    }, [])

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





    const sceneChoose = async (title, description) => {
        setScene(title);
        setDescription(description)
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
    const [boolSeeAll, setBoolSeeAll] = useState(true)

    const allSee = async () => {
        let set = [...specificScene]
        const rec = await set[0].lines.map(el => (
            el.textShadow = true
        ))
        setSpecificScene(set)
        setBoolSeeAll(false)
        console.log(set[0])
    }
    const allUnSee = async () => {
        let set = [...specificScene]
        const rec = await set[0].lines.map(el => (
            el.textShadow = false
        ))
        setSpecificScene(set)
        setBoolSeeAll(true)
        console.log(set[0])
    }

    const unsee = (index) => {
        let set = [...specificScene]
        set[0].lines[index].textShadow = false
        setSpecificScene(set)
        console.log(specificScene[0].lines[index].textShadow)
        console.log(set)
    }

    const [perso,setPerso] = useState("")
    const persoChange = (data) => {
                console.log(data);
                setPerso(data)
    }
    return (<>
        {/* scene initialie */}
        {(characterPlay == '' && scene == "") && (
            <>
                <div className='relative w-full'>
                    <h1 className='text-center mt-6 mb-6 '>Choisissez votre scene :</h1>
                    {/* <p>personnage : </p>
                    <input onChange={(e)=>persoChange(e.target.value)} type="text"/> */}
                    <div className='absolute right-3 top-0 '>
                        <DrawerBasic />
                    </div>
                </div>
                <div className='flex justify-center flex-wrap'>

                    {
                        playLines.map((el, index) => (<>
                            {/* {(el.characters.indexOf(perso) !== -1 || perso === "") && */}
                            <div
                                onClick={() => (sceneChoose(el.play_name, el.description))} key={index}
                                className='cursor-pointer  max-w-[280px] min-h-[200px] border-2 rounded-lg m-2 p-2'>
                                <h2 className='min-h-[130px] text-center rubik text-black text-[26px]'>
                                    {el.title}
                                </h2>
                                <p className='flex justify-center flex-wrap'>{el.characters.map((el) => (<>
                                    {el != "Indication" && <span className='text-white bg-blue-800  rounded-xl m-1 p-2'>{el}</span>}
                                </>))}</p>
                            </div>
                             {/* } */}
                        </>))
                    }
                </div>
            </>
        )}
        {/* deuxieme étape */}
        {(characterPlay == "" && scene != "" && !continuer) && <>
            <h3 className='text-center mt-6 mb-6'>Vous avez choisi la scène :
                <span className='block text-center text-2xl '>{scene}</span>
                <span className='block text-center text-xl '>{description}</span>

            </h3>

            <p className='text-center mt-6 mb-6'>Maintenant passons au choix du personnage que vous voulez travailler</p>
            <div className='flex justify-center'>
                <button className='text-red-100 max-w-[200px] bg-red-700 rounded-lg m-2 p-2' onClick={caractersChoose}>Cliquer pour Continuer </button>
            </div>
        </>}
        {(characterPlay == '' && scene != "" && continuer) &&
            <div>
                <p className='flex justify-center text-center mt-5'> Choisissez le personnage que vous voulez incarner </p>
                <div className='flex justify-center mt-5 flex-wrap' >

                    {characters.map((el, index) => (<>
                        {(el != null && el != "Indication") && <button onClick={() => setCharacterPlay(el)} key={index} className='text-red-100 bg-red-700 rounded-lg m-2 p-2'>{el}</button>}
                    </>))}

                </div>
            </div>
        }
        {(characterPlay != '' && scene != "") &&
            <div>
                <h1 className='text-center mt-6 mb-6'>{specificScene[0].play_name}</h1>
                <div className="fixed bottom-20 right-5 animate-slideToBottomRight">
                    {boolSeeAll && <button className='bg-blue-800 text-[35px] p-4 text-white rounded-full' onClick={allSee}>                                        <FaEye />
                    </button>}
                    {!boolSeeAll && <button className='bg-red-600 text-[35px] p-4 text-white rounded-full' onClick={allUnSee}>                                        <FaEye />
                    </button>}
                </div>
                <div className='w-full flex justify-center'>
                    {boolSeeAll && 
                    <div onClick={allSee} className='bg-blue-800 flex flex-col justify-center p-4 text-white rounded-full'>
                        <button className='text-[35px] mx-auto text-center text-white ' >
                            <FaEye />
                        </button>
                        <p className='text-sm'>
                            tout voir
                        </p>
                    </div>
                    }
                    {!boolSeeAll &&
                    <div onClick={allUnSee} className='bg-red-800 flex flex-col justify-center p-4 text-white rounded-full'>
                    <button className='text-[35px] mx-auto text-center text-white ' >
                        <FaEye />
                    </button>
                    <p className='text-sm'>
                        cacher mes répliques
                    </p>
                </div> 
                    
                    }
                </div>
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
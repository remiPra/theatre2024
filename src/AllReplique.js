import React, { useEffect, useState } from 'react'
import playData from './data/piece.json'; // Assurez-vous que le chemin est correct

function AllReplique() {

    const [playLines, setPlayLines] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [characterPlay, setCharacterPlay] = useState("")

    useEffect(() => {

        // Play lines
        const playsData = playData;
        setPlayLines(playsData)
        console.log(playData)
        const allLines = [];
        const allCharacters = new Set();
        let x = []

        // Boucler sur chaque pièce
        playsData.forEach(play => {

            // Récupérer les lignes de cette pièce
            const playLines = play.lines;

            // Ajouter au tableau global
            allLines.push(...playLines);

            // Récupérer les personnages uniques
            playLines.map(l => x.push(l.character));
            console.log(x)
            // Ajouter au Set global
            
            const prenomsUniques = [...new Set(x.filter(Boolean))];
            console.log(prenomsUniques)
            setCharacters(prenomsUniques)


            // setCharacters(prevState=> [...prevState,characters])
            

        });



    }, [])


    const choose = (data) => {
        setCharacterPlay(data)
    }



    return (<>
        <h1 className='text-center   mt-5'>Toutes les répliques de la pièce</h1>
        {characterPlay == '' &&
            <div>
                <p className='flex justify-center mb-14 text-2xl text-center mt-5'> Choisissez le personnage que vous voulez incarner </p>
                <div className='flex flex-wrap justify-center mt-5' >

                    {characters.map((el, index) => (<>
                        <button onClick={() => choose(el)} key={index} className='text-red-100 bg-red-700 rounded-lg m-2 p-2'>{el}</button>
                    </>))}

                </div>
            </div>
        }
        {characterPlay != '' &&
            <div>
                {playLines.map((sceneEl) => (<>
                    <h1 className=''>{sceneEl.play_name}</h1>
                    {sceneEl.lines.map((line, index) => (
                        <div key={index}>
                            {(line.character == characterPlay) && <>
                                {/* <h1>{sceneEl.play_name}</h1> */}
                            <strong>{line.character}</strong> : {line.line}
                            </>
                            }
                             
                        </div>
                    ))}
                    <p className='mb-3'></p>

                </>

                ))}
            </div>}

    </>
    )
}

export default AllReplique
import React from 'react'
import AudioRecorder from './recorder/AudioRecorder'

function RegisterSentence(props) {

    const simple = () => {
        console.log("rere")
        props.ondef()
    }

    const leave = () => {
        console.log("rere")
        props.ondefleave()
    }

    return (
        <div>

            <p className='font-extrabold text-xl'>
                la réplique est :  {props.replique.line}
            </p>

            <AudioRecorder onleave={()=>{leave()}} ononsortir={() => { simple() }} replique={props.replique} close={props.onclose} />
        </div>
    )
}

export default RegisterSentence
import React from 'react'
import AudioRecorder from './recorder/AudioRecorder'

function RegisterSentence(props) {

    const simple = () => {
        console.log("rere")
        props.ondef()
    }

    return (
        <div>

            <p className='font-extrabold text-xl'>
                la réplique est :  {props.replique.line}
            </p>

            <AudioRecorder ononsortir={() => { simple() }} replique={props.replique} close={props.onclose} />
        </div>
    )
}

export default RegisterSentence
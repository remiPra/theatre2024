import React from 'react'
import AudioRecorder from './recorder/AudioRecorder'

function RegisterSentence(props) {
    return (
        <div>

            <p>
                la réplique est :  {props.replique.line}
            </p>

            <AudioRecorder replique={props.replique} close={props.onclose} />
        </div>
    )
}

export default RegisterSentence
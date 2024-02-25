import React, { useState } from 'react'
import axios from 'axios';



function Ollama() {

    const [response,setResponse ] = useState(null)
    const [input,setInput]=useState('')
    const run = () => {
        console.log("hello")
        axios.post('http://localhost:11434/api/chat', {
            model: "llama2-uncensored",
            messages: [
                {
                  "role": "user",
                  "content": input + " [context] parle en francais[/context]  [task]note ta réponse[/task] "
                }
              ],
            stream:false
        })
        .then(response => {
            console.log('Success:', response.data);
            setResponse(response.data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    return (<>
    <div>
        <div className='border p-2 w-[80%] mx-auto' >
        <input className='block mx-auto p-3 min-w-[80%]' onChange={(e)=>setInput(e.target.value)} placeholder='tapez votre question ? ' />
        <button className='bg-red-100 p-2 rounded-2xl mt-4 mx-auto w-[60%] block' onClick={()=>run()}>run</button>
        </div>
  {response != null &&  <p className='mt-2 w-[80%] mx-auto' dangerouslySetInnerHTML={{__html:   response.message.content}}></p>}
    </div>
    </>
    )
}

export default Ollama
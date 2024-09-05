import './index.scss'
import { useRef } from 'react'
function TextArea({onChange}){
    const inp = useRef()
    const resizeTextArea = () => {
        inp.current.style.height = "24px"
        inp.current.style.height = inp.current.scrollHeight + 12 +"px"
    }
    
    return(
        <div className='text-area'>
            <textarea onChange={onChange} ref={inp} onInput={resizeTextArea} placeholder='Type something...'></textarea>
        </div>
    )
}
export default TextArea
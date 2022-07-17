import React, {useRef} from 'react'
import { useAppContext } from '../context/AppContext'
import './styles.css'


const InputField = () => {
    const { todo,setTodo,addToDo} = useAppContext()
    const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
    <form className="input" onSubmit={e => {
        inputRef.current?.blur()
        addToDo(e)
    }}>
        <input ref={inputRef} type="input" placeholder="Enter a Task" className="input__box" value={todo} 
        onChange={ e => setTodo(e.target.value)} />
        <button className="input_submit" type="submit">Go</button>
    </form>
    </>
  )
}

export default InputField

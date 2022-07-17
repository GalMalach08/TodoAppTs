import React,{ useState,useRef,useEffect } from 'react'
import { Todo } from '../components/model'
import { useAppContext } from '../context/AppContext'
import { AiFillEdit,AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    todo:Todo,
    index:number}

const SingleTodo = ({todo,index}:Props) => {
    const { deleteTodo,doneTodo,editTodo } = useAppContext()
    const [edit, setEdit] = useState<Boolean>(false)
    const [editedTodo, setEditedTodo] = useState<string>(todo.todo)
    const inputRef = useRef<HTMLInputElement>(null)

    const changeTodo = () => {
        if(!todo.isDone) {
            setEdit(true)
    }
}

    useEffect(() => {
        inputRef.current?.focus()        
    }, [edit])
    


  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {
            (provided,snapshot) => (
                <form className={`todos__single ${snapshot.isDragging ? 'drag' :''}`} onSubmit={e => {
                    editTodo(e,todo.id,editedTodo)
                    setEdit(false)
                }
                }
                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                >
                    {edit ? 
                    <input ref={inputRef} value={editedTodo} onChange={e => setEditedTodo(e.target.value)} className="todos__single--test"/>
                    :
                    <span className={`todos__single--text ${todo.isDone ? 'done' : ''}`}>
                        {todo.todo}
                    </span> }
            <div>
                <span className="icon" onClick={() => changeTodo()}>
                    <AiFillEdit/>
                </span>
                <span className="icon" onClick={() => deleteTodo(todo.id)}><AiFillDelete/></span>
            
                <span className="icon" onClick={() => doneTodo(todo.id)}><MdDone/></span>
            
            </div>
               
                </form>
            )
        }

    </Draggable>

  )
}

export default SingleTodo
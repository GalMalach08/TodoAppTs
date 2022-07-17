import React from 'react'
import SingleTodo from './SingleTodo'
import { Todo } from '../components/model'
import { useAppContext } from '../context/AppContext'
import { Droppable } from 'react-beautiful-dnd'

import './styles.css'

const TodoList = () => {
    const { todosList,completedTodosList } = useAppContext()
  return (
    
     <div className="container">
        <Droppable droppableId='TodosList'>
            { 
            (provided,snapshhot) => (
                <div className={`todos ${snapshhot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                <span className="todos__heading">Active Tasks</span>
                {todosList.map((todo:Todo, index:number) => (
                <SingleTodo index={index} key={todo.id} todo={todo}/>
                ))}
                {provided.placeholder}
            </div>
            )
            }
      
        </Droppable>
        <Droppable droppableId='CompletedTodosList'>
            { 
            (provided,snapshhot) => (
          
        <div className={`todos remove ${snapshhot.isDraggingOver ? 'dragcomplete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
        <span className="todos__heading">Completed Tasks</span>
        {completedTodosList.map((todo:Todo,index:number) => (
            <SingleTodo index={index}  key={todo.id} todo={todo}/>
            ))}
                {provided.placeholder}

            </div>
            )
            }
      
        </Droppable>
      
      
     </div>

  )
}

export default TodoList
import React, { useState,createContext,useContext,ReactNode } from 'react';
import { DragDropContext,DropResult } from 'react-beautiful-dnd'
import { Todo } from '../components/model'
type TodoProviderProps = { 
    children: ReactNode
}

type AppContextType = {
    todo:string,
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    addToDo:(e:React.FormEvent) => void,
    todosList:Todo[],
    setTodosList:React.Dispatch<React.SetStateAction<Todo[]>>,
    deleteTodo:(id:number) => void,
    doneTodo:(id:number) => void,
    editTodo:(e:React.FormEvent,id:number, editedTodo:string) => void,
    completedTodosList:Todo[]
}

const AppContext = createContext({} as AppContextType)

export const useAppContext = () => useContext(AppContext)



export const AppContextProvider = ({children}:TodoProviderProps) => {
  const [todo,setTodo] = useState<string>("")
  const [todosList, setTodosList] = useState<Todo[]>([])
  const [completedTodosList, setCompletedTodosList] = useState<Todo[]>([])


  const addToDo = (e:React.FormEvent) => {
    e.preventDefault()
    setTodosList(prevTodos => [...prevTodos,{id:Date.now(), todo, isDone:false}])
    setTodo("")
}

const deleteTodo = (id:number) => {
    setTodosList(prevTodos => prevTodos.filter(todo => todo.id !== id))
}

const doneTodo = (id:number) => {
    setTodosList(prevTodos => prevTodos.map((todo:Todo ) => {
        if(todo.id === id) return {...todo,isDone:true}
        return todo
    }))
}

const editTodo = (e:React.FormEvent,id:number,editedTodo:string) => {    
    e.preventDefault()
    setTodosList(prevTodos => prevTodos.map((todo:Todo ) => {
        if(todo.id === id) return {...todo,todo:editedTodo}
        return todo
    }))
}

const onDragEnd = (result:DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todosList;
    let complete = completedTodosList;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodosList(complete);
    setTodosList(active);
}


  

return <DragDropContext onDragEnd={onDragEnd}>
<AppContext.Provider value={{todo,setTodo,addToDo,todosList,setTodosList,
deleteTodo,doneTodo,editTodo,completedTodosList}}>
            {children}
        </AppContext.Provider>
</DragDropContext>


}

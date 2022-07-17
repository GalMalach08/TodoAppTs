import React from 'react';
import { AppContextProvider } from './context/AppContext'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import './App.css';




const App: React.FC = () => {


return (
  <AppContextProvider>
    <div className="app">
      <span className="heading">Taskify Todo</span>
      <InputField />
      <TodoList/>
    </div>
    </AppContextProvider>

  );
}

export default App;







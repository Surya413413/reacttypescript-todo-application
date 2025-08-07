// import React from 'react';
import React,{ useState } from 'react';
import { InputField } from './components/InputField';
import './App.css';
import { Todo } from './model';
import  TodoList  from './components/TodoList';
import {DragDropContext, DropResult} from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos,setCompletedTodos] = useState<Todo[]>([])

  

  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault()
    if(todo){
      setTodos([...todos,{id:Date.now(),todo:todo,isDone:false}])
      setTodo("")
    }
  };
const onDragEnd = (result:DropResult) => {
const {source,destination} = result
if (!destination) return;
if (source.droppableId=== destination.droppableId && source.index=== destination.index) return;
// let add, active = todos,complete=completedTodos
let active = [...todos];
  let complete = [...completedTodos];
  let add;


if(source.droppableId === "TodosList"){
  add = active[source.index]
  active.splice(source.index,1);
}else{
   add = complete[source.index]
  complete.splice(source.index,1);
}

// if(destination.droppableId === "TodosList"){
  
//   active.splice(destination.index,0,add);
// }else{
//   complete.splice(destination.index,0,add);
// }

  if (destination.droppableId === "TodosList") {
    active.splice(destination.index, 0, { ...add, isDone: false });
  } else {
    complete.splice(destination.index, 0, { ...add, isDone: true });
  }




setTodos(active)
setCompletedTodos(complete)
}
  return (
<DragDropContext onDragEnd={onDragEnd}>
<div className="App">
      <span className='header'>
typescript 
      </span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
    </div>
</DragDropContext>

    
  );
}

export default App;

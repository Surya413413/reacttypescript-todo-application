import React from 'react'
import "./style.css"
import { Todo } from '../model';
import { SingleTodo } from './SingleTodo';
import { Droppable ,Draggable} from 'react-beautiful-dnd';

interface Props{
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos:Todo[];
    setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList:React.FC<Props> = ({todos,setTodos,completedTodos,setCompletedTodos}) => {
 
 
  return (
 
    <div className='container'>
       <Droppable droppableId="TodosList" type='group'>
        {
          (provided,snapshot)=> (
<div className={`todos ${snapshot.draggingOverWith? "dragadd":""}`} ref={provided.innerRef} {...provided.droppableProps}>
      <span className="heading_text">Active</span>
       {todos.map((each,index) => (
        <SingleTodo key={each.id} index={index} todo={each}  todos={todos} setTodos={setTodos}/> 
         ))}
         {provided.placeholder}
      </div>
          )
        }
        </Droppable>
        <Droppable droppableId='TodosRemove' type='group'>
          {
            (provided,snapshot)=>(
<div className={`todos remove ${snapshot.isDraggingOver?"dragremove":""}`} ref={provided.innerRef} {...provided.droppableProps}>
        <span className="heading_text">Completed</span>
 {completedTodos.map((each,index) => (
        <SingleTodo key={each.id}  index={index} todo={each}  todos={completedTodos} setTodos={setCompletedTodos}/> 
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
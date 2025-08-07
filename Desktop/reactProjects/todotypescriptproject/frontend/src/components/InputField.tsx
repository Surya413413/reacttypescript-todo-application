import React, { useRef } from 'react'
import "./style.css"

interface props{
    todo:string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd : (e:React.FormEvent) => void;
}



// export const InputField:React.FC<props> = ({todo,setTodo}) => {
export const InputField = ({todo,setTodo,handleAdd}:props) => {
    const inputRef = useRef<HTMLInputElement>(null);
  return (

    <form className='input' onSubmit={(e)=>{
        handleAdd(e);
            inputRef.current?.blur(); 
        
        }}>
        <input type="text" 
        ref={inputRef}
        placeholder='enter input here' 
        className='input_box'
        value={todo}
        onChange={(e)=> setTodo(e.target.value)}/>
        <button type="submit" className='input_submit'>Go</button>
    </form>
  )
}

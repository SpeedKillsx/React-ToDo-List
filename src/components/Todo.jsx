 import { useRef } from "react"
import "./CSS/Todo.css"
import { useState } from "react"
import { useEffect } from "react"
import TodoItems from "./TodoItems"
//let count = 0;
export const Todo = () => {
  const inputReference = useRef(null)
  const [todos, setTodos] = useState([])
  
  
  
  function addTodos(){
    const newTodo = {
      name:inputReference.current.value, 
      id: Date.now(),
      display:"",
      creation_date:new Date().toISOString()
    }
    setTodos([...todos, newTodo])
    //localStorage.setItem('todos_count', count)
    inputReference.current.value = "";
  }

  useEffect(()=>{
    
    setTodos(JSON.parse(localStorage.getItem('todos')))
    //count = localStorage.getItem('todos_count')
  }, [])
  useEffect(()=>{    
    setTimeout(() => {
      console.log("My todos list  = ", todos)  
      

      localStorage.setItem("todos", JSON.stringify(todos))  
    }, 100);
    
  },[todos])
  return (
    <div>
      
        <h1>My todo List React Version</h1>
        <div className="todo-container">
            <div className="todo-input">
                <input ref ={inputReference} type="text" className="item-input"/>
                <button className="item-input-button" onClick={() => addTodos()}>Add todo</button> 
            </div>
            <h1>My todos</h1>
            <div className=" todo-show">
              
                {todos.map((item)=>{
                    return <TodoItems key={item.id} id={item.id} todo={item.name} display={item.display} setTodos={setTodos}creation_date={item.creation_date}/>
                })}
              
            </div>
        </div>
    </div>
  )
}

 import { useRef } from "react"
import "./CSS/Todo.css"
import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'
import TodoItems from "./TodoItems"
//let count = 0;
export const Todo = () => {
  const inputReference = useRef(null)
  const [todos, setTodos] = useState([])
  const loadTodos = async ()=>{
    try {
        const res = await axios.get('http://localhost:8800/todos/')
        setTodos(res.data)
        console.log(todos)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    loadTodos();
  }, [])
  async function addTodos(){
    try{
      console.log(inputReference.current.value)
      const newTodo = {
        name:inputReference.current.value, 
        display:'False',
        creation_date:new Date().toISOString()
      }
      await axios.post('http://localhost:8800/add', newTodo);
      window.location.reload()
      //localStorage.setItem('todos_count', count)
    }catch(error){
      console.log(error)
    }
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
                <input ref ={inputReference} type="text" className="item-input" name="todo"/>
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

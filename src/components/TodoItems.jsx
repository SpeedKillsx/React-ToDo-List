import tick from '../assets/tick.png';
import no_tick from '../assets/not_tick.png';
import cross from '../assets/cross.png';
import './CSS/TodoItems.css'
import { useEffect, useRef } from 'react';
const TodoItems = (props) => {
  const divRef = useRef(null)
  const MakeUrgent = (date)=>{
    /*Check the duration from the date of creation */
    const actual_date = new Date()
    /*From : https://stackoverflow.com/a/3224854/16148115 */
    const creation_date = new Date(date)
    const diffTime = Math.abs(actual_date - creation_date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    console.log(diffDays)
    return diffDays
  }

  useEffect(()=>{
    const expendedHours = MakeUrgent(props.creation_date)
    if (expendedHours < 1){
      divRef.current.style.backgroundColor = "white";
    }else if (expendedHours > 2 && expendedHours < 5){
      divRef.current.style.backgroundColor = "yellow";
    }else{
      divRef.current.style.backgroundColor = "red";
    }
  }, [props.creation_date])
  const deleteItem = (id)=> {
      let data = JSON.parse(localStorage.getItem('todos'))
      console.log(id)
      data = data.filter((todo) =>{
        console.log(todo.id, id)
        return todo.id!== id
      })
      localStorage.setItem('todos', JSON.stringify(data));
      props.setTodos(data);
  }

  const toggle = (id) =>{
    
    let data = JSON.parse(localStorage.getItem('todos'))
    console.log(id)
    for (let index = 0; index < data.length; index++) {
       
      if (data[index].id === id){
        if (data[index].display ===""){
          data[index].display='done' 
          }
        else{
          data[index].display=""
        }
        break;
      }
      
      
    }
    props.setTodos(data);
  }
  return (
    <div className='items-container'>
      <div ref={divRef} className='list-container'>
      

        <img src={props.display === "" ? no_tick : tick} alt="status icon" className="status-icon"/>
        
        <div  className="todo-item" onClick={()=> toggle(props.id)}>
          {props.todo}  
        </div>
        <img src={cross} alt="delete icon" className="delete-icon" onClick={()=>deleteItem(props.id)}/>
      </div>
    </div>
  );
};

export default TodoItems;

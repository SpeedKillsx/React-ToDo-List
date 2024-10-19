import tick from '../assets/tick.png';
import no_tick from '../assets/not_tick.png';
import cross from '../assets/cross.png';
import './CSS/TodoItems.css'
const TodoItems = (props) => {
  
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
      <div className='list-container'>
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

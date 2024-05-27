import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
export default function TodoList(){
    let [todo,setTodo] = useState([{task: "Sample-Task",key: uuidv4(),isDone: false}]);
    let [newTodo,setNewTodo] = useState("");

    let addNewTask = () => {
        setTodo((prevTodos)=>{
            return [...prevTodos,{task: newTodo,key: uuidv4()}]})
        setNewTodo("")
    }
    let updateTodoValue = (event) => {
        setNewTodo(event.target.value)
    }
    let removeTask = (id) => {
        setTodo((prevTodos) => todo.filter((prevTodos)=>{
            return prevTodos.key != id
        }))
    }
    let doneAll = () => {
        setTodo((prevtodos)=>(
            prevtodos.map((todo)=>{
                return {...todo,isDone: true}
            })
        )
        )
    }
    let cancelAll = () => {
        setTodo((prevtodos)=>(
            prevtodos.map((todo)=>{
                return {...todo,isDone: false}
            })
        )
        )
    }
    let updateOne = (id) => {
        setTodo((prevtodos)=>(
            prevtodos.map((todo)=>{
                if(todo.key==id){
                    return {...todo,isDone: !todo.isDone}
                } else {
                    return todo
                }
            })
        )
        )
    }
    return(
        <div>
            <input type="text" placeholder='Add Task' value={newTodo} onChange={updateTodoValue}/>
            <button onClick={addNewTask}>Add</button>
            <br /><br /><hr />
            <h3>Todo List</h3>
            <ul>
                {
                    todo.map((todo)=>(
                        <li style={todo.isDone==true?{textDecoration: "line-through"}:{}} key={todo.key}>
                            {todo.task} 
                            <button onClick={()=>removeTask(todo.key)}>Delete</button>
                            <button onClick={()=>updateOne(todo.key)}>{todo.isDone==false?"Mark as complete":"Mark as incomplete"}</button>
                        </li>
                    ))
                }
            </ul>
            <br /><br />
            <button onClick={doneAll}>Mark all as complete</button>
            <button onClick={cancelAll}>Mark all as incomplete</button>
        </div>
    )
}
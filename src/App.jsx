import { useEffect, useState } from "react"
import { TodoProvider } from "./Contexts/index"
import { TodoItems } from "./components"
import {Todoform} from "./components"

function App() {
  const [todos, setTodo] = useState([])

  const addtodo =(todo)=>{
    setTodo((prev)=>[{id:Date.now(), ...todo}, ...prev])
  }

  const updatetodo = (id,todo)=>{
  setTodo((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo :prevTodo)))
  }

  const deletetodo = (id)=>{
    setTodo((prev) => prev.filter((todo)=> todo.id !== id) )
  }

  const toggletodo = (id)=>{
    setTodo((prev)=> prev.map((prevTodo) => prevTodo.id === id? {...prevTodo,
                    completed : !prevTodo.completed}:prevTodo))
  }

  // Local storage ka use krenge to set as well as get the element from the list
  // iski help se hum data ko phle wal ko get  bhi kr skte h strings ki form m hota h data
  // useffect ka use krenge ko ek hjgh store krde hor get krle

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      setTodo(todos)
    }
  },[])

// agr hum chahte jaise hum value dale hor vo set ho jaye hmare local storage m 
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <TodoProvider value={{todos, addtodo,updatetodo,deletetodo,toggletodo}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-4xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <Todoform/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                       {todos.map((todo) => (
                        <div key = {todo.id} className='w-full'>
                        <TodoItems todo={todo}/>
                        </div>
                       ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
     
    
  )
}

export default App

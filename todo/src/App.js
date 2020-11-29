import './App.css';
import {Form} from "./components/Form";
import {TodoList} from "./components/TodoList";
import {useEffect, useState} from "react";

function App() {
    //state
    const [inputText, setInputText] = useState('')
    const [todos, setTodos] = useState([])
    const [status, setStatus] = useState('all')
    const [filteredTodos, setFilteredTodos] = useState([])

    //functions
    const filterHandler = () => {
        switch (status) {
            case 'completed':
                setFilteredTodos(todos.filter(todo => todo.completed))
                break
            case 'uncompleted':
                setFilteredTodos(todos.filter(todo => !todo.completed))
                break
            default:
                setFilteredTodos(todos)
                break
        }
    }

    //runs once
    useEffect(() => {
        getLocalTodos()
    }, [])

    //useEffect
    useEffect(() => {
        filterHandler()
        saveLocalTodos()
    }, [todos, status])
    //save to local

    const saveLocalTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    const getLocalTodos = () => {
        if (localStorage.getItem('todos') === null) {
            localStorage.setItem('todos', JSON.stringify([]))
        } else {
            let localTodos = JSON.parse(localStorage.getItem('todos'))
            setTodos(localTodos)
        }
    }
    return (
        <div className="App">
            <header>
                <h1>Vladimir's todo list</h1>
            </header>
            <Form
                inputText={inputText}
                setTodos={setTodos}
                todos={todos}
                setInputText={setInputText}
                setStatus={setStatus}
            />
            <TodoList
                setTodos={setTodos}
                todos={todos}
                filteredTodos={filteredTodos}
            />
        </div>
    );
}

export default App;

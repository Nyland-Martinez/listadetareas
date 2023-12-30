import React, { useEffect, useState } from "react";
import styles from './Tareas.module.css';

const TodoList = () => {
    
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        let data = localStorage.getItem("tasks");
        if (data) {
            setTasks(JSON.parse(data));
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const AddTask = () => {
        if (newTask.trim() !== "") {
        setTasks([...tasks, { text: newTask.trim(), checked: false }]);
        setNewTask("");
        }
    };

    const DeleteTask = (index) => {
        const newTask = [...tasks];
        newTask.splice(index, 1);
        setTasks(newTask);
    };

    const ToggleTask = (index) => {
        const newTask = [...tasks];
        newTask[index].checked = !newTask[index].checked;
        setTasks(newTask);
    };

return (
    <div className= {styles.todo}>
        <h1>Lista de Tareas</h1>
        <input className={styles.inp}
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        />
        <button
            className={styles.btn1}
            onClick={AddTask}
        >
            Agregar
        </button>
        <div className>
            {tasks.map((task, index) => (
            <div className={styles.container}
                key={index}
                task={task}
            >
            <div className={styles.flex2}>
                <span
                style={{
                    marginRight: "10px",
                    textDecoration: task.checked ? "line-through" : "none",
                }}
                >
                {task.text}
                </span>
                </div>
                <input
                type="checkbox"
                checked={task.checked}
                onChange={() => ToggleTask(index)}
                />
            <div>
                <button
                className={styles.btn2}
                onClick={() => DeleteTask(index)}
                >
                Eliminar
                </button>
            </div>
        </div>
        ))}
        </div>
    </div>
    );
};

export default TodoList;
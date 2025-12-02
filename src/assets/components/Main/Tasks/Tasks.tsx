import './Tasks.css'
import { useReducer, useState, useRef } from 'react';

function Task ({title,index,taskEditor, setActive, isActive, viewBoard}:{title: string; index: number; taskEditor: any, setActive: any, isActive: boolean, viewBoard: any}) {
    const [hover,setHover] = useState(false);
    const inputRef = useRef(null);
    // add warning for empty input
    return (
    <li className={'task' +" "+ (hover && "task-hover") +" "+ (isActive && "task-active" )}
        key={index}
        onClick={()=>setActive(index)}
        onMouseOver={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
        onKeyDown={(e)=>{ if(e.key === "Enter") {setActive(index); viewBoard(false);} else if (e.key==="Delete"){taskEditor({type: "delete", index})}}}
        >
        <div style={{flex: "1", position: "relative"}} onClick={()=>{setActive(index);viewBoard(false)}}>
            <div style={{position: "absolute",height: "100%", width: "100%"}}></div>
            <input ref={inputRef} id={"taskInput"+index} className={"task-input " + (hover && "hover")} value={title} placeholder={title} onChange={(e) => taskEditor({type: "edit", value: e.target.value, index})}/>
        </div>
        {
            hover &&
            <div style={{height: "0"}}>
            <button className='task-button' onClick={()=>inputRef.current.focus()}>
                <img className="task-button-svg" src='./edit.svg'/>
            </button>
            <button className='task-button' onClick={()=>{console.log(index,isActive); if(isActive){setActive(index-1)}; taskEditor({type: "delete", index}); }}>
                <img className="task-button-svg" src='./trash.svg'/>
            </button>
            </div>
        }
    </li>
    )
}

type taskEditAction = { type: "insert"; value: string } | { type: "delete"; index:number } | { type: "edit"; index: number; value: string};

function taskReducer(state: string[], action: taskEditAction): string[] {
    switch(action.type) {
        case "insert":
            return [...state, action.value]
        case "delete":
            return state.filter((_,i) => i !== action.index)
        case "edit":
            return state.map((task, index) => index === action.index ? action.value : task)
        default:
            throw new Error()
    }
}

function Tasks() {
    const [viewBoard,setViewBoard] = useState(false)
    const [activeTask,setActiveTask] = useState(0)
    const [taskList,editTaskList] = useReducer(taskReducer,[])

    function deleteTask(index:number) {
        if (index == activeTask) {
            setActiveTask(0);
        }
        editTaskList({type: "delete", index});
    }

    return (
        <>
        {
            !viewBoard ?
             (
        <div className={'tasks-container'} onClick={()=>setViewBoard(true)}>
            {
            taskList[activeTask] 
            ? <div className='task'>{"\u00A0"+taskList[activeTask]+"\u00A0"}</div>
            : <button
                className='task-add'
                style={{width: "15vw",margin: "0.5rem"}}
                onClick={()=>{
                    editTaskList({ type: "insert", value: `Task ${taskList.length}`})
                    setActiveTask(taskList.length)
                    setViewBoard(true)
                    setTimeout(()=>{
                    const el = document.getElementById("taskInput"+taskList.length)
                    if(el) el.focus()
                    },0)
                }}>+</button>
            }
        </div>
        ) : (
        <>
            <div style={{position: "absolute", left: "0", right: "0", top: "0", bottom: "0", zIndex: "2"}} onClick={()=>setViewBoard(false)}></div>
            <div className={'tasks-container visible'}>
                <button
                    className='task-add'
                    onClick={()=>{
                        editTaskList({ type: "insert", value: `Task ${taskList.length}`})
                        setActiveTask(taskList.length)
                        setViewBoard(true)
                        setTimeout(()=>{
                        const el = document.getElementById("taskInput"+taskList.length)
                        if(el) el.focus()
                        },0)
                    }}
                >+</button>
                { taskList && taskList.map((_,index)=><Task title={taskList[index]} index={index} taskEditor={editTaskList} setActive={setActiveTask} isActive={index==activeTask} viewBoard={setViewBoard}/>) }
            </div>
        </>
        )}
        </>
    )
}

export default Tasks

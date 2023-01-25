import React,{useState, useEffect} from "react";
const App = () => {
    const [value, setValue] = useState("");
    const [data, setData] = useState([]);
    const [item, setItem] = useState([]);
    const submitItem = () => {
        if(value === "") return;
        const submitted = [
            {
                id: Date.now(),
                task: value,
                complete: false
            }
        ].concat(data);
        setData(submitted);
    }
    const deleteTask = (id) => {
        const afterDelete = data.filter(item => item.id != id);
        setData(afterDelete);
    }
    const completedTask = (id) => {
        const completed = data.map(item => {
            if(item.id === id) {
                return {...item, complete: !item.complete};
            } else return item;
        })
        setData(completed)
    }
    const deleteAll = () => {
        setData([]);
    }
    const completeCount = data.filter((item) => item.complete === true).length;
    useEffect(() => {
        const storedData = localStorage.getItem("taskStored");
        if(storedData) {
            setData(JSON.parse(storedData));
        } else setData([]);
    }, [])
    useEffect(() => {
        localStorage.setItem("taskStored", JSON.stringify(data));
    }, [data]);
    return (
        <main>
            <header>
                <a href="/">Todo List</a>
                <form>
                    <input type="text" placeholder="Add your todo" autoComplete="off" autoFocus value={value} onChange={(e) => setValue(e.target.value)}/>
                    <button type="submit" onClick={submitItem}>Add</button>
                </form>
            </header>
            <div className="container">
                <div className="head-container">
                    <h1>Here are your todo list</h1>
                </div>
                <div className="list-tasks">
                    {
                        data.map((data, index) => {
                            return (
                                <li key={data.id}>
                                    <div className="tasks" style={{backgroundColor: data.complete === true ? "#757575" : "#F57328"}}>
                                        <p>{index + 1 + ". " +  data.task}</p>
                                        <div className="btn">
                                            <button onClick={() => completedTask(data.id)}>{data.complete === true ? "Completed" : "Complete"}</button>
                                            <button onClick={() => deleteTask(data.id)}>Delete</button>
                                        </div>
                                    </div>
                                    
                                </li>
                            )
                        })
                    }
                </div>
                <div className="delete-all" style={{display: data.length === 0 ? "none" : ""}}>
                    <button onClick={deleteAll}>Delete all</button>
                </div>
                <div className="bottom-container" >
                    <p>Total tasks: {data.length = data.length < 10 ? "0" + data.length : data.length}</p>
                    <p>Completed tasks: {completeCount < 10 ? "0" + completeCount : completeCount}/{data.length = data.length < 10 ? "0" + data.length : data.length}</p>
                </div>
            </div>
        </main>
    )
}
export default App;
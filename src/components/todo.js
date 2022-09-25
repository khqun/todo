import { useState } from "react";

export default function MyTodoList() {
    const [todo, setTodo] = useState();
    const [isUser, setIsUser] = useState(false);
    const mytodo = [];
    const [fakeTodo, setFakeTodo] = useState([]);

    // submit action
    const handleSubmit = () => {
        localStorage.setItem('index', Number(localStorage.getItem('index')) + 1 || 1)
        const localIndex = localStorage.getItem('index');
        localStorage.setItem(`todo ${localIndex}`, JSON.stringify({ todo: todo, id: localStorage.getItem('index') }));
        setTodo('');
        console.log(localStorage.key(0));
    }

    // change
    const handleChange = (e) => {
        setTodo(e.target.value)
    }

    // get list
    const renderList = () => {
        const localIndex = localStorage.getItem('index');
        for (let i = 1; i <= localIndex; i++) {
            let a = JSON.parse(localStorage.getItem(`todo ${i}`));
            if (a) {
                mytodo.push({ todo: a.todo, id: Number(a.id) });
            }
            console.log(a);
            setFakeTodo(mytodo)
        }
    }
    // render list
    const renderMytodo = () => {
        return (
            fakeTodo.map((data) => {
                return (
                    <div className="row">
                        <div className="col-10">
                            <p>{data.id}. {data.todo}</p>
                        </div>
                        <div className="col-5">
                            <button
                                className="delete-but"
                                onClick={() => {
                                    localStorage.removeItem(`todo ${data.id}`);
                                    renderList();
                                }}>delete</button>
                        </div>
                    </div>
                )
            })
        )
    }

    // html
    if (!isUser) {
        return (
            <button className="ocean-button first-button" onClick={() => {
                setIsUser(true);
                renderList()
            }}>
                HELLO
            </button>
        )
    }
    return (
        <div className="container ">
            <div className="header ">
                <div className="row">
                    <div className="col-12">
                        <h1>TODOLIST</h1>
                    </div>
                    <div className="col-8">
                        <input onChange={handleChange} value={todo} className="input" />
                        <button
                            className="ocean-button submit-button"
                            onClick={() => {
                                handleSubmit();
                                renderList();
                            }} disabled={todo ? false : true}>submit</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="main">

                        {fakeTodo ? renderMytodo() : null}
                </div>
            </div>


        </div >
    );
}

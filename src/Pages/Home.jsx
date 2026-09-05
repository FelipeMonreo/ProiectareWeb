import { useState, useEffect } from 'react';
import './Home.css';

function Home() {

    const [stats, setStats] = useState(null);

    useEffect(function() {

        fetch('https://proiectarewebbackend.onrender.com/api/stats')

            .then(function(response) {
                return response.json();
            })

            .then(function(data) {
                setStats(data);
            })

            .catch(function(error) {
                console.error('Eroare statistici:', error);
            });

    }, []);

    const [time, setTime] = useState(new Date());

    useEffect(function() {

        const timer = setInterval(function() {
            setTime(new Date());
        }, 1000);

        return function() {
            clearInterval(timer);
        };

    }, []);

    const [count, setCount] = useState(0);


    // =========================
    // NOTĂ RAPIDĂ
    // =========================

    const [note, setNote] = useState('');

    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);


    function addTask() {

        if (task.trim() === '') {
            return;
        }

        setTasks(tasks.concat(task));
        setTask('');
    }

    const [users, setUsers] = useState([]);
    const [userSearch, setUserSearch] = useState('');


    useEffect(function() {

        fetch('https://jsonplaceholder.typicode.com/users')

            .then(function(response) {
                return response.json();
            })

            .then(function(data) {
                setUsers(data);
            })

            .catch(function(error) {
                console.error('Eroare API:', error);
            });

    }, []);

    return (

        <div className="home">

            <h2>Home</h2>

            <p>
                Bine ai venit pe dashboard-ul meu!
            </p>

            <h2 className="stats-title">
                Dashboard Statistici Proiecte
            </h2>


            {stats && (

                <div className="stats">

                    <div className="stat-card">

                        <p>
                            Total proiecte
                        </p>

                        <strong>
                            {stats.total}
                        </strong>

                    </div>


                    <div className="stat-card">

                        <p>
                            Finalizate
                        </p>

                        <strong>
                            {stats.done}
                        </strong>

                    </div>


                    <div className="stat-card">

                        <p>
                            În lucru
                        </p>

                        <strong>
                            {stats.inProgress}
                        </strong>

                    </div>

                </div>

            )}

            <h2 className="components-title">
                Laboratoare & Componente Interactive
            </h2>


            <div className="components">

                <div className="card clock">

                    <h3>
                        Ceas Live
                    </h3>

                    <p>
                        Ora curentă:{' '}

                        <strong>
                            {time.toLocaleTimeString()}
                        </strong>
                    </p>

                </div>

                <div className="card counter">

    <h3>
        Contor
    </h3>

    <p>
        Ai apăsat de {count} ori
    </p>

    <div className="counter-buttons">

        <button onClick={function() {
            setCount(count - 1);
        }}>
            -1
        </button>

        <button onClick={function() {
            setCount(0);
        }}>
            Reset
        </button>

        <button onClick={function() {
            setCount(count + 1);
        }}>
            +1
        </button>

    </div>

</div>

                <div className="card note">

                    <h3>
                        Notă rapidă
                    </h3>


                    <input
                        type="text"
                        value={note}
                        onChange={function(e) {
                            setNote(e.target.value);
                        }}
                    />


                    <p>
                        Ai scris: {note}
                    </p>

                </div>

                <div className="card todo">

                    <h3>
                        Todo List
                    </h3>


                    <input
                        type="text"
                        placeholder="Adaugă un task..."
                        value={task}
                        onChange={function(e) {
                            setTask(e.target.value);
                        }}
                    />


                    <button onClick={addTask}>
                        Adaugă
                    </button>


                    <ul>

                        {tasks.map(function(item, index) {

                            return (

                                <li key={index}>
                                    {item}
                                </li>

                            );

                        })}

                    </ul>

                </div>

                <div className="card api-card">

                    <h2>
                        API Public Demo (JSONPlaceholder Users)
                    </h2>


                    <input
                        type="text"
                        placeholder="Caută utilizator..."
                        value={userSearch}
                        onChange={function(e) {
                            setUserSearch(e.target.value);
                        }}
                    />


                    <ul>

                        {users

                            .filter(function(user) {

                                return user.name
                                    .toLowerCase()
                                    .includes(
                                        userSearch.toLowerCase()
                                    );

                            })

                            .map(function(user) {

                                return (

                                    <li key={user.id}>

                                        <strong>
                                            {user.name}
                                        </strong>

                                        {' '}({user.email})

                                        {' — '}

                                        <i>
                                            {user.company.name}
                                        </i>

                                    </li>

                                );

                            })}

                    </ul>

                </div>


            </div>

        </div>

    );
}

export default Home;
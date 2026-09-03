import {useState, useEffect} from 'react';

function Home() {
  const [stats, setStats] =useState(null);
  useEffect(function() {
    fetch('http://localhost:3000/api/stats')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            setStats(data);
        });
}, []);
  return (
    <div>
      <h2>Home</h2>
      <p>Bine ai venit pe dashboard-ul meu!</p>
        <h1>Dashboard</h1>

     {stats && (
            <div>
                <p>Total proiecte: {stats.total}</p>
                <p>Finalizate: {stats.done}</p>
                <p>În lucru: {stats.inProgress}</p>
            </div>
        )}
    </div>
  );
}

export default Home;
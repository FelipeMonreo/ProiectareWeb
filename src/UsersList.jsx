import { useState, useEffect } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Eroare la încărcarea utilizatorilor.');
        }

        return response.json();
      })
      .then(function(data) {
        setUsers(data);
        setLoading(false);
      })
      .catch(function(error) {
        setError('Eroare la încărcarea utilizatorilor.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Se incarca...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Utilizatori</h2>

      <ul>
        {users.map(function(user) {
          return (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default UsersList;
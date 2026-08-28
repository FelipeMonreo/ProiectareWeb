import { useState, useEffect } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function() {
    fetch('/data/projects.json')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Eroare la încărcarea datelor.');
        }

        return response.json();
      })
      .then(function(data) {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(function(error) {
        setError('Eroare la încărcarea datelor.');
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
      <h3>Proiecte</h3>

      <ul>
        {projects.map(function(project) {
          return (
            <li key={project.id}>
              <strong>{project.title}</strong>
              <span> - {project.tech}</span>

              <span>
                {project.done ? ' - Finalizat' : ' - În lucru'}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectList;
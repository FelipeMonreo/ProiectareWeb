import { useState, useEffect } from 'react';

function ProjectList() {
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTech, setEditTech] = useState('');
  const [search, setSearch] = useState('');
  const total = projects.length;
  const completed = projects.filter(function(project) {
	return project.done === true;
  }).length;
  const inProgress = projects.filter(function(project) {
	return project.done === false;
  }).length;

  useEffect(function() {
    fetch('http://localhost:3000/api/projects')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Eroare la încărcarea datelor.');
        }

        return response.json();
      })
      .then(function(data) {
        setProjects(data);
        setLoading(false);
      })
      .catch(function(error) {
        setError('Eroare la incarcarea datelor.');
        setLoading(false);
      });
  }, []);
  
    async function handleSubmit(event) {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                tech: tech,
				done: done
            })
        });

        const newProject = await response.json();

        setProjects([...projects, newProject]);

        setTitle('');
        setTech('');
		setDone(false);
    } catch (err) {
        console.error('Eroare:', err);
    }
}

async function handleDelete(id) {
  if (!window.confirm('Sigur dorești să ștergi acest proiect?')) {
        return;
    }
    try {
        await fetch('http://localhost:3000/api/projects/' + id, {
            method: 'DELETE'
        });

        setProjects(
            projects.filter(function(p) {
                return p._id !== id;
            })
        );
    } catch (err) {
        console.error('Eroare:', err);
    }
}

async function handleToggle(id, currentDone) {
    try {
        const response = await fetch(
            'http://localhost:3000/api/projects/' + id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    done: !currentDone
                })
            }
        );

        const updatedProject = await response.json();

        setProjects(
            projects.map(function(p) {
                if (p._id === id) {
                    return updatedProject;
                }

                return p;
            })
        );

    } catch (err) {
        console.error('Eroare:', err);
    }
}

  if (loading) {
    return <p>Se incarca...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  function handleEdit(project) {
    setEditingId(project._id);
    setEditTitle(project.title);
    setEditTech(project.tech);
}

async function handleSave() {
    const response = await fetch(
        'http://localhost:3000/api/projects/' + editingId,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: editTitle,
                tech: editTech
            })
        }
    );

    const updatedProject = await response.json();

    setProjects(
        projects.map(function(p) {
            return p._id === editingId ? updatedProject : p;
        })
    );

    setEditingId(null);
}

  return (
    <div>
      <h3>Proiecte</h3>
	  
	  	  <input
		type="text"
		placeholder="Cauta proiect..."
		value={search}
		onChange={(e) => setSearch(e.target.value)}
      />
	  
	<div>
      <p>Total proiecte: {total}</p>
	  <p>Finalizate: {completed}</p>
	  <p>În lucru: {inProgress}</p>
	</div>
	  
	<form onSubmit={handleSubmit}>
    <input
        type="text"
        placeholder="Titlu proiect"
        value={title}
        onChange={function(e) {
            setTitle(e.target.value);
        }}
    />

    <input
        type="text"
        placeholder="Tehnologii"
        value={tech}
        onChange={function(e) {
            setTech(e.target.value);
        }}
    />
	
	<select
    value={done}
    onChange={function(e) {
        setDone(e.target.value === 'true');
    }}
>
    <option value="false">În lucru</option>
    <option value="true">Finalizat</option>
</select>

		<button type="submit"
    className='add-button'>
        Adaugă proiect
		</button>
	</form>

      <ul className='project-list'>
        {projects
		.filter(function(project) {
    return project.title 
  .toLowerCase() 
  .includes(search.toLowerCase()); 
}) 
.map(function(project) { 

  if (editingId === project._id) {
    return (
      <li 
      key={project._id}
      className={project.done ? 'project-card done' : 'project-card progress'}>

        <input
          value={editTitle}
          onChange={function(e) {
            setEditTitle(e.target.value);
          }}
        />

        <input
          value={editTech}
          onChange={function(e) {
            setEditTech(e.target.value);
          }}
        />

        <button onClick={handleSave} className='save-button'>
          Salvează
        </button>

        <button className='cancel-button' onClick={function() {
          setEditingId(null);
        }}>
          Anulează
        </button>

      </li>
    );
  }

  return (
    <li key={project._id}>

      <strong>{project.title}</strong>

      <span> - {project.tech}</span>

      <span className={project.done ? 'status-done' : 'status-progress'}>
        {project.done ? ' - Finalizat' : ' - În lucru'}
      </span>

      <button
    className="toggle-button"
    onClick={function() {
        handleToggle(project._id, project.done);
    }}
>
    {project.done ? 'Marchează ca în lucru' : 'Finalizează'}
</button>

      <button
      className='edit-button'
      onClick={function() {
        handleEdit(project);
      }}>
        Editează
      </button>

      <button 
      className='delete-button'
      onClick={function() {
        handleDelete(project._id);
      }}>
        Șterge
      </button>

    </li>
  );
})}
      </ul>
    </div>
  );
}

export default ProjectList;
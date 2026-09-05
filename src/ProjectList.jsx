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
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const total = projects.length;
  const completed = projects.filter(function(project) {
	return project.done === true;
  }).length;
  const inProgress = projects.filter(function(project) {
	return project.done === false;
  }).length;

  useEffect(function() {
    fetch('https://proiectarewebbackend.onrender.com/api/projects')
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
        const response = await fetch('https://proiectarewebbackend.onrender.com/api/projects', {
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
        await fetch('https://proiectarewebbackend.onrender.com/api/projects/' + id, {
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
            'https://proiectarewebbackend.onrender.com/api/projects/' + id,
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
        'https://proiectarewebbackend.onrender.com/api/projects/' + editingId,
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
        className='search-input'
		type="text"
		placeholder="Cauta proiect..."
		value={search}
		onChange={(e) => setSearch(e.target.value)}
      />

      <select
      className='project-input'
    value={statusFilter}
    onChange={function(e) {
        setStatusFilter(e.target.value);
    }}
>
    <option value="all">Toate</option>
    <option value="done">Finalizate</option>
    <option value="pending">În lucru</option>
</select>
	  
    <select
    className='project-input'
    value={sortBy}
    onChange={function(e) {
        setSortBy(e.target.value);
    }}
>
    <option value="title">Sortează după titlu</option>
    <option value="id">Sortează după dată</option>
</select>

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
  className='project-input'
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
    .filter(function(project) {
        if (statusFilter === 'done') {
            return project.done === true;
        }

        if (statusFilter === 'pending') {
            return project.done === false;
        }

        return true;
    })
    .sort(function(a, b) {
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        }

        if (sortBy === 'id') {
            return a._id.localeCompare(b._id);
        }

        return 0;
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
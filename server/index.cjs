const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dashboard')
  .then(function() {
    console.log('Conectat la MongoDB!');
  })
  .catch(function(err) {
    console.error('Eroare conectare MongoDB:', err);
  });
app.use (cors());
app.use(express.json());

const PORT = 3000;

const projects = [
    {
        id: 1,
        title: 'Pagina Personala',
        tech: 'HTML, CSS',
        done: true
    },
    {
        id: 2,
        title: 'Solitaire HTML',
        tech: 'HTML, CSS, JS',
        done: true
    },
    {
        id: 3,
        title: 'Dashboard React',
        tech: 'React',
        done: false
    },
    {
        id: 4,
        title: 'API Meteo',
        tech: 'React, API',
        done: false
    }
];

app.get('/', function(req, res) {
    res.json({ message: 'Serverul functioneaza!' });
});

app.get('/api/projects', function(req, res) {
    res.json(projects);
});

app.post('/api/projects', function(req, res) {
    const newProject = {
        id: projects.length + 1,
        title: req.body.title,
        tech: req.body.tech,
        done: req.body.done || false
    };

    projects.push(newProject);

    res.status(201).json(newProject);
});

app.get('/api/projects/:id', function(req, res) {
    const id = Number(req.params.id);

    const project = projects.find(function(p) {
        return p.id === id;
    });

    if (!project) {
        return res.status(404).json({
            error: 'Proiectul nu exista'
        });
    }

    res.json(project);
});

app.delete('/api/projects/:id', function(req, res) {
    const id = parseInt(req.params.id);

    const index = projects.findIndex(function(p) {
        return p.id === id;
    });

    if (index === -1) {
        return res.status(404).json({
            error: 'Not found'
        });
    }

    projects.splice(index, 1);

    res.json({
        message: 'Deleted'
    });
});

app.put('/api/projects/:id', function(req, res) {
    const id = parseInt(req.params.id);

    const project = projects.find(function(p) {
        return p.id === id;
    });

    if (!project) {
        return res.status(404).json({
            error: 'Not found'
        });
    }

    if (req.body.title !== undefined) {
        project.title = req.body.title;
    }

    if (req.body.tech !== undefined) {
        project.tech = req.body.tech;
    }

    if (req.body.done !== undefined) {
        project.done = req.body.done;
    }

    res.json(project);
});

app.get('/api/stats', function(req, res) {
    const total = projects.length;

    const done = projects.filter(function(p) {
        return p.done === true;
    }).length;

    const pending = total - done;

    res.json({
        total: total,
        done: done,
        pending: pending
    });
});

app.listen(PORT, function() {
    console.log('Server pornit pe http://localhost:' + PORT);
});
const express = require('express');

const app = express();

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

app.listen(PORT, function() {
    console.log('Server pornit pe http://localhost:' + PORT);
});
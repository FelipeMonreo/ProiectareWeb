import { useState } from 'react';
import Card from './Card';
import QuickNote from './QuickNote';
const projects = [
  {
    title: "Proiect 1",
    description: "Pagina personala"
  },
  {
    title: "Proiect 2",
    description: "Solitaire HTML"
  },
  {
    title: "Proiect 3",
    description: "Dashboard React"
  },
  {
    title: "Proiect 4",
    description: "Aplicatie telefon"
  },
  {
    title: "Proiect 5",
    description: "Joc in unity"
  }
];

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        <p>Salut! Ma cheama Filip Tanase</p>
      </header>
      
      <hr />

      <main>
        <h2>Despre mine</h2>
        <p>
          Numele meu este Filip și învăț să dezvolt aplicații folosind React.
        </p>
        

        <h2>Hobby-uri</h2>

        <ul>
          <li>Graphic Design</li>
          <li>Gaming</li>
          <li>Muzica</li>
          <li>Programare</li>
          <li>Tatuajele</li>
        </ul>

        <QuickNote />

        <h2>Obiective</h2>

        <ol>
          <li>Să învăț React</li>
          <li>Să creez componente</li>
          <li>Să învăț HTML mai bine</li>
        </ol>

        <h2>Proiecte</h2>
        {projects.map(function(item, index) {
  return (
    <Card
      key={index}
      title={item.title}
      description={item.description}
    />
  );
})}
<h2>Counter</h2>
            <p>Ai apasat de {count} ori</p>
            <button onClick={() => setCount(count + 1)}>
  +1
</button>
<button onClick={() => setCount(count - 1)}>
  -1
</button>
<button onClick={() => setCount(0)}>
  Reset
</button>
        <h2>Contact</h2>

        <p>Email:</p>
        <a href="mailto:ftanase2006@gmail.com">
          Trimite-mi un email
        </a>

        <br />

        <a href="https://github.com" target="_blank">
          Profilul meu GitHub
        </a>

        <h2>Imagine</h2>

        <img
          src="https://via.placeholder.com/300"
          alt="Imagine exemplu"
        />

        <h2>Abilități</h2>

        <table border="1">
          <thead>
            <tr>
              <th>Tehnologie</th>
              <th>Nivel</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>HTML</td>
              <td>Intermediar</td>
            </tr>

            <tr>
              <td>CSS</td>
              <td>Incepator</td>
            </tr>

            <tr>
              <td>JavaScript</td>
              <td>Începător</td>
            </tr>

            <tr>
              <td>React</td>
              <td>Începător</td>
            </tr>
          </tbody>
        </table>

        <h2>Progres React</h2>

        <progress value="20" max="100">
          20%
        </progress>
      </main>

      <footer>
        <hr />
        <p>© 2026 - Tanase Filip</p>
      </footer>
    </div>
  );
}

export default App;
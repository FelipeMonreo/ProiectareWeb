const educationList= document.querySelector("#education ol");
const items = educationList.querySelectorAll("li");
const educationArray = Array.from(items).map(function(item) {
    return item.textContent;
});
console.log(educationArray);
const firstWords = educationArray.map(function(item) {
    return item.split(" ")[0];
});
console.log("Primele cuvinte: ", firstWords);
const filter2024= educationArray.filter(function(item) {
    return item.includes("2024");
});
console.log("Filtru 2024: ", filter2024);
const filterUniversitate=educationArray.filter(function(item) {
    return item.includes("Universitate");
});
console.log("Filtru Universitate: ", filterUniversitate);
const currentYear = new Date().getFullYear();

const totalYears = educationArray.reduce((total, item) => {

  const years = item.match(/\d{4}/g);

  if (years) {
    const start = parseInt(years[0]);
    const end = years[1] ? parseInt(years[1]) : currentYear;

    return total + (end - start);
  }

  return total;

}, 0);

console.log("Total ani de studiu:", totalYears);

const projects = [
  { name: "Pagina personala", tech: "HTML, CSS", done: true },
  { name: "Formular contact", tech: "HTML, JS", done: true },
  { name: "Dark Mode Website", tech: "CSS, JS", done: true },
  { name: "ToDo App", tech: "JavaScript", done: false }
];
const projectsList = document.getElementById("projects-list");

projectsList.innerHTML = projects
  .map(project => 
    `<li>
      <strong>${project.name}</strong> - ${project.tech}
      ${project.done ? "✅" : "❌"}
    </li>`
  )
  .join("");
  const completed = projects.filter(project => project.done).length;
const total = projects.length;

document.getElementById("projects-summary").textContent =
  `Finalizate: ${completed} din ${total}`;
  async function loadProjects() {
  try {
    const response = await fetch("data/projects.json");

    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    const projects = await response.json();

    const projectsList = document.getElementById("projects-list");
    const summary = document.getElementById("projects-summary");

    projectsList.innerHTML = projects
      .map(p => `<li><strong>${p.name}</strong> - ${p.tech} ${p.done ? "✅" : "❌"}</li>`)
      .join("");

    const completed = projects.filter(p => p.done).length;
    summary.textContent = `Finalizate: ${completed} din ${projects.length}`;
  } catch (error) {
    console.error("Eroare la încărcarea proiectelor:", error);

    const summary = document.getElementById("projects-summary");
    if (summary) {
      summary.textContent = "Nu am putut încărca proiectele. Verifică Live Server + calea către JSON.";
      summary.style.color = "red";
    }
  }
}

window.addEventListener("DOMContentLoaded", function () {
  loadProjects();
});
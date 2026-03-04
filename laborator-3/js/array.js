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
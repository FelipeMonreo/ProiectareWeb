const educationList= document.querySelector("#education ol");
const items = educationList.querySelectorAll("li");
const educationArray = Array.from(items).map(function(item) {
    return item.textContent;
});
console.log(educationArray);
const filter2024= educationArray.filter(function(item) {
    return item.includes("2024");
});
console.log("Filtru 2024: ", filter2024);
const filterUNITBV=educationArray.filter(function(item) {
    return item.includes("UNITBV");
});
console.log("Filtru UNIBV: ", filterUNITBV);
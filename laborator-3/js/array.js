const educationList= document.querySelector("#education ol");
const items = educationList.querySelectorAll("li");
const educationArray = Array.from(items).map(function(item) {
    return item.textContent;
});
console.log(educationArray);
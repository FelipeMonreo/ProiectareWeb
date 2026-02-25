function submitForm() {
    const nume= document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const mesaj=document.getElementById("message").value;
    console.log("Nume:", nume);
    console.log("Email:", email);
    console.log("Mesag:",mesaj);

    console.warn("Goodbye World!");
}
window.addEventListener("DOMContentLoaded", function () {

  const paragraf = document.querySelector("header p");
  const ora = new Date().getHours();

  if (ora >= 6 && ora <= 11) {
    paragraf.textContent = "Dimineata superba, pofta la cafeluta suflet drag!";
  } 
  else if (ora >= 12 && ora <= 16) {
    paragraf.textContent = "Ziua frumoasa drag domn/doamna. Bine ati venit pe pagina mea web in aceasta zi superba";
  } 
  else {
    paragraf.textContent = "Seara buna si somn usor draga pasarica <3!";
  }

});
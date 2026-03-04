const form = document.querySelector("form");

form.addEventListener("submit", function (event) {

  event.preventDefault();

  const nume = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mesaj = document.getElementById("message").value.trim();
  const feedback = document.getElementById("form-feedback");

  if (nume.length < 2) {
    feedback.textContent = "Nume prea scurt!";
    feedback.style.color = "red";
    return;
  }


  if (!email.includes("@")) {
    feedback.textContent = "Email invalid!";
    feedback.style.color = "red";
    return;
  }


  if (mesaj.length < 10) {
    feedback.textContent = "Mesajul trebuie să aibă cel puțin 10 caractere!";
    feedback.style.color = "red";
    return;
  }

  feedback.textContent = `Mulțumim, ${nume}! Mesajul a fost trimis.`;
  feedback.style.color = "green";

  console.log("Formular valid ✅");
});

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

  const toggleBtn = document.getElementById("theme-toggle");

  toggleBtn.addEventListener("click", function (e) {
    e.preventDefault();

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      toggleBtn.textContent = "🌙 Dark Mode";
    } else {
      toggleBtn.textContent = "🌸 Light Mode";
    }
  });

  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove("hidden");
    } else {
      backToTopBtn.classList.add("hidden");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });


  const headings = document.querySelectorAll("main h2");

  headings.forEach(function (h2) {
    h2.textContent = "▼ " + h2.textContent;

    h2.addEventListener("click", function () {

      let el = this.nextElementSibling;
      const isHidden = el && el.classList.contains("hidden");

      this.textContent = (isHidden ? "▼ " : "▶ ") + this.textContent.slice(2);

      while (el) {
        el.classList.toggle("hidden");
        el = el.nextElementSibling;
      }
    });
  });

});
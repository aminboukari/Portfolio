// navbar responsive
const menuIcon = document.querySelector(".listsIcon");
const nav = document.querySelector(".navlink");

menuIcon.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuIcon.classList.toggle("active");
});


// send emails

const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // clear errors
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("subjectError").textContent = "";
  document.getElementById("messageError").textContent = "";
  document.getElementById("success").textContent = "";
  document.getElementById("failed").textContent = "";

  let isValid = true;

  const namePattern = /^[A-Za-zÀ-ÿ\s]{3,}$/;
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!name.match(namePattern)) {
    document.getElementById("nameError").textContent =
      "Name must be at least 3 letters and contain only letters";
    isValid = false;
  }

  if (!email.match(emailPattern)) {
    document.getElementById("emailError").textContent =
      "Invalid email format";
    isValid = false;
  }

  if (subject === "" || subject.length < 10 ) {
    document.getElementById("subjectError").textContent =
      "Subject is required and must be at least 10 characters ";
    isValid = false;
  }

  if (message === "" || message.length < 10) {
    document.getElementById("messageError").textContent =
      "Message is required and must be at least 10 characters ";
    isValid = false;
  }

  if (!isValid) return;

  const data = { name, email, subject, message };

  emailjs
    .send("serviceId", "template_Id", data)
    .then(() => {
      document.getElementById("success").textContent =
        "Email sent successfully!";
      form.reset();

      setTimeout(() => {
        document.getElementById("success").textContent = "";
      }, 3000);
    })
    .catch(() => {
      document.getElementById("failed").textContent =
        "Email not sent!";

      setTimeout(() => {
        document.getElementById("failed").textContent = "";
      }, 3000);
    });
});
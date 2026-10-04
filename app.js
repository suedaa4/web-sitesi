const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".navLinks");
const navItems = document.querySelectorAll(".navLinks a");

const contactForm = document.getElementById("contactForm");
const sendEmailBtn = document.getElementById("sendEmailBtn");
const formStatus = document.getElementById("formStatus");

// Mobil menü açma/kapama
mobileMenu.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

navItems.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
  });
});

function resetSendButton() {
  setTimeout(function () {
    sendEmailBtn.textContent = "Send Message";
    sendEmailBtn.disabled = false;
    formStatus.textContent = "";
  }, 3000);
}

// İletişim Formu Gönderimi (Backend Sunucusuna Fetch İsteği)
contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  sendEmailBtn.textContent = "Sending...";
  sendEmailBtn.disabled = true;
  formStatus.textContent = "";

  const formData = {
    name: document.getElementById("userName").value,
    email: document.getElementById("userEmail").value,
    message: document.getElementById("userMessage").value,
  };

  try {
    const response = await fetch("http://localhost:3000/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      sendEmailBtn.textContent = "Message Sent!";
      formStatus.textContent = "Your message has been sent successfully.";
      contactForm.reset();
    } else {
      sendEmailBtn.textContent = "Failed to Send";
      formStatus.textContent =
        "Your message could not be sent. Please try again.";
    }
  } catch (error) {
    console.error("Connection error:", error);
    sendEmailBtn.textContent = "Failed to Send";
    formStatus.textContent =
      "Server connection error. Please make sure the server is running.";
  } finally {
    resetSendButton();
  }
});

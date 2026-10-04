document.addEventListener("DOMContentLoaded", () => {
  // Mobil menü veya diğer arayüz elementleri için temel seçiciler
  const contactForm = document.getElementById("contact-form");

  // İletişim Formu Gönderim İşlemi
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Form içindeki inputların ID'lerine göre verileri alıyoruz
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      const formData = {
        name: nameInput ? nameInput.value : "",
        email: emailInput ? emailInput.value : "",
        message: messageInput ? messageInput.value : "",
      };

      try {
        // Render canlı backend adresimize istek atıyoruz
        const response = await fetch(
          "https://web-sitesi-slxl.onrender.com/api/send-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );

        const result = await response.json();

        if (response.ok) {
          alert("Mesajınız başarıyla gönderildi!");
          contactForm.reset(); // Formu temizle
        } else {
          alert("Gönderilemedi: " + (result.error || "Lütfen tekrar deneyin."));
        }
      } catch (error) {
        console.error("Bağlantı hatası:", error);
        alert("Sunucuya bağlanırken bir hata oluştu.");
      }
    });
  }
});

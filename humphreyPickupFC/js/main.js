document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".home-slider")) {
    new Swiper(".home-slider", {
      loop: true,
      speed: 800,
      effect: "fade",
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
});
const form = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    feedback.textContent =
      "Thanks for your message! We'll get back to you soon.";
    form.reset();
  });
}

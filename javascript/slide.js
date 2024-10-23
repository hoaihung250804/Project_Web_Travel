let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide(index) {
  const previousSlide = slides[currentSlide];
  const nextSlide = slides[index];

  previousSlide.classList.remove("active");
  previousSlide.classList.add("previous");

  setTimeout(() => {
    previousSlide.classList.remove("previous");
  }, 1000);

  nextSlide.classList.add("active");

  currentSlide = index;
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % totalSlides;
  showSlide(nextIndex);
}

setInterval(nextSlide, 2000);
showSlide(currentSlide);

// Add interactivity if needed (for example, applying filters)
// Here we just have a basic event listener for the filter button
document.querySelector(".filter-btn").addEventListener("click", function () {
  alert("Lọc kết quả theo lựa chọn của bạn!");
});

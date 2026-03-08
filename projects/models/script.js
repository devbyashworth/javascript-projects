let isOpen = false;

const overlay = document.getElementById("modalOverlay");
const openBtn = document.getElementById("openModalBtn");
const signupBtn = document.getElementById("signupBtn");
const modal = document.getElementById("modalDialog");

const toggleModal = () => {
  overlay.classList.toggle("open");
  modal.classList.toggle("open");
  isOpen = !isOpen;
};

openBtn.addEventListener("click", toggleModal);
signupBtn.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);

modal.addEventListener("click", (e) => {
  e.stopPropagation();
});

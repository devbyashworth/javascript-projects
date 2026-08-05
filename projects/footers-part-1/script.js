let isOpen = false;

const modal = document.querySelector(".modal");
const dialog = document.getElementById("modalDialog");
const overlay = document.getElementById("modalOverlay");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");

const toggleModal = () => {
  overlay.classList.remove("open", "closed");
  modal.classList.remove("open", "closed");
  void overlay.offsetWidth;
  void modal.offsetWidth;

  if (!isOpen) {
    overlay.classList.add("open");
    modal.classList.add("open");
  } else {
    overlay.classList.add("closed");
    modal.classList.add("closed");
  }

  isOpen = !isOpen;
};

openBtn.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);
closeBtn.addEventListener("click", toggleModal);
dialog.addEventListener("click", (evt) => {
  evt.stopPropagation();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isOpen) {
    toggleModal();
  }
});

const toggleMenuBtn = document.querySelector("#toggle-btn");
const body = document.querySelector("body");
toggleMenuBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  body.classList.toggle("sidebar__toggled");
});

const modalByDelete = document.querySelector("#deleteModal");
modalByDelete.addEventListener("show.bs.modal", function (event) {
  const button = event.relatedTarget;
  const orderId = button.dataset.bsOrderId;
  console.log(orderId);
  const modalText = modalByDelete.querySelector("#deleteText");
  modalText.textContent = orderId;
});

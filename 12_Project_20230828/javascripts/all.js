//左側選單
const toggleMenuBtn = document.querySelector("#toggle-btn");
const body = document.querySelector("body");
toggleMenuBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  body.classList.toggle("sidebar__toggled");
});

//Modal
const modalByDelete = document.querySelector("#deleteModal");
if (modalByDelete) {
  modalByDelete.addEventListener("show.bs.modal", function (event) {
    console.log(modalByDelete);
    const button = event.relatedTarget;
    const orderId = button.dataset.bsOrderId;
    console.log(orderId);
    const modalText = modalByDelete.querySelector("#deleteText");
    modalText.textContent = orderId;
  });
}

window.onload = function () {
  // Get the modal
  const modal = document.getElementById("myModal");

  // Get the button that opens the modal
  const btn = document.getElementById("submitBtn");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];
  const form = document.getElementById("form");
  const print = document.getElementById("printBtn");
  const confirm = document.getElementById("confirmBtn");
  const reset = document.getElementById("resetBtn");

  // When the user clicks on the button, open the modal
  btn.onclick = function (event) {
    event.preventDefault();
    modal.style.display = "flex";
  };
  confirm.onclick = function (event) {
    form.submit();
  };
  print.onclick = function (event) {
    event.preventDefault();
  };
  reset.onclick = (event) => {
    event.preventDefault();
    form.reset();
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.getElementById("form").reset();
    }
  };
};

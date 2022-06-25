const ERROR = "error";

const validateQuestion = (number) => {
  var radios = document.getElementsByName("question" + number);
  var questionValid = false;
  var i = 0;
  while (!questionValid && i < radios.length) {
    if (radios[i].checked) questionValid = true;
    i++;
  }
  if (!questionValid)
    document.getElementById("question" + number).classList.add(ERROR);
  return questionValid;
};

const validateForm = () => {
  var formValid = true;

  for (let i = 1; i <= 5; i++) {
    if (!validateQuestion(i)) formValid = false;
  }
  return formValid;
};
const changeHandler = (number) => {
  return () => {
    document.getElementById("question" + number).classList.remove(ERROR);
  };
};
const addChange = () => {
  for (let i = 1; i <= 5; i++) {
    var radios = document.querySelectorAll(
      'input[type=radio][name="question' + i + '"]'
    );
    radios.forEach((radio) => {
      radio.addEventListener("change", changeHandler(i));
    });
  }
};
const removeError = () => {
  for (let i = 1; i <= 5; i++) {
    var radios = document
      .getElementById("question" + i)
      .classList.remove(ERROR);
  }
};
var radios = document.querySelectorAll('input[type=radio][name="question1"]');
radios.forEach((radio) => radio.addEventListener("change", changeHandler));

window.onload = function () {
  const modal = document.getElementById("myModal");
  const modalError = document.getElementById("myModalError");

  const btn = document.getElementById("submitBtn");

  const span = document.getElementsByClassName("close")[0];
  const spanError = document.getElementsByClassName("closeError")[0];
  const form = document.getElementById("form");
  const print = document.getElementById("printBtn");
  const confirm = document.getElementById("confirmBtn");
  const reset = document.getElementById("resetBtn");

  btn.onclick = function (event) {
    event.preventDefault();
    let valid = validateForm();

    if (valid) modal.style.display = "flex";
    else modalError.style.display = "flex";
  };
  confirm.onclick = function (event) {
    form.submit();
  };
  print.onclick = function (event) {
    event.preventDefault();
  };
  reset.onclick = (event) => {
    event.preventDefault();
    removeError();
    form.reset();
  };

  span.onclick = function () {
    modal.style.display = "none";
  };
  spanError.onclick = function () {
    modalError.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) modal.style.display = "none";
    if (event.target == modalError) modalError.style.display = "none";
  };
  addChange();
};

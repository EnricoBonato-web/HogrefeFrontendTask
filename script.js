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
    const formData = new FormData(document.querySelector("form"));
    let total = 0;
    const ul = document.getElementById("results");
    ul.innerHTML = "";

    for (var pair of formData.entries()) {
      var li = document.createElement("li");
      li.setAttribute("class", "result");
      li.appendChild(
        document.createTextNode(pair[0] + ":    value " + pair[1])
      );
      ul.appendChild(li);
      total += +pair[1];
    }
    var li = document.createElement("li");
    li.setAttribute("class", "total");
    li.appendChild(document.createTextNode("total" + ": " + total));
    ul.appendChild(li);
  };
  confirm.onclick = function (event) {
    form.submit();
  };
  print.onclick = function (event) {
    event.preventDefault();
    const formData = new FormData(document.querySelector("form"));
    let total = 0;
    let array = [];

    for (var pair of formData.entries()) {
      array.push([pair[0], pair[1]]);
      total += +pair[1];
    }
    array.push(["total", total]);
    var csv = "";
    for (let row of array) {
      for (let col of row) {
        csv += col + ",";
      }
      csv += "\r\n";
    }
    var myBlob = new Blob([csv], { type: "text/csv" });
    var url = window.URL.createObjectURL(myBlob);
    var anchor = document.createElement("a");
    anchor.href = url;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    anchor.download = "results" + today + ".csv";

    anchor.click();
    window.URL.revokeObjectURL(url);
    anchor.remove();
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

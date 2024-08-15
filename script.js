"use strict";

function vypocet() {
  const flight = parseFloat(document.querySelector("#let").value);
  const Person = parseInt(document.querySelector("#person").value);
  const back = document.querySelector("#backFlight").checked;
  const selectedClass = document.querySelector('input[name="class"]:checked');

  let trida = 0;
  let celkovaCena = flight * Person;

  if (selectedClass) {
    trida = parseFloat(selectedClass.value);
  }
  if (back) {
    celkovaCena *= 2;
  }
  celkovaCena += celkovaCena * trida;
  return celkovaCena;
}

function rozpocet() {
  const celaCena = vypocet();
  const amountInput = document.querySelector("#amount").value;
  const kontrolniCena = parseFloat(amountInput);
  const resultDiv = document.querySelector("#result");

  resultDiv.classList.remove("dostatecne", "nedostatecne");

  if (amountInput === "" || isNaN(kontrolniCena)) {
    resultDiv.textContent = "Nezadali jste částku.";
    return;
  }

  if (kontrolniCena >= celaCena) {
    resultDiv.textContent = `Celková cena: ${celaCena.toFixed(
      2
    )} Kč. Vaše částka je dostatečná.`;
    resultDiv.classList.add("dostatecne");
  } else {
    resultDiv.textContent = `Celková cena: ${celaCena.toFixed(
      2
    )} Kč. Vaše částka nestačí.`;
    resultDiv.classList.add("nedostatecne");
  }
}

document.querySelector(".resultBtn").addEventListener("click", function () {
  let celkem = vypocet();
  document.querySelector(
    "#result"
  ).textContent = `Celková cena: ${celkem.toFixed(2)} Kč`;
});

document.querySelector("#checkBtn").addEventListener("click", rozpocet);

function validuj(event) {
  const povolene = /^[\p{L}\p{N}\s]*$/u;
  const textArea = document.querySelector("#notes");
  const input = textArea.value;

  if (!povolene.test(input)) {
    textArea.value = input.replace(/[^\p{L}\p{N}\s]/gu, "");
  }
}

flight.addEventListener("change", function (event) {
  rozpocet();
  validuj();
});

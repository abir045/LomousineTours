const steps = Array.from(document.querySelectorAll("form .step"));
const nextBtn = document.querySelectorAll("form .next");
const prevBtn = document.querySelectorAll("form .prev");
const form = document.querySelector("form");

nextBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    changeStep("next");
  });
});

prevBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    changeStep("prev");
  });
});

function changeStep(btn) {
  let index = 0;
  const active = document.querySelector("form .step.active");
  index = steps.indexOf(active);
  steps[index].classList.remove("active");
  if (btn === "next") {
    index++;
  } else if (btn === "prev") {
    index--;
  }

  steps[index].classList.add("active");
  console.log(index);
}

const contactForm = document.getElementById("form-data");
let origin = document.getElementById("from");
let destination = document.getElementById("to");
let passengers = document.getElementById("people");
let luggage = document.getElementById("bags");
let limoType = document.getElementById("social");
let fullName = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let cardNumber = document.getElementById("cardNumber");
let cardExpiary = document.getElementById("cardExpiry");
let cardCcv = document.getElementById("cardCcv");

let picupDate = document.getElementById("basicDate");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = {
    origin: origin.value,
    destination: destination.value,
    passengers: passengers.value,
    luggage: luggage.value,
    limoType: limoType.value,
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    cardNumber: cardNumber.value,
    cardExpiary: cardExpiary.value,
    cardCcv: cardCcv.value,
    pickupDate: picupDate.value,
  };
  console.log(formData);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText);

    if (xhr.responseText == "success") {
      alert("email sent");
      origin.value = "";
      destination.value = "";
      passengers.value = "";
      luggage.value = "";
      limoType.value = "";
      fullName.value = "";
      email.value = "";
      phone.value = "";
      cardNumber.value = "";
      cardExpiary.value = "";
      cardCcv.value = "";
      picupDate.value = "";
    } else {
      alert("something went wrong");
    }
  };
  xhr.send(JSON.stringify(formData));
});

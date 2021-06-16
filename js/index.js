const form = document.querySelector(".form");
const error = document.querySelectorAll(".error");
const error_icon = document.querySelector(".error-icon");
const btn_form = document.querySelector(".btn-form");
const error_message = document.querySelector(".error-message");
const form_inputs = document.querySelectorAll(".form-input");
const password_popup = document.querySelector(".password-popup");
const eye_icon = document.querySelector(".eye-icon");
const password = document.querySelector(".check-pass");

const passwordCheck = function (pass) {
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;
  if (
    pass.match(lowerCaseLetters) &&
    pass.match(upperCaseLetters) &&
    pass.match(numbers) &&
    pass.length >= 8 &&
    pass.length <= 15
  ) {
    password_popup.classList.add("hidden");
    eye_icon.style.right = "1rem";
    return true;
  } else {
    password_popup.classList.remove("hidden");
    eye_icon.style.right = "3.7rem";
    return false;
  }
};
const emailCheck = function (email) {
  const checker =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.match(checker);
};

const addErrorMessage = function (val, html) {
  val.insertAdjacentHTML("afterend", html);
  val.style.border = "2px solid hsl(246, 25%, 77%)";
};
const errorRemove = function (val, parent, child) {
  val
    .closest(parent)
    ?.querySelectorAll(child)
    ?.forEach((arr) => {
      arr?.remove();
    });
};

const removeErrorMessage = function (val) {
  val.style.border = "2px solid hsl(248, 32%, 49%)";
  val.style.color = " rgba(#000000, 0.4)";
  errorRemove(val, ".error", ".error-icon");
  errorRemove(val, ".error", ".error-message");
  val.blur();
};

const giveError = function (event) {
  event.preventDefault();
  form_inputs.forEach((val) => {
    const html = `
        <img
                    class="error-icon"
                    src="./images/icon-error.svg"
                    alt="icon-error"
                  />
        <p class="error-message">${val.dataset.error} cannot be empty.</p>
        `;
    if (
      val.value == "" &&
      !val.classList.contains("check-email") &&
      !val.classList.contains("check-pass")
    ) {
      // val.insertAdjacentHTML("afterend", html);
      // val.style.border = "2px solid hsl(246, 25%, 77%)";
      addErrorMessage(val, html);
    } else if (val.classList.contains("check-email")) {
      !emailCheck(val.value)
        ? addErrorMessage(val, html)
        : removeErrorMessage(val);
    } else if (val.classList.contains("check-pass")) {
      passwordCheck(val.value)
        ? removeErrorMessage(val)
        : addErrorMessage(val, html);
    } else {
      // val.style.border = "2px solid hsl(248, 32%, 49%)";
      // val.style.color = " rgba(#000000, 0.4)";
      // val.closest(".error")?.querySelector(".error-icon")?.remove();
      // val.closest(".error")?.querySelector(".error-message")?.remove();
      // val.blur();
      removeErrorMessage(val);
    }
  });
};

form.addEventListener("submit", giveError);
document.querySelector(".btn-ok").addEventListener("click", function () {
  password_popup.classList.add("hidden");
});

eye_icon.addEventListener("click", function (e) {
  e.preventDefault();
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  eye_icon.classList.toggle("fa-eye");
  eye_icon.classList.toggle("fa-eye-slash");
});

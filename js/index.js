const form = document.querySelector(".form");
const error = document.querySelectorAll(".error");
const error_icon = document.querySelector(".error-icon");
const btn_form = document.querySelector(".btn-form");
const error_message = document.querySelector(".error-message");
const form_inputs = document.querySelectorAll(".form-input");

// const passwordCheck = function (pass) {
//   var lowerCaseLetters = /[a-z]/g;

// };

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
    if (val.value == "" && !val.classList.contains("check-email")) {
      // val.insertAdjacentHTML("afterend", html);
      // val.style.border = "2px solid hsl(246, 25%, 77%)";
      addErrorMessage(val, html);
    } else if (val.classList.contains("check-email")) {
      !emailCheck(val.value)
        ? addErrorMessage(val, html)
        : removeErrorMessage(val);
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

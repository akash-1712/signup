const form = document.querySelector(".form");
const error = document.querySelectorAll(".error");
const error_icon = document.querySelector(".error-icon");
const btn_form = document.querySelector(".btn-form");
const error_message = document.querySelector(".error-message");
const form_inputs = document.querySelectorAll(".form-input");

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
    if (val.value == "") {
      val.insertAdjacentHTML("afterend", html);
      val.style.border = "2px solid hsl(246, 25%, 77%)";
    } else {
      val.style.border = "2px solid hsl(248, 32%, 49%)";
      val.style.color = " rgba(#000000, 0.4)";
      val.closest(".error")?.querySelector(".error-icon")?.remove();
      val.closest(".error")?.querySelector(".error-message")?.remove();
      val.blur();
    }
  });
};

form.addEventListener("submit", giveError);

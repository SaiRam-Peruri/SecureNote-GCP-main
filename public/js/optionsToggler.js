document.getElementById("toggleOptions").addEventListener("click", function () {
  const optionsDiv = document.getElementById("options");
  const emailInput = document.getElementById("email");
  const password1Input = document.getElementById("password1");
  const password2Input = document.getElementById("password2");
  const selfDestructSelect = document.getElementById("selfDestruct");

  if (optionsDiv.classList.contains("show")) {
    emailInput.value = "";
    password1Input.value = "";
    password2Input.value = "";
    selfDestructSelect.selectedIndex = 0;

    optionsDiv.classList.remove("show");
    setTimeout(() => {
      optionsDiv.style.maxHeight = "0";
    }, 300);
    this.textContent = "Show Options";
  } else {
    optionsDiv.style.maxHeight = "500px";
    optionsDiv.classList.add("show");
    this.textContent = "Hide Options";
  }
});

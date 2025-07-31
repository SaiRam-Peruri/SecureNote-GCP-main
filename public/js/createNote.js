document.getElementById("toggleOptions").addEventListener("click", function () {
  const basicForm = document.getElementById("noteForm");
  const advancedForm = document.getElementById("noteFormAdvanced");
  const basicContent = document.getElementById("noteContent").value;

  document.getElementById("noteContentAdvanced").value = basicContent;

  basicForm.style.display = "none";
  advancedForm.style.display = "block";
});

document
  .getElementById("toggleOptionsAdvanced")
  .addEventListener("click", function () {
    const basicForm = document.getElementById("noteForm");
    const advancedForm = document.getElementById("noteFormAdvanced");
    const advancedContent = document.getElementById(
      "noteContentAdvanced"
    ).value;

    document.getElementById("noteContent").value = advancedContent;

    advancedForm.style.display = "none";
    basicForm.style.display = "block";
  });

document.getElementById("createNoteBtn").addEventListener("click", function () {
  const form = document.getElementById("noteForm");
  if (form.checkValidity()) {
    form.submit();
  } else {
    form.classList.add("was-validated");
  }
});

document
  .getElementById("createNoteAdvanced")
  .addEventListener("click", function () {
    const form = document.getElementById("noteFormAdvanced");
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;

    if (form.checkValidity()) {
      if (password1 === password2) {
        form.submit();
      } else {
        alert("Passwords do not match! Please try again.");
      }
    } else {
      form.classList.add("was-validated");
    }
  });

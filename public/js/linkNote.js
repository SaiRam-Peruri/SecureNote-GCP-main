function togglePassword() {
  const passwordInput = document.getElementById("passwordInput");
  const toggleButton = document.getElementById("togglePassword");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleButton.textContent = "Hide Password";
  } else {
    passwordInput.type = "password";
    toggleButton.textContent = "Show Password";
  }
}

function selectLink() {
  const linkInput = document.getElementById("linkInput");
  linkInput.disabled = false;
  linkInput.select();
  document.execCommand("copy");
  linkInput.disabled = true;
}

function emailLink() {
  const link = document.getElementById("linkInput").value;
  const subject = encodeURIComponent("Here is your secure link");
  const body = encodeURIComponent(
    `I wanted to share this secure link with you: ${link}\n\nThis note will be destroyed once read.`
  );

  const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink;
}

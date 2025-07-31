function copyText() {
  const textarea = document.getElementById("noteContent");
  textarea.disabled = false;
  textarea.select();
  document.execCommand("copy");
  textarea.disabled = true;
  alert("Text copied to clipboard!");
}

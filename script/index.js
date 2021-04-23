function validateForm() {
  let x = document.forms["myForm"]["fnume"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}

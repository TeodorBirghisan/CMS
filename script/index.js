function validateForm() {
  let nume = document.forms["myForm"]["fnume"].value;
  let prenume = document.forms["myForm"]["fprenume"].value;
  let email = document.forms["myForm"]["femail"].value;
  let chooseFile = document.forms["myForm"]["img"].value;
  if (chooseFile == "" || nume == "" || prenume == "" || email == "") {
    alert("Don't leave empty fields");
    return false;
  }
}

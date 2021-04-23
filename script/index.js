jQuery(document).ready(function ($) {
  console.log("ready!");
});

function validateForm() {
  let nume = document.forms["myForm"]["fnume"].value;
  let prenume = document.forms["myForm"]["fprenume"].value;
  let email = document.forms["myForm"]["femail"].value;
  let chooseFile = document.forms["myForm"]["img"];
  readURL(chooseFile);
  let sex = document.forms["myForm"]["sex"].value;
  let date = document.forms["myForm"]["trip-start"].value;
  if (nume == "" || prenume == "" || email == "") {
    alert("Don't leave empty fields");
  } else {
    var table = document.getElementById("results");
    var row = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var tdButton = document.createElement("button");
    td1.innerHTML = nume;
    td2.innerHTML = prenume;
    td3.innerHTML = email;
    td4.innerHTML = sex;
    td5.innerHTML = date;
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(tdButton);
    table.children[0].appendChild(row);
  }

  // return false to not refresh on submit
  return false;
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#header").attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

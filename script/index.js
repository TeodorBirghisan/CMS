jQuery(document).ready(function ($) {
  $("#tbody").on("click", ".deleteBtn", function () {
    $(this).closest("tr").remove();
  });
});

function validateForm() {
  let nume = document.forms["myForm"]["fnume"].value;
  let prenume = document.forms["myForm"]["fprenume"].value;
  let email = document.forms["myForm"]["femail"].value;
  let chooseFile = document.forms["myForm"]["img"];
  let sex = document.forms["myForm"]["sex"].value;
  let date = document.forms["myForm"]["trip-start"].value;
  if (nume == "" || prenume == "" || email == "") {
    alert("Don't leave empty fields");
  } else {
    var table = document
      .getElementById("results")
      .getElementsByTagName("tbody")[0];
    var id = document.getElementById("results").getElementsByTagName("tr")
      .length;
    readURL(chooseFile, id);
    var row = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");
    var tdImg = document.createElement("img");
    tdImg.style = "width:50px;height:50px;";
    tdImg.id = "header" + id;
    td6.append(tdImg);
    var tdButton = document.createElement("button");
    tdButton.className = "deleteBtn";
    tdButton.style = "width:25px;height:25px;";
    td7.append(tdButton);
    td1.innerHTML = nume;
    td2.innerHTML = prenume;
    td3.innerHTML = email;
    td4.innerHTML = sex;
    td5.innerHTML = formatDate(date);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    row.appendChild(td7);
    table.appendChild(row);
  }

  // return false to not refresh on submit
  return false;
}

function readURL(input, id) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#header" + id).attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function formatDate(userDate) {
  var d = new Date(userDate);

  const monthNames = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ];

  return d.getDay() + " " + monthNames[d.getMonth()] + " " + d.getFullYear();
}

function filterFunction() {
  var input, filter, table, tr, td, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("results");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        console.log(txtValue.toUpperCase().indexOf(filter));
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

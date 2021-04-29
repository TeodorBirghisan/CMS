jQuery(document).ready(function ($) {
  $("#tbody").on("click", ".deleteBtn", function () {
    $(this).closest("tr").remove();
  });
});

jQuery(document).ready(function ($) {
  $.ajax({
    method: "GET",
    url: "https://localhost:5001/employee/EmployeeControler",
    success: function (data) {
      loadEmployees(data);
    },
    error: function (data) {
      alert(`Failed to load employees list.`);
    },
  });
});

function loadEmployees(employeesList) {
  for (index = 0; index < employeesList.length; index++) {
    appendRow(employeesList[index]);
  }
}

function validateForm() {
  var newEmployee = new Object();
  newEmployee.Id = 0;
  newEmployee.firstName = document.forms["myForm"]["fnume"].value;
  newEmployee.lastName = document.forms["myForm"]["fprenume"].value;
  newEmployee.email = document.forms["myForm"]["femail"].value;
  newEmployee.picture = "pic.jpg"; ///document.forms["myForm"]["img"];
  newEmployee.gender = document.forms["myForm"]["sex"].value;
  newEmployee.birthdate = document.forms["myForm"]["trip-start"].value;
  if (nume == "" || prenume == "" || email == "") {
    alert("Don't leave empty fields");
  } else {
    $.ajax({
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(newEmployee),
      url: "https://localhost:5001/employee/EmployeeControler",
      success: function (data) {
        appendRow(data);
      },
      error: function (data) {
        alert(`Failed to load employees list.`);
      },
    });
  }

  // return false to not refresh on submit
  return false;
}

function appendRow(employee) {
  var table = document
    .getElementById("results")
    .getElementsByTagName("tbody")[0];
  var id = document.getElementById("results").getElementsByTagName("tr").length;
  //readURL(chooseFile, id);
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
  td1.innerHTML = employee.firstName;
  td2.innerHTML = employee.lastName;
  td3.innerHTML = employee.email;
  td4.innerHTML = employee.gender;
  td5.innerHTML = employee.birthdate;
  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);
  row.appendChild(td4);
  row.appendChild(td5);
  row.appendChild(td6);
  row.appendChild(td7);
  table.appendChild(row);
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
  var date = userDate.split("-");
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

  return date[0] + " " + monthNames[parseInt(date[1]) - 1] + " " + date[2];
}

function filterFunction() {
  var input, filter, table, tr, td, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  var filterSex = $("#filterSex").val();
  var filterInput = filterSex.toUpperCase();
  table = document.getElementById("results");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    tdSex = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      txtValueSex = tdSex.textContent || tdSex.innerText;
      if (
        txtValue.toUpperCase().indexOf(filter) > -1 &&
        txtValueSex.toUpperCase().indexOf(filterInput) > -1
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function convertDate(d) {
  var p = d.split("-");
  return +(p[0] + p[1] + p[2]);
}

function sortByDate() {
  var tbody = document.querySelector("#results tbody");
  var rows = [].slice.call(tbody.querySelectorAll("tr"));
  var sortAttribute = document.getElementById("sortBtn").getAttribute("sort");
  if (sortAttribute == "up")
    document.getElementById("sortBtn").setAttribute("sort", "down");
  else document.getElementById("sortBtn").setAttribute("sort", "up");
  rows.sort(function (a, b) {
    if (sortAttribute == "up") {
      return (
        convertDate(a.cells[4].innerHTML) - convertDate(b.cells[4].innerHTML)
      );
    }

    if (sortAttribute == "down") {
      return (
        convertDate(b.cells[4].innerHTML) - convertDate(a.cells[4].innerHTML)
      );
    }
  });
  rows.forEach(function (v) {
    tbody.appendChild(v);
  });
}

window.onload = () => {
  document.querySelector("#sortBtn").addEventListener("click", sortByDate);
};

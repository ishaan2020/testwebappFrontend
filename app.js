const baseURL = "https://testwebappbackend.herokuapp.com";

document.addEventListener("DOMContentLoaded", async function () {
  let data = await (await fetch(baseURL + "/getAll")).json();

  loadHtmlData(data.data);
});

function loadHtmlData(data) {
  const table = document.querySelector("table tbody");
  let tableHtml = "";

  //let images = JSON.parse(data.imageLinks);

  if (data.length == 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='8'>No data</td></tr>";
  } else {
    for (let i = 0; i < data.length; i++) {
      let images = null;
      try {
        images = JSON.parse(data[i].imageLinks);
      } catch {}

      tableHtml += "<tr>";
      tableHtml += `<td>${data[i].id}</td>`;
      tableHtml += `<td>${data[i].name}</td>`;
      tableHtml += `<td>${data[i].date_added}</td>`;
      tableHtml += `<td>${data[i].email}</td>`;
      tableHtml += `<td>${data[i].password}</td>`;

      //image links
      if (images) {
        tableHtml += `<td>`;
        for (let j = 0; j < images.length; j++) {
          tableHtml += baseURL + images[j] + "<br>";
        }
        tableHtml += `</td>`;
      }

      tableHtml += "</tr>";
    }

    table.innerHTML += tableHtml;
  }
}

const myForm = document.getElementById("userForm");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let form = e.target;
  let formData = new FormData(form);

  //print out all the contents
  //   for (let key of formData.keys()) {
  //     console.log(key, formData.get(key));
  //   }

  let req = new Request(baseURL + "/insert", {
    body: formData,
    method: "POST",
  });

  fetch(req)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch(console.warn);
});

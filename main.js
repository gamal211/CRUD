
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let dataTable = document.getElementById("dataTable");
let modeBtn = document.getElementById("modeBtn");

let dataPro = localStorage.products ? JSON.parse(localStorage.products) : [];
let mood = "create";
let tmp;
let searchMode = "title";

// Calculate total
function getTotal() {
  if (price.value !== "") {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = `Total: ${result}`;
    total.style.background = "#28a745";
  } else {
    total.innerHTML = "Total: 0";
    total.style.background = "#0078d7";
  }
}

// Create product
submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML.replace("Total: ", ""),
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (title.value && price.value && category.value) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearInputs();
  }

  localStorage.setItem("products", JSON.stringify(dataPro));
  showData();
};

// Clear inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "Total: 0";
  count.value = "";
  category.value = "";
}

// Show data
function showData() {
  let table = `
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Price</th>
      <th>Taxes</th>
      <th>Ads</th>
      <th>Discount</th>
      <th>Total</th>
      <th>Category</th>
      <th>Update</th>
      <th>Delete</th>
    </tr>
  `;
  dataPro.forEach((product, i) => {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.taxes}</td>
        <td>${product.ads}</td>
        <td>${product.discount}</td>
        <td>${product.total}</td>
        <td>${product.category}</td>
        <td><button onclick="updateData(${i})">Update</button></td>
        <td><button onclick="deleteData(${i})">Delete</button></td>
      </tr>
    `;
  });
  dataTable.innerHTML = table;

  let deleteAll = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    deleteAll.innerHTML = `<button onclick="deleteAllData()">Delete All (${dataPro.length})</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
showData();

// Delete one
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(dataPro));
  showData();
}

// Delete all
function deleteAllData() {
  dataPro = [];
  localStorage.removeItem("products");
  showData();
}

// Update
function updateData(i) {
  let product = dataPro[i];
  title.value = product.title;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  category.value = product.category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({ top: 0, behavior: "smooth" });
}

// Search
function setSearchMode(id) {
  searchMode = id;
  document.getElementById("search").placeholder = `Search by ${id}`;
}

document.getElementById("search").onkeyup = function () {
  let value = this.value.toLowerCase();
  let table = `
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Price</th>
      <th>Taxes</th>
      <th>Ads</th>
      <th>Discount</th>
      <th>Total</th>
      <th>Category</th>
      <th>Update</th>
      <th>Delete</th>
    </tr>
  `;
  dataPro.forEach((product, i) => {
    if (product[searchMode].includes(value)) {
      table += `
        <tr>
          <td>${i + 1}</td>
          <td>${product.title}</td>
          <td>${product.price}</td>
          <td>${product.taxes}</td>
          <td>${product.ads}</td>
          <td>${product.discount}</td>
          <td>${product.total}</td>
          <td>${product.category}</td>
          <td><button onclick="updateData(${i})">Update</button></td>
          <td><button onclick="deleteData(${i})">Delete</button></td>
        </tr>
      `;
    }
  });
  dataTable.innerHTML = table;
};

// Mode toggle
modeBtn.onclick = function () {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    modeBtn.innerHTML = " Light Mode";
  } else {
    modeBtn.innerHTML = " Dark Mode";
  }
};



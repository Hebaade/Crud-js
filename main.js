var pNameInput = document.getElementById("pName");
var pPriceInput = document.getElementById("pPrice");
var pCategoryInput = document.getElementById("pCategory");
var pDescInput = document.getElementById("pDesc");
var btnAdd = document.getElementById("btnAdd");
var tbody = document.getElementById("tbody");
var searchInput = document.getElementById("searchInp");


var proArray;
var currIndex = 0;

if (localStorage.getItem("products") !== null) {
    proArray = JSON.parse(localStorage.getItem("products"));
    display()
}
else {
    proArray = [];
}

function addPro() {
    var product = {
        name: pNameInput.value,
        price: pPriceInput.value,
        category: pCategoryInput.value,
        desc:pDescInput.value
    }
    proArray.push(product);
    console.log(proArray);
    localStorage.setItem("products", JSON.stringify(proArray));
    display()
}
btnAdd.addEventListener('click', function () {
    if (btnAdd.innerHTML == "Add Product") {
        addPro()
    }
    else {
        updatePro();
    }
    clear()
})

function display() {
    var products = ``
    for (var i = 0; i < proArray.length; i++) {
        products += ` <tr>
                  <td>${i + 1}</td>
                  <td>${proArray[i].name}</td>
                  <td>${proArray[i].price}</td>
                  <td>${proArray[i].category}</td>
                  <td>${proArray[i].desc}</td>
                  <td><button class="btn update" onclick="getData(${i});">Update</button></td>
                  <td><button class="btn delete" onclick="delpro(${i});">Delete</button></td>
                </tr>`;
    }
    tbody.innerHTML = products
}

function delpro(i){
    proArray.splice(i, 1);
     localStorage.setItem("products", JSON.stringify(proArray));
     display();
}

function getData(i) {
pNameInput.value=proArray[i].name;
pPriceInput.value=proArray[i].price;
pCategoryInput.value=proArray[i].category;
    pDescInput.value = proArray[i].desc;
    btnAdd.innerHTML = `Update Product`;
    currIndex = i;
}
function updatePro() {
  var pro = {
    name: pNameInput.value,
    price: pPriceInput.value,
    category: pCategoryInput.value,
    desc: pDescInput.value,
  };
  proArray[currIndex] = pro;
  localStorage.setItem("Products", JSON.stringify(proArray));
  btnAdd.innerHTML = `Add Product`;
  display();
}
function clear() {
    pNameInput.value = '';
    pPriceInput.value ='' ;
    pCategoryInput.value ='' ;
    pDescInput.value = '';
}
function searchPro(term) {
  var searchPros = ``;
  for (let i = 0; i < proArray.length; i++) {
    if (proArray[i].name.toLowerCase().includes(term.toLowerCase())) {
      searchPros += `
            <tr>
                <td>${i + 1}</td>
                <td>${proArray[i].name}</td>
                <td>${proArray[i].price}</td>
                <td>${proArray[i].category}</td>
                <td>${proArray[i].desc}</td>
                <td><button class="btn update" onclick="getData(${i})">Update</button></td>
                <td><button class="btn delete" onclick="delPro(${i})">Delete</button></td>
            </tr>
            `;
    }
  }
  tbody.innerHTML = searchPros;
}
searchInput.addEventListener("keyup", function () {
  searchPro(this.value);
});
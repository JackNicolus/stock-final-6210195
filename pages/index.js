const table = document.getElementById("suppliers").getElementsByTagName("tbody")[0];
const addForm = document.getElementById("add-form");
const updateForm = document.getElementById("update-form");
const updateId = document.getElementById("update-id");
const updateName = document.getElementById("update-name");
const updatePhone = document.getElementById("update-phone");
const updateAddress = document.getElementById("update-address");
const cancelUpdate = document.getElementById("cancel-update");

let suppliers = [
  { id: 1, name: "Acme Inc.", phone: "555-1234", address: "123 Main St" },
  { id: 2, name: "Widget Co.", phone: "555-5678", address: "456 Maple Ave" }
];

function renderTable() {
  table.innerHTML = "";
  suppliers.forEach(supplier => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${supplier.name}</td>
      <td>${supplier.phone}</td>
      <td>${supplier.address}</td>
      <td>
        <button type="button" class="edit" data-id="${supplier.id}">Edit</button>
        <button type="button" class="delete" data-id="${supplier.id}">Delete</button>
      </td>
    `;
  });
}

function addSupplier(name, phone, address) {
  const id = suppliers.length > 0 ? suppliers[suppliers.length - 1].id + 1 : 1;
  suppliers.push({ id, name, phone, address });
  renderTable();
}

function deleteSupplier(id) {
  suppliers = suppliers.filter(supplier => supplier.id !== id);
  renderTable();
}

function updateSupplier(id, name, phone, address) {
  const supplier = suppliers.find(supplier => supplier.id === id);
  if (supplier) {
    supplier.name = name;
    supplier.phone = phone;
    supplier.address = address;
    renderTable();
  }
}

function cancelUpdateForm() {
  updateForm.style.display = "none";
  addForm.style.display = "block";
}

renderTable();

addForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = event.target.elements.name.value;
  const phone = event.target.elements.phone.value;
  const address = event.target.elements.address.value;
  addSupplier(name, phone, address);
  event.target.reset();
});

table.addEventListener("click", event => {
  if (event.target.classList.contains("delete")) {
    const id = parseInt(event.target.getAttribute("data-id"));
    deleteSupplier(id);
  } else if (event.target.classList.contains("edit")) {
    const id = parseInt(event.target.getAttribute("data-id"));
    const supplier = suppliers.find(supplier => supplier.id === id);
    if (supplier) {
      updateId.value = supplier.id;
      updateName.value = supplier.name;
      updatePhone.value = supplier.phone;
      updateAddress.value = supplier.address;
      updateForm.style.display = "block";
      addForm.style.display = "none";
    }
  }
});

updateForm.addEventListener("submit", event => {
  event.preventDefault();
  const id = parseInt(event.target.elements.id.value);
  const name = event.target.elements.name.value;
  const phone = event.target.elements.phone.value;
  const address = event.target.elements.address.value;
  updateSupplier(id, name, phone, address);
  event.target.reset();
  cancelUpdateForm();
});

cancelUpdate.addEventListener("click", event => {
  event.preventDefault();
  cancelUpdateForm();
});

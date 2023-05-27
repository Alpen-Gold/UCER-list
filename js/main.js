const myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
  keyboard: false,
});

let url = "https://jsonplaceholder.typicode.com/users";

let title = document.getElementById("exampleModalLabel");
let modal = document.getElementById("exampleModal");

let loading = document.querySelector("#loading");
let error = document.querySelector("#error");
error.style.display = "none";
let table = document.getElementsByTagName("table")[0];
let tbody = document.getElementsByTagName("tbody")[0];
table.style.display = "none";
let getUcers = async () => {
  try {
    let respons = await axios.get(url);

    return { saccess: true, data: respons.data };
  } catch (error) {
    console.log("Xatolik :" + error);
    return { saccess: false, data: [] };
  }
};

let setUcers = async () => {
  let respons = await getUcers();
  loading.style.display = "none";
  if (respons.saccess) {
    table.style.display = "";

    respons.data.map((item, index) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
              <td>${item.email}</td>
              <td>

              ${item.address.city} ${item.address.street}
              Citi Address <a href="https://www.google.com/maps/place/${
                item.address.geo.lat
              },${
        item.address.geo.lng
      }"><i class="fas fa-location-arrow"></i></a>
            </td>
            <td>${item.phone}</td>
            <td><a href="https://${item.website}/maps/place/-37.3159">${
        item.website
      }</a></td>
            <td>${item.company.name}</td>
            <td class="d-flex gap-2">
              <button class="btn btn-primary" onclick="openModal('put',${
                item.id
              })">
                <i class="fas fa-edit"></i>
              </button>

              <button class="btn btn-danger" onclick="deleteData(${item.id})">
                <i class="fas fa-trash"></i>
              </button>
            </td>
            `;

      tbody.appendChild(tr);
    });
  } else {
    error.style.display = "";
  }
};

setUcers();

// addd - function

let sevaDate = async () => {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let city = document.getElementById("city").value;
  let street = document.getElementById("street").value;
  let phone = document.getElementById("phone").value;
  let webSite = document.getElementById("Web-site").value;
  let company = document.getElementById("company").value;

  const inputNewValue = {
    name: name,
    email: email,
    address: {
      street: street,
      city: city,
    },
    phone: phone,
    website: webSite,
    company: {
      name: company,
    },
  };

  let res;
  if (modal.getAttribute("type") === "post")
    res = await postData(inputNewValue);
  else if (modal.getAttribute("type") === "put")
    res = await putData(inputNewValue, modal.getAttribute("ucer-id"));
  if (res.success) {
    sevaDateClear();
    setUcers();
    alert("Qo'shildi");
    myModal.hide();
  } else alert("Muammo Bo'ldi");
};

let sevaDateClear = () => {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("city").value = "";
  document.getElementById("street").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("Web-site").value = "";
  document.getElementById("company").value = "";
};

let postData = async (obj) => {
  try {
    const res = await axios.post(url, obj);
    console.log(res);
    return { success: true, res: res };
  } catch (error) {
    console.log("Xattolik Yuz Berdi: " + error);
    return { success: false, res: error };
  }
};

let putData = async (obj, id) => {
  try {
    const res = await axios.put(url + "/" + id, obj);
    console.log(res);
    return { success: true, res: res };
  } catch (error) {
    console.log("Xattolik Yuz Berdi: " + error);
    return { success: false, res: error };
  }
};
let getUcerData = async (id) => {
  let respons = await getUcerId(id);
  console.log(respons);
  if (respons.saccess) {
    let data = respons.data;
    document.getElementById("name").value = data.name;
    document.getElementById("email").value = data.email;
    document.getElementById("city").value = data.address.city;
    document.getElementById("street").value = data.address.street;
    document.getElementById("phone").value = data.phone;
    document.getElementById("Web-site").value = data.website;
    document.getElementById("company").value = data.company.name;
  }
};

let getUcerId = async (id) => {
  try {
    const res = await axios.get(url + "/" + id);
    return { saccess: true, data: res.data };
  } catch (error) {
    return { saccess: false, res: [] };
  }
};

let openModal = (type, id) => {
  modal.setAttribute("type", type);
  modal.setAttribute("ucer-id", id);
  if (type === "post") {
    title.innerHTML = "Post Ucer";
    sevaDateClear();
  } else if (type === "put") {
    title.innerHTML = "Put Ucer";
    getUcerData(id);
  }
  myModal.show();
};

let deleteData = async (id) => {
  try {
    const res = await axios.delete(url + "/" + id);
    console.log(res);
    return { success: true, res: res };
  } catch (error) {
    console.log("Xattolik Yuz Berdi: " + error);
    return { success: false, res: error };
  }
};

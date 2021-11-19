let orgData = [
  [1, "Lada"],
  [2, "Audi"],
  [3, "Toyoya"],
];
let posData = [
  [10, "Директор"],
  [20, "Инженер"],
  [30, "Менеджер"],
];

let empData = [
  [1, "Сидоров Иван Петрович", 1, 10],
  [2, "Клюквина Анастасия Викторовна", 1, 30],
  [3, "Yoshimoro Katsumi", 3, 10],
  [4, "Albrecht Wallenstein", 2, 20],
  [5, "Архипов Федот Ярополкович", 1, 20],
  [6, "Синицына Ксения Игоревна", 1, 30],
  [7, "Gustaf Grefberg", 2, 10],
  [8, "Simidzu Koyama", 3, 20],
  [9, "Miura Hirana", 3, 20],
  [10, "Кузьмин Егор Владимирович", 1, 30],
  [11, "Мазурик Алёна Васильевна", 1, 20],
  [12, "Gudrun Ensslin", 2, 30],
  [13, "Ernst Rommel", 2, 20],
];

let orgCombo = document.getElementById("org-combo");
let empCombo = document.getElementById("emp-combo");
let addButton = document.getElementById("add-button");
let clearButton = document.getElementById("clear-button");
let contentBlock = document.getElementById("content-block");

document.addEventListener("DOMContentLoaded", function (event) {
  fillOrgCombo(orgData);

  createCheckboxes(posData);

  for (let checkbox of document.getElementsByClassName("checkbox")) {
    checkbox.onchange = function () {
      fillEmpCombo(orgCombo.value, empData);
    };
  }

  orgCombo.onchange = function () {
    fillEmpCombo(this.value, empData);
  };

  addButton.onclick = function () {
    if (orgCombo.value != "") {
      let employer = empData.find(
        (emp) => emp[0] == empCombo.options[empCombo.selectedIndex].value
      );
      let position = posData.find((pos) => pos[0] == employer[3])[1];
      contentBlock.innerHTML += `<p>
          ${empCombo.options[empCombo.selectedIndex].innerText} - ${position} 
          (${orgCombo.options[orgCombo.selectedIndex].innerText})
              </p>`;
    }
  };

  clearButton.onclick = function () {
    contentBlock.innerHTML = "";
  };
});

function createCheckboxes(posData) {
  checkGroup = document.getElementById("checkbox-group");
  posData.forEach((posData) => {
    let label = document.createElement("label");
    let checkbox = document.createElement("input");
    checkbox.id = `check${posData[0]}`;
    checkbox.type = "checkbox";
    checkbox.value = posData[0];
    checkbox.classList.add("checkbox");

    label.appendChild(checkbox);
    label.innerHTML += posData[1];
    checkGroup.appendChild(label);
  });
}

function fillOrgCombo(organizations) {
  organizations.forEach((organization) => {
    let option = document.createElement("option");
    option.value = organization[0];
    option.text = organization[1];
    orgCombo.add(option);
  });
}

function fillEmpCombo(id, employees) {
  empCombo.innerHTML = "";

  if (id == "") {
    empCombo.disabled = true;
  } else {
    let checkedIds = [];
    let checkeds = [...document.getElementsByClassName("checkbox")]
      .filter((el) => el.checked === true)
      .forEach((el) => checkedIds.push(Number.parseInt(el.value)));

    if (checkedIds) {
      empCombo.disabled = false;
      employees
        .filter(
          (employer) => employer[2] == id && checkedIds.includes(employer[3])
        )
        .forEach((employer) => {
          let option = document.createElement("option");
          option.value = employer[0];
          option.text = employer[1];
          empCombo.add(option);
        });
    }
  }
}

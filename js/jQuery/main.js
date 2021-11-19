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

$(document).ready(function () {
  fillOrgCombo(orgData);

  createCheckboxes(posData);

  $(".checkbox").change(function () {
    fillEmpCombo($("#org-combo").val(), empData);
  });

  $("#org-combo").change(function () {
    fillEmpCombo($(this).val(), empData);
  });

  $("#add-button").click(function () {
    if ($('#org-combo').val()) {
      let employer = empData.find(
        (emp) => emp[0] == $("#emp-combo option").filter(":selected").val()
      );
      let position = posData.find((pos) => pos[0] == employer[3])[1];

      $("#content-block").append(
        `<p>${employer[1]} - ${position} ${$("#org-combo option")
          .filter(":selected")
          .text()}`
      );
    }
  });

  $("#clear-button").click(function () {
    $("#content-block").empty();
  });
});

function createCheckboxes(posData) {
  posData.forEach((posData) => {
    $("#checkbox-group").append(
      `<input type="checkbox" id="checkbox${posData[0]}" class="checkbox" value=${posData[0]}>
       <label for="checkbox${posData[0]}">${posData[1]}</label>`
    );
  });
}

function fillOrgCombo(organizations) {
  organizations.forEach((organization) => {
    $("#org-combo").append(
      `<option value="${organization[0]}"}>${organization[1]}</option>`
    );
  });
}

function fillEmpCombo(id, employees) {
  $("#emp-combo").empty();

  if (id == "") {
    $("#emp-combo").prop("disabled", true);
  } else {
    let checkedIds = [];
    let checkeds = [...$(".checkbox")]
      .filter((el) => el.checked === true)
      .forEach((el) => checkedIds.push(Number.parseInt(el.value)));

    if (checkedIds.length > 0) {
      $("#emp-combo").prop("disabled", false);
      employees
        .filter(
          (employer) => employer[2] == id && checkedIds.includes(employer[3])
        )
        .forEach((employer) => {
          $("#emp-combo").append(
            `<option value="${employer[0]}">${employer[1]}</option>`
          );
        });
    }
  }
}

"use strict";

const addNewTaskNameEl = document.querySelector(".Card__modal-input");
const openFormBtn = document.querySelector(".Card__footer-btn");

let tasksList = [];
let taskElement = {};
let todayDate = {};
initApp();
console.log(tasksList);

function initApp() {
  initCurrentDate();
  initTaskList();
}

function initCurrentDate() {
  getDate();
  printDate();
}

function initTaskList() {
  getListFromLocalStorage();
  printList();
}

function updateList() {
  saveTaskListAtLocalStorage();
  addNewTask();
  printNewTask();
}
updateList();

function getListFromLocalStorage() {
  const tasksListfromLS = localStorage.getItem("tasksList");
  if (tasksListfromLS) {
    tasksList = JSON.parse(tasksListfromLS);
  }
}

function saveTaskListAtLocalStorage() {
  localStorage.setItem("tasksList", JSON.stringify(tasksList));
}

function getDate() {
  // https://momentjs.com/
  const weekDaysArr = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const monthsArr = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "novuembre",
    "deciembre",
  ];
  let today = new Date();
  let todayDay = today.getDate();
  let todayWeekDay = weekDaysArr[today.getDay()];
  let todayMonth = monthsArr[today.getMonth()];
  let todayYear = today.getFullYear();

  todayDate = {
    day: todayDay,
    weekDay: todayWeekDay,
    month: todayMonth,
    year: todayYear,
  };
}

function printDate() {
  const todayDayEl = document.querySelector(".date-day");
  todayDayEl.innerHTML = todayDate.day;

  const todayWeekDayEl = document.querySelector(".date-weekDay");
  todayWeekDayEl.innerHTML = todayDate.weekDay;

  const todayMonthYearEl = document.querySelector(".date-month-year");
  todayMonthYearEl.innerHTML = todayDate.month + ", " + todayDate.year;
}

function openForm() {
  const modalWrapperEl = document.querySelector(".Card__modal-wrapper");
  modalWrapperEl.classList.remove("hidden");
  openFormBtn.classList.add("hidden");
  addNewTaskNameEl.value = "";
}

function addNewTask() {
  const addNewTaskBtnEl = document.querySelector(".Card__modal-btn");
  addNewTaskBtnEl.addEventListener("click", handleAddNewTask);
}

function handleAddNewTask() {
  taskElement = { name: addNewTaskNameEl.value, checked: false };
  tasksList.push(taskElement);
  console.log(tasksList);
  updateList();
}

function printList() {
  for (let i = 0; i < tasksList.length; i++) {
    printNewTask(tasksList[i].checked, tasksList[i].name, i);
  }
}

function printNewTask(checked, name, index) {
  if (name !== undefined && name !== "") {
    const taskListEl = document.querySelector(".Card__main-list");
    const newTask = document.createElement("li");
    newTask.id = index;
    newTask.classList.add("Card__main-element");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.name = "task";
    taskCheckbox.id = index;
    taskCheckbox.checked = checked;
    taskCheckbox.classList.add("Card__main-element-checkbox");
    taskCheckbox.addEventListener("click", handleCheckbox);

    const taskName = document.createElement("p");
    taskName.classList.add("Card__main-element-name");
    const newTaskName = document.createTextNode(name);
    taskName.appendChild(newTaskName);

    if (checked === true) {
      newTask.classList.add("task-selected");
    } else {
      newTask.classList.remove("task-selected");
    }

    newTask.append(taskCheckbox, taskName);
    taskListEl.appendChild(newTask);
  }
}

function handleCheckbox(event) {
  const checked = event.target.checked;
  const id = event.target.id;

  tasksList[id].checked = checked;

  const parentLabel = this.parentElement;
  if (this.checked) {
    parentLabel.classList.add("task-selected");
  } else {
    parentLabel.classList.remove("task-selected");
  }

  updateList();
}

openFormBtn.addEventListener("click", openForm);

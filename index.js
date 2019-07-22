"use strict";

let tasksList = [
  { name: "Tarea 1", checked: false },
  { name: "Tarea 2", checked: false },
  { name: "Tarea 3", checked: false },
];
let taskElement = {};
let todayDate = {};
initApp();

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
  const todayDayEl = document.querySelector('.date-day')
  todayDayEl.innerHTML = todayDate.day;

  const todayWeekDayEl = document.querySelector('.date-weekDay');
  todayWeekDayEl.innerHTML = todayDate.weekDay;

  const todayMonthYearEl = document.querySelector(".date-month-year");
  todayMonthYearEl.innerHTML = todayDate.month +', '+ todayDate.year;
}

function addNewTask() {
  const addNewTaskBtnEl = document.querySelector(".Card__modal-btn");
  addNewTaskBtnEl.addEventListener("click", handleAddNewTask);
}

function handleAddNewTask() {
  const addNewTaskNameEl = document.querySelector(".Card__modal-input");
  taskElement = { name: addNewTaskNameEl.value, checked: false };
  tasksList.push(taskElement);
  console.log(tasksList);
  updateList();
}

function printNewTask() {
  if (taskElement.name !== undefined) {
    const taskListEl = document.querySelector(".Card__main-list");
    const newTask = document.createElement("li");
    newTask.id = tasksList.length;
    newTask.classList.add(".Card__main-element");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.name = "task";
    taskCheckbox.id = tasksList.length;
    taskCheckbox.checked = taskElement.checked;
    taskCheckbox.classList.add(".Card__main-element-checkbox");
    taskCheckbox.addEventListener("click", handleCheckbox);

    const taskName = document.createElement("p");
    taskName.classList.add(".Card__main-element-name");
    const newTaskName = document.createTextNode(taskElement.name);
    taskName.appendChild(newTaskName);

    newTask.append(taskCheckbox, taskName);
    taskListEl.appendChild(newTask);
    saveTaskListAtLocalStorage();
  }
}

function printList() {
  const taskListEl = document.querySelector(".Card__main-list");
  for (let i = 0; i < tasksList.length; i++) {
    const newTask = document.createElement("li");
    newTask.id = i;
    newTask.classList.add(".Card__main-element");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.name = "task";
    taskCheckbox.id = i;
    taskCheckbox.checked = tasksList[i].checked;
    taskCheckbox.classList.add(".Card__main-element-checkbox");
    taskCheckbox.addEventListener("click", handleCheckbox);

    const taskName = document.createElement("p");
    taskName.classList.add(".Card__main-element-name");
    const newTaskName = document.createTextNode(tasksList[i].name);
    taskName.appendChild(newTaskName);

    newTask.append(taskCheckbox, taskName);
    taskListEl.appendChild(newTask);
  }
}

function handleCheckbox(event) {
  const checked = event.target.checked;
  const id = event.target.id;

  tasksList[id].checked = checked;
  saveTaskListAtLocalStorage();
}

"use strict";

let tasksList = ["Tarea 1", "Tarea 2", "Tarea 3"];
let todayDate = {};

function getDate() {
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

  printDate();
}

getDate();

function printDate() {
  const dateWrapper = document.querySelector(".Card__header-date-wrapper");

  const todayDayEl = document.createElement("p");
  todayDayEl.classList.add(".date-day");
  todayDayEl.innerHTML = todayDate.day;

  const todayWeekDayEl = document.createElement("p");
  todayWeekDayEl.classList.add(".date-weekDay");
  todayWeekDayEl.innerHTML = todayDate.weekDay;

  const todayMonthEl = document.createElement("p");
  todayMonthEl.classList.add(".date-month");
  todayMonthEl.innerHTML = todayDate.month;

  const todayYearEl = document.createElement("p");
  todayYearEl.classList.add(".date-year");
  todayYearEl.innerHTML = todayDate.year;

  dateWrapper.append(
    todayDayEl,
    todayWeekDayEl,
    todayMonthEl,
    todayYearEl
  );
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
    taskCheckbox.checked = false;
    taskCheckbox.classList.add(".Card__main-element-checkbox");

    const taskName = document.createElement("p");
    taskName.classList.add(".Card__main-element-name");
    const newTaskName = document.createTextNode(tasksList[i]);
    taskName.appendChild(newTaskName);

    newTask.appendChild(taskCheckbox);
    newTask.appendChild(taskName);
    taskListEl.appendChild(newTask);
  }
}
printList();

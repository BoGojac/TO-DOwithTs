let displayAddNewTask = document.getElementById("displayAddNewTask");
let inputSection = document.getElementById("inputSection");
let taskInput = document.getElementById("taskInput");
let alarmInput = document.getElementById("alarmInput");
let closeInputSectionBtn = document.getElementById("closeInputSectionBtn");
let displaysetAlarm = document.getElementById("displaysetAlarm");
let setAlarmTime = document.getElementById("setAlarmTime");
let alarmTimeDisplay = document.getElementById("alarmTimeDisplay");
let closealarmSectionBtn = document.getElementById("closealarmSectionBtn");
let alarmPlaceHolder = document.getElementById("alarmPlaceHolder");
let alarmPlaceHolderSection = document.getElementById("alarmPlaceHolderSection");
let addTaskBtn = document.getElementById("addTaskBtn");
let removeSettedAlarmBtn = document.getElementById("removeSettedAlarmBtn");
let toDoLists = JSON.parse(localStorage.getItem('myTasks') || '[]');
const syncLocalStorage = () => {
    localStorage.setItem('myTasks', JSON.stringify(toDoLists));
};
const DisplayAddNewTaskSection = () => {
    inputSection.style.display = "block";
};
const closeInputSectionFun = () => {
    taskInput.value = "";
    alarmInput.value = "";
    alarmPlaceHolder.textContent = "";
    alarmTimeDisplay.style.display = "none";
    inputSection.style.display = "none";
};
const DispalyAlarmSectionFun = () => {
    alarmTimeDisplay.style.display = "block";
};
const closeAlarmSection = () => {
    alarmTimeDisplay.style.display = "none";
    alarmPlaceHolder.textContent = "";
    alarmInput.value = "";
};
const removeSettedAlarmFun = () => {
    alarmPlaceHolder.textContent = "";
    alarmInput.value = "";
    alarmPlaceHolderSection.style.display = 'none';
};
const SetAlarm = () => {
    const alarmTime = alarmInput.value;
    if (!alarmTime) {
        alert("Please select a date and time");
        return;
    }
    alarmPlaceHolder.textContent = alarmInput.value.replace('T', ' ');
    alarmPlaceHolderSection.style.display = 'flex';
    alarmPlaceHolderSection.style.width = '250px';
    alarmPlaceHolderSection.style.justifyContent = 'center';
    alarmTimeDisplay.style.display = "none";
    inputSection.style.display = 'flex';
    displaysetAlarm.style.display = "inline-block";
    displaysetAlarm.style.marginTop = "10px";
    addTaskBtn.style.display = "inline-block";
    addTaskBtn.style.marginTop = "10px";
    taskInput.style.display = 'block';
};
const SaveTaskFun = () => {
    const taskDescription = taskInput.value.trim();
    const alarmTime = alarmInput.value ? alarmInput.value.replace('T', ' ') : null;
    if (!taskDescription) {
        alert("Please enter a task name!");
        return;
    }
    let countId = toDoLists.length > 0 ? (toDoLists[toDoLists.length - 1]?.id ?? 0) + 1 : 1;
    const newTask = {
        id: countId,
        description: taskDescription,
        alarmTime: alarmInput.value ? alarmInput.value.replace('T', ' ') : null,
        completed: false
    };
    console.log("Task saved:", taskDescription, alarmTime);
    toDoLists.push(newTask);
    syncLocalStorage();
    closeAddTaskModal();
};
const closeAddTaskModal = () => {
    taskInput.value = '';
    alarmInput.value = '';
    alarmPlaceHolder.textContent = '';
    alarmPlaceHolderSection.style.display = 'none';
    taskInput.style.display = 'block';
    addTaskBtn.style.display = 'block';
    alarmTimeDisplay.style.display = 'none';
};
displayAddNewTask.addEventListener("click", DisplayAddNewTaskSection);
closeInputSectionBtn.addEventListener("click", closeInputSectionFun);
displaysetAlarm.addEventListener("click", DispalyAlarmSectionFun);
setAlarmTime.addEventListener("click", SetAlarm);
closealarmSectionBtn.addEventListener("click", closeAlarmSection);
removeSettedAlarmBtn.addEventListener("click", removeSettedAlarmFun);
addTaskBtn.addEventListener("click", SaveTaskFun);
export {};
//# sourceMappingURL=index.js.map
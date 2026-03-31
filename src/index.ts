let displayAddNewTask = document.getElementById("displayAddNewTask") as HTMLButtonElement;
let inputSection = document.getElementById("inputSection") as HTMLDivElement;
let taskInput = document.getElementById("taskInput") as HTMLInputElement;
let alarmInput = document.getElementById("alarmInput") as HTMLInputElement;
let closeInputSectionBtn = document.getElementById("closeInputSectionBtn") as HTMLButtonElement;
let displaysetAlarm = document.getElementById("displaysetAlarm") as HTMLButtonElement;
let setAlarmTime = document.getElementById("setAlarmTime") as HTMLInputElement;
let alarmTimeDisplay = document.getElementById("alarmTimeDisplay") as HTMLParagraphElement;
let closealarmSectionBtn = document.getElementById("closealarmSectionBtn") as HTMLButtonElement;
let alarmPlaceHolder = document.getElementById("alarmPlaceHolder") as HTMLParagraphElement;
let alarmPlaceHolderSection = document.getElementById("alarmPlaceHolderSection") as HTMLDivElement;
let addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;
let removeSettedAlarmBtn = document.getElementById("removeSettedAlarmBtn") as HTMLButtonElement;

type Task = {
    id: number;
    description: string;
    alarmTime: string | null;
    completed: boolean;
};
let toDoLists: Task[] = JSON.parse(localStorage.getItem('myTasks') || '[]');

const syncLocalStorage = () =>
{
    localStorage.setItem('myTasks', JSON.stringify(toDoLists));
};



const DisplayAddNewTaskSection = () =>
{
    inputSection.style.display = "block";
};

const closeInputSectionFun = () =>
{
    taskInput.value = "";
    alarmInput.value = "";
    alarmPlaceHolder.textContent = "";
    alarmTimeDisplay.style.display = "none";
    inputSection.style.display = "none";
};


const DispalyAlarmSectionFun = () =>
{
    alarmTimeDisplay.style.display = "block";
};

const closeAlarmSection = () =>
{
    alarmTimeDisplay.style.display = "none";
    alarmPlaceHolder.textContent = "";
    alarmInput.value = "";
}

const removeSettedAlarmFun = () =>
{
    alarmPlaceHolder.textContent = "";
    alarmInput.value = "";
    alarmPlaceHolderSection.style.display = 'none';
}


const SetAlarm = () =>
{
    const alarmTime: string = alarmInput.value;
    if (!alarmTime)
    {
        alert("Please select a date and time");
        return;
    }

    alarmPlaceHolder.textContent = alarmInput.value.replace('T', ' ');

    // Switch to Flex for a more stable layout
    alarmPlaceHolderSection.style.display = 'flex';
    alarmPlaceHolderSection.style.width = '250px'; // Set a fixed width to prevent layout shifts
    alarmPlaceHolderSection.style.justifyContent = 'center'; // Center the content

    // Hide the setup UI
    alarmTimeDisplay.style.display = "none";

    // Keep the main container as flex
    inputSection.style.display = 'flex';

    displaysetAlarm.style.display = "inline-block";
    displaysetAlarm.style.marginTop = "10px";

    addTaskBtn.style.display = "inline-block";
    addTaskBtn.style.marginTop = "10px";
    // Ensure the main inputs are visible
    taskInput.style.display = 'block';

};

const SaveTaskFun = () =>
{
    const taskDescription = taskInput.value.trim();
    const alarmTime = alarmInput.value ? alarmInput.value.replace('T', ' ') : null;

    if (!taskDescription)
    {
        alert("Please enter a task name!");
        return;
    }

    let countId: number = toDoLists.length > 0 ? (toDoLists[toDoLists.length - 1]?.id ?? 0) + 1 : 1;


    const newTask: Task = {
        id: countId,
        description: taskDescription,
        alarmTime: alarmInput.value ? alarmInput.value.replace('T', ' ') : null,
        completed: false
    };

    // Here you would typically add the task to your list and save it
    console.log("Task saved:", taskDescription, alarmTime);

    toDoLists.push(newTask);
    syncLocalStorage(); // Save to permanent storage
    // renderTasks();
    closeAddTaskModal();

};




const closeAddTaskModal = () =>
{
    // inputSection.style.display = 'none';
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
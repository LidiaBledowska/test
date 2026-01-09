const todayDateJS = document.getElementById("todayDate")
const textUserJS = document.getElementById("textUser")
const entryBtnJS = document.getElementById("entryBtn")
const weekDaysJS = document.getElementById("weekDays")
const daysGridJS = document.getElementById("daysGrid"
)
const confirmDialogJS = document.getElementById("confirmDialog")
const cancelBtnJS = document.getElementById("cancelBtn")
const overwriteBtnJS = document.getElementById("overwriteBtn")

function getTodayKey() {
    return new Date().toISOString().slice(0, 10)
}


function hasTodayEntry() {
    const entry = localStorage.getItem(getTodayKey())
    if (entry !== null) {
        return true
    }

    else return false

}

function saveData() {
    const value = textUserJS.value.trim();
    if (value === "") return;

    if (hasTodayEntry() === false) {
        localStorage.setItem(getTodayKey(), textUserJS.value.trim())
        textUserJS.value = ""
    } else {
        confirmDialogJS.showModal()
        return
    }
}

function onCancel () {
    confirmDialogJS.close()
}

function onOverwrite () {
    localStorage.setItem(getTodayKey(), textUserJS.value.trim())
    textUserJS.value= ""
    return onCancel()
}


function showWeekDays() {
    const weekDaysNames = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"]
    weekDaysJS.innerHTML = "";

    for (const day of weekDaysNames) {
        const el = document.createElement("div");
        el.textContent = day
        weekDaysJS.appendChild(el)
    }

}

/*function showCalendar (year, month) {
    daysGrid.innerHTL = "";

}
*/


function getTodayDate() {
    const now = new Date()
    const day = now.toLocaleString("en-EN", { day: "numeric" })
    const month = now.toLocaleString("pl-PL", { month: "long" })
    const weekday = now.toLocaleString("en-EN", { weekday: "long" })
    todayDateJS.textContent = `Dzisiaj jest ${weekday}, ${day} ${month}`
}


entryBtnJS.addEventListener('click', saveData)
cancelBtnJS.addEventListener('click', onCancel)
overwriteBtnJS.addEventListener('click', onOverwrite)
getTodayDate()
showWeekDays()

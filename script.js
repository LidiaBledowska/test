const todayDateJS = document.getElementById("todayDate")
const textUserJS = document.getElementById("textUser")
const entryBtnJS = document.getElementById("entryBtn")
const weekDaysJS = document.querySelector(".days")
const daysGridJS = document.getElementById("dates")
const confirmDialogJS = document.getElementById("confirmDialog")
const cancelBtnJS = document.getElementById("cancelBtn")
const overwriteBtnJS = document.getElementById("overwriteBtn")
const notesJS = document.getElementById("notes")

const monthYearLabelJS = document.getElementById("monthYearLabel")
const prevBtnJS = document.getElementById("prevMonth")
const nextBtnJS = document.getElementById("nextMonth")




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

function onCancel() {
    confirmDialogJS.close()
    textUserJS.value = ""
}

function onOverwrite() {
    localStorage.setItem(getTodayKey(), textUserJS.value.trim())
    textUserJS.value = ""
    return onCancel()
}


/*function showWeekDays() {
    const weekDaysNames = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"]
    weekDaysJS.innerHTML = "";

    for (const day of weekDaysNames) {
        const el = document.createElement("div");
        el.classList.add("day")
        el.textContent = day
        weekDaysJS.appendChild(el)
    }

} */

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


/*function showNotes() {
    notesJS.textContent = ""
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const value = localStorage.getItem(key)
        const child = document.createElement("div")
        child.textContent = `${key} - ${value}`
        notesJS.appendChild(child)
    }
}*/


/* dostęp do localstorage 
pokazać 7 osttanich wpisów
jeśli dla jakiejś daty nie było to po prostu "Brak wpisu"*/



let currentDate = new Date()

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
    const totalDays = lastDayOfMonth.getDate()
    const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7
    const lastDayIndex = (lastDayOfMonth.getDay() + 6) % 7

    const monthYearString = currentDate.toLocaleString("pl-PL", {
        month: "long",
        year: "numeric",
    })
    monthYearLabelJS.textContent = monthYearString


      datesJS.innerHTML = ""
    for (let i = firstDayIndex; i > 0; i--) {
        const prevDate = new Date(currentYear, currentMonth, 0 - i + 1)
        const el = document.createElement("div");
        el.className = "date inactive"
        el.textContent = prevDate.getDate()
        datesJS.appendChild(el)
    }

    for (let i=lastDayIndex;i<7;i++) {
        const nextDate = new Date(currentYear,currentMonth + 1, i)
        const el = document.createElement("div")
        el.className = "date inactive"
        el.textContent = nextDate.getDate()
        datesJS.appendChild(el)
    }









    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i)
        const isToday = date.toDateString() === new Date().toDateString()
        const activeClass = isToday ? "active" : ""
        datesHtml += `<div class="date ${activeClass}">${i}</div>`
    }

    for (let i = 1; i <= 6 - lastDayIndex; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i)
        datesHtml += `<div class="date inactive">${nextDate.getDate()}</div>`
    }

    daysGridJS.innerHTML = datesHtml
}


prevBtnJS.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1)
    updateCalendar()
})

nextBtnJS.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1)
    updateCalendar()
})

function

    entryBtnJS.addEventListener('click', saveData)
cancelBtnJS.addEventListener('click', onCancel)
overwriteBtnJS.addEventListener('click', onOverwrite)
getTodayDate()
/*showWeekDays()*/
/*showNotes()*/
updateCalendar()

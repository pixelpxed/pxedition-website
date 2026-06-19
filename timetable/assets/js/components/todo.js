todolist_datahandleversion = "0.1.7"

function openToDo() {
    if (document.querySelector(".contentbox-assignments")) {
        handleShowToDo()
    } if (!document.querySelector(".contentbox-assignments")) {
        fetch("/timetable/assets/components/html/todolist.html")
            .then((res) => res.text())
            .then((data) => {
                document.querySelector(".popup-center").insertAdjacentHTML("beforeend", data)
                fetchToDo(data)
            })
            .catch((error) => {
                cannotGetPopupContentError("to-do", error)
            })
        return
    }
}

var cache_todolist;
var fetchpath = "https://pawin.me/to-do/tasks.json";
function fetchToDo() {
    // if (localStorage.getItem("timetable-devMode") == "true") {
    //     fetchpath = "https://dev.pawin.me/to-do/tasks.json"
    // }

    fetch(fetchpath)
    // fetch("/timetable/templates/homework.json")
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
        .then((data) => {
            cache_todolist = data
            getToDo()
        })
        .catch((error) => {
            console.warn("Failed to fetch pawin.me API, opening to-do failed.");
            return popupOK(
                `Can't connect to 'pawin.me' API.`, 
                `Timetable couldn't get a response required to display to-do information.<br><br>

                If you're connected to the internet, this problem is <abbr style="color: var(--color-gray-1); text-decoration: underline;" title="likely Pawin's server loose Ethernet cable.">likely on our end</abbr> or services from our data-partner has ended. Please try again later.<br><br>
                
                <span class="popup-description">Error:</span><br>
                ${error}`,
                "resetToDo"
            )
        })
}

function handleShowToDo() {
    document.querySelector(".contentbox-assignments").style.display = "block"
    
    disableScrollbar()
    popupid = popupid + 1
    document.querySelector(".full-page-overlay").style.display = "block"
}

function closeToDo() {
    document.querySelector(".contentbox-assignments").style.display = "none"

    enableScrollbar()
    popupid = popupid - 1
    if (popupid === 0) {
        document.querySelector(".full-page-overlay").style.display = "none"
    }
}

function resetToDo() {
    document.querySelector(".contentbox-assignments").remove()

    enableScrollbar()
    document.querySelector(".full-page-overlay").style.display = "none"
}

function getToDo() {
    if (cache_todolist.about.dataversion != todolist_datahandleversion) {
        document.querySelector(".assignments-wrapper").insertAdjacentHTML(
            "afterbegin",
            `
                <div class="todocontentbox-ribbon">
                    <span class="material-symbols-outlined">info</span>
                    <span>This data version recieved from Pawin's server seemed to be newer than what we're supporting, results displayed might be inaccurate.</span>
                </div>
            `
        )
    }

    var homework = cache_todolist.content.homework
    var reminder = cache_todolist.content.reminder
    var exam = cache_todolist.content.exam

    for (let i = 0; i < homework.length; i++) {
        if (homework[i].status == "Active") {
            insertToDo(
                ".table-todo-homework",
                homework[i].subject,
                homework[i].item,
                homework[i].classroom,
                homework[i].duedate
            )
        }
        if (homework[i].status == "DuedatePassed") {
            insertToDo(
                ".table-pasttodo-homework",
                homework[i].subject,
                homework[i].item,
                homework[i].classroom,
                homework[i].duedate
            )
        }
    }
    for (let i = 0; i < reminder.length; i++) {
        if (reminder[i].status == "Active") {
            insertToDo(
                ".table-todo-reminder",
                reminder[i].subject,
                reminder[i].item,
                reminder[i].classroom,
                reminder[i].duedate
            )
        }
        if (reminder[i].status == "DuedatePassed") {
            insertToDo(
                ".table-pasttodo-reminder",
                reminder[i].subject,
                reminder[i].item,
                reminder[i].classroom,
                reminder[i].duedate
            )
        }
    }
    for (let i = 0; i < exam.length; i++) {
        if (exam[i].status == "Active") {
            insertToDo(
                ".table-todo-exam",
                exam[i].subject,
                exam[i].item,
                exam[i].classroom,
                exam[i].duedate
            )
        }
        if (exam[i].status == "DuedatePassed") {
            insertToDo(
                ".table-pasttodo-exam",
                exam[i].subject,
                exam[i].item,
                exam[i].classroom,
                exam[i].duedate
            )
        }
    }
    document.querySelector(".todo-lastupdate").innerHTML = cache_todolist.about.lastupdate
    document.querySelector(".todo-dataver").innerHTML = cache_todolist.about.dataversion 

    handleShowToDo()
}

function insertToDo(location, title, desc, url, due) {
    title = `${title}`
    if (url !== null) {
        title = `
            <a href="${url}" target="_blank" class="todo-item-title">
                ${title}
                <span class="material-symbols-outlined">
                    attachment
                </span>
            </a>`
    }

    var assignmentsdatedata = "<b style='color: var(--color-gray-1);'>None</b>"
    if (due !== null) {
        var rawtasktime = new Date(due)
    
        var taskdayint = rawtasktime.getDay()
        var taskdate = rawtasktime.getDate()
        var taskmonth = rawtasktime.getMonth() + 1
        var taskyear = rawtasktime.getFullYear()
    
        var duedateformatted = `${taskdate > 9 ? taskdate : "0" + taskdate}/${taskmonth > 9 ? taskmonth : "0" + taskmonth}/${taskyear}`
    
        var dayname = daylist[taskdayint]

        assignmentsdatedata = `<b>${dayname}</b>, ${duedateformatted}`
    }

    document.querySelector(location).insertAdjacentHTML("beforeend", `
        <tr>
            <td class="assignments-item">
                <b style="display: block;">${title}</b>
                <span style="display: block; padding-left: 0.5rem;">${desc}</span>
            </td>
            <td class="assignments-date">
                ${assignmentsdatedata}
            </td>
        </tr>
    `)
}

function changeToDoView(type) {
    const currentTable = document.querySelector(".todotable-current")
    const pastTable = document.querySelector(".todotable-passed")

    const currentBtn = document.querySelector(".todo-current")
    const passedBtn = document.querySelector(".todo-passed")

    if (type == "passed") {
        currentTable.style.display = "none"
        pastTable.style.display = "block"

        currentBtn.classList.remove("active")
        passedBtn.classList.add("active")

        return document.querySelector(".assignments-wrapper").scrollTo(0, 0)
    } if (type == "current") {
        pastTable.style.display = "none"
        currentTable.style.display = "block"

        currentBtn.classList.add("active")
        passedBtn.classList.remove("active")

        return document.querySelector(".assignments-wrapper").scrollTo(0, 0)
    }
}
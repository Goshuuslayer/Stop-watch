let start = document.getElementById("start")
let stop = document.getElementById("stop")
let lap = document.getElementById("lap")
let clear = document.getElementById("clear")
let display = document.getElementById("timer")
let ring = document.getElementById("ring")
let ul = document.getElementById("listlap")

const CIRCUMFERENCE = 691.15 // 2 * PI * 110
const MAX_LAPS = 5
let elapsed = 0      // milliseconds counted so far
let startedAt = 0    // time when the current run began
let timer = null
let laps = []

function format(ms) {
    let totalSeconds = Math.floor(ms / 1000)
    let mins = Math.floor(totalSeconds / 60)
    let sec = totalSeconds % 60
    let centi = Math.floor((ms % 1000) / 10)
    return String(mins).padStart(2, "0") + ":" +
        String(sec).padStart(2, "0") + "." +
        String(centi).padStart(2, "0")
}

function updateTime() {
    let total = elapsed + (Date.now() - startedAt)
    display.innerText = format(total)
    // ring fills once every 60 seconds
    let progress = (total % 60000) / 60000
    ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress)
}

start.addEventListener("click", function () {
    startedAt = Date.now()
    timer = setInterval(updateTime, 10)
    start.disabled = true
    stop.disabled = false
    lap.disabled = false
})

stop.addEventListener("click", function () {
    clearInterval(timer)
    elapsed += Date.now() - startedAt
    start.disabled = false
    stop.disabled = true
    lap.disabled = true
})

lap.addEventListener("click", function () {
    // only 5 laps allowed
    if (laps.length >= MAX_LAPS) {
        alert("Lap limit reached! You can only store " + MAX_LAPS + " laps. Press Clear to start again.")
        return
    }

    laps.push(display.innerText)
    ul.innerHTML = ""
    // newest lap on top
    for (let i = laps.length - 1; i >= 0; i--) {
        ul.innerHTML += `<li><span>Lap ${i + 1}</span><span>${laps[i]}</span></li>`
    }
})

clear.addEventListener("click", function () {
    clearInterval(timer)
    elapsed = 0
    laps = []
    ul.innerHTML = ""
    display.innerText = "00:00.00"
    ring.style.strokeDashoffset = CIRCUMFERENCE
    start.disabled = false
    stop.disabled = true
    lap.disabled = true
})

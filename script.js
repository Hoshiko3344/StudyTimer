var timerInterval;

var chime = new Audio()
var click = new Audio()
click.src = "./videos/click.wav"
chime.src = "./videos/chime.wav"
// Function to start the timer
function startTimer() {
    var hours = parseInt(document.getElementById('hours').value) || 0;
    var minutes = parseInt(document.getElementById('minutes').value) || 0;
    var seconds = parseInt(document.getElementById('seconds').value) || 0;

    var totalSeconds = hours * 3600 + minutes * 60 + seconds;
    var display = document.querySelector('#display');

    var timer = totalSeconds, hours, minutes, seconds;
    timerInterval = setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
            chime.play()
            clearInterval(timerInterval);
            display.textContent = "Finished";
        }
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    display.textContent = "00:00:00"
    clearInterval(timerInterval);
    chime.play()
}

// Wait for DOM content to load before attaching event listeners
document.addEventListener("DOMContentLoaded", function() {
    // Attach event listeners to buttons
    document.getElementById("startBtn").addEventListener("click", startTimer);
    document.getElementById("stopBtn").addEventListener("click", stopTimer);
});




// This function creates and initializes the YouTube player
function onYouTubeIframeAPIReady() {
    var player = new YT.Player('ytvid', {
        videoId: 'HhqWd3Axq9Y', // Replace VIDEO_ID with the ID of your live video
        playerVars: {
            controls: 0, // Hide player controls
            autoplay: 0, // Autoplay the video
            loop: 1, // Loop the video
            modestbranding: 0, // Remove YouTube logo from player
            showinfo: 0, // Hide video title and uploader information
            fs: 0, // Disable fullscreen button
            rel: 0 // Disable related videos at the end
        },
        events: {
            // You can add event handlers here if needed
        }
    });
}

var tasklist = []
var taskinput = document.getElementById("AddTask")
var taskbutton = document.getElementById("addbtn")
var taskmainlist = document.getElementById("list");
function tasksadd() {
    var taskText = taskinput.value.trim();
    if (taskText === '') {
        return;
    }
    tasklist.push(taskText);
    renderTaskList();
}

function renderTaskList() {
    var clutter = '';
    tasklist.forEach(function(task, idx) {
        clutter +=`<div id ="taskelem">`+`<div id = "tasktest">`+ task +`</div>`+ '<button class="deleteBtn" index="' + idx + '">DONE :D</button></div><br>';
    });

    taskmainlist.innerHTML = clutter;

    // Attach event listener to delete buttons
    var deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach(function(button) {
        button.addEventListener("click", taskremove);
    });
}

taskbutton.addEventListener("click",tasksadd)

function taskremove(){
    click.play()
    var removeidx = this.getAttribute("index")
    console.log(tasklist)

    tasklist.splice(removeidx,1)
    console.log(tasklist)
    renderTaskList()
}

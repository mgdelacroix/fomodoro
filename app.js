var app = {};

app.getTimer = function() {
    return document.getElementById("timer");
};

app.getTimerMinutes = function() {
    var timer = app.getTimer().innerHTML,
        minutes = timer.split(":")[0];
    return parseInt(minutes);
};

app.pad2 = function(num) {
    if (num < 10) {
        return "0"+num;
    } else {
        return ""+num;
    };
};

app.startTimer = function() {
    var now = new Date(),
        milisecondsToAdd = 1000*60*app.getTimerMinutes(),
        finishTime = new Date(now.getTime()+milisecondsToAdd),
        processTimestamp = function(ts) {
            app.updateTimer(ts.minutes, ts.seconds);
            if (ts.seconds == 0 &&
                ts.minutes == 0 &&
                ts.hours == 0) {
                app.stopTimer();
                app.playAudio();
            };
        };

    app.cntdwn = countdown(processTimestamp,
                           finishTime,
                           countdown.HOURS|countdown.MINUTES|countdown.SECONDS);
};

app.updateTimer = function(minutes, seconds) {
    var timer = app.getTimer();
    timer.innerHTML = app.pad2(minutes) + ":" + app.pad2(seconds);
};

app.stopTimer = function() {
    window.clearInterval(app.cntdwn);
    app.setMessage("Pommodoro finished!");
};

app.setTimer = function() {
    var timer = app.getTimer();
    var expected_timer = parseInt(window.prompt("Pomodoro time (in minutes)"));
    console.log("Timer " + expected_timer);
    if (isNaN(expected_timer)) {
        window.alert("Please enter a number of minutes");
    } else {
        timer.innerHTML = app.pad2(expected_timer) + ":00";
    }
};

app.getMessage = function() {
    return document.getElementById("message");
};

app.setMessage = function(msg) {
    var message = app.getMessage();
    message.className = "";
    message.innerHTML = msg;
};

app.clearMessage = function() {
    var message = app.getMessage();
    message.className = "hidden";
    message.innerHTML = null;
};

app.getAudio = function() {
    return document.getElementById("finishAudio");
};

app.playAudio = function() {
    var audio = app.getAudio();

    audio.play();
    window.setInterval(function() {audio.pause()}, 2000);
    audio.fastSeek(0);
};


// Init
var startTimer = document.getElementById("startTimer"),
    setTimer = document.getElementById("setTimer");

startTimer.onclick = app.startTimer;
setTimer.onclick = app.setTimer;

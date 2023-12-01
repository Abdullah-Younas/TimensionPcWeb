const addButton = document.getElementById("addbtn");
const setTimeContainer = document.querySelector('.SetTimeContainer');
const container = document.querySelector('.container');

let eventCount = 0;
let eventTimers = {}; // Object to store timers for each event

function addEvent(hours, mins, secs) {
  eventCount++;

  var newDiv = document.createElement("div");
  newDiv.setAttribute("class", "events");
  newDiv.setAttribute("id", "event" + eventCount);
  newDiv.innerHTML = "Event/Timer " + eventCount + ' <button class="subbtn">➖</button>' +
    '<div class="eventsContainer">' +
    '<div class="times" id="time' + eventCount + '">00:00:00</div>' +
    '</div>';

  container.insertBefore(newDiv, addButton);

  // Start the timer for the newly added event
  eventTimers["event" + eventCount] = {
    hours: parseInt(hours) || 0,
    mins: parseInt(mins) || 0,
    secs: parseInt(secs) || 0,
    intervalId: null
  };

  updateTime(eventCount);
}

function updateTime(eventNumber) {
  const timer = eventTimers["event" + eventNumber];

  timer.intervalId = setInterval(function () {
    timer.secs--;

    if (timer.secs < 0) {
      timer.secs = 59;
      timer.mins--;

      if (timer.mins < 0) {
        timer.mins = 59;
        timer.hours--;

        if (timer.hours < 0) {
          // Handle when the timer reaches 0
          timer.hours = 0;
          timer.mins = 0;
          timer.secs = 0;
          clearInterval(timer.intervalId); // Stop the interval
        }
      }
    }

    if(timer.hours === 0, timer.mins === 0, timer.secs === 0){
      window.alert("Hello");
    }

    var timeString = `${timer.hours.toString().padStart(2, '0')}:${timer.mins.toString().padStart(2, '0')}:${timer.secs.toString().padStart(2, '0')}`;
    document.getElementById("time" + eventNumber).textContent = timeString;
  }, 1000);
}

addButton.onclick = function () {
  // Display SetTimeContainer before adding an event
  setTimeContainer.style.display = 'flex';
};

document.getElementById('stcbtn').addEventListener('click', function () {
  let hours = document.getElementById('hoursInput').value;
  let mins = document.getElementById('minsInput').value;
  let secs = document.getElementById('secsInput').value;

  // Add a new event with the set time
  addEvent(hours, mins, secs);

  // Hide SetTimeContainer after saving time
  setTimeContainer.style.display = 'none';
});

container.addEventListener('click', function (event) {
  const target = event.target;
  if (target.classList.contains('subbtn')) {
    const eventDiv = target.closest('.events');
    const eventId = eventDiv.id;
    clearInterval(eventTimers[eventId].intervalId); // Stop the timer
    delete eventTimers[eventId]; // Remove the timer for this event
    eventDiv.remove();
  }
});

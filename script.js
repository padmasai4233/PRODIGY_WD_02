const timeElement = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesElement = document.getElementById('lapTimes');

let startTime = 0;
let elapsedTime = 0;
let intervalId = null;


startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function formatTime(time) {
  const milliseconds = Math.floor(time % 1000 / 10);
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 60000) % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}
function start() {
  startTime = Date.now() - elapsedTime;
  intervalId = setInterval(updateTimer, 10);
  startButton.disabled = true;
  pauseButton.disabled = false;
}

function pause() {
  clearInterval(intervalId);
  elapsedTime = Date.now() - startTime;
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function reset() {
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  timeElement.textContent = '00:00:00';
  lapTimesElement.innerHTML = '';
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  timeElement.textContent = formatTime(elapsedTime);
}

function lap() 
{
    document.getElementById('layout').style.marginTop="50px";
  if (intervalId) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapTimesElement.appendChild(lapItem);
  }
}
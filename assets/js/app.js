const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replayBtn");
const message = document.getElementById("message");
const steps = [...document.querySelectorAll(".step")];

let progress = 0;
let timer = null;

function setStepState() {
  const completed = Math.floor(progress / 25);
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === completed && progress < 100);
    step.classList.toggle("done", index < completed || progress === 100);
    step.querySelector(".step-status").textContent =
      index < completed || progress === 100 ? "Ready" :
      index === completed ? "Preparing" : "Waiting";
  });
}

function runLoading() {
  clearInterval(timer);
  progress = 0;
  startBtn.disabled = true;
  message.textContent = "Loading is simulated locally for this demo.";
  progressBar.style.width = "0%";
  progressText.textContent = "0%";
  setStepState();

  timer = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4;
    if (progress >= 100) progress = 100;

    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
    setStepState();

    if (progress === 100) {
      clearInterval(timer);
      startBtn.disabled = false;
      message.textContent = "Your practice workspace is ready.";
    }
  }, 350);
}

startBtn.addEventListener("click", () => {
  if (!startBtn.disabled) window.location.href = "interview.html";
});

replayBtn.addEventListener("click", runLoading);

runLoading();

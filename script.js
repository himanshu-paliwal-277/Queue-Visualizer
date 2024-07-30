const input = document.getElementById("queue-input");
const queueContainer = document.getElementById("queue-container");
const queue_front = document.getElementById("queue_front");
const queue_size = document.getElementById("queue_size");
const message = document.getElementById("message");
let queue = [];
let size = 0;
let enqueueSound = new Audio("./Assets/enqueue.mp3");
let dequeueSound = new Audio("./Assets/dequeue.wav");
let frontSound = new Audio("./Assets/front.mp3");
let resetSound = new Audio("./Assets/reset.wav");
let alertSound = new Audio("./Assets/alert.mp3");
let enqueue_button = document.getElementById("enqueue_button");
let dequeue_button = document.getElementById("dequeue_button");
let front_button = document.getElementById("front_button");
let reset_button = document.getElementById("reset_button");

function enqueue() {
  let value = input.value.trim();
  if (value) {
    let newElement = document.createElement("div");
    newElement.classList.add("queue_element");
    if (size === 0) {
      newElement.innerHTML = `<div class="absolute flex flex-col items-center top-[-25px] sm:block hidden text-black">
      <span>Front</span>
      <svg class="w-4 rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
      </div>${value}`;
    } else {
      let allQueueElement = document.querySelectorAll(".queue_element");
      if (size > 1) {
        allQueueElement[size - 1].innerHTML = queue[size - 1];
      }
      newElement.innerHTML = `<div class="absolute flex flex-col items-center top-[-25px] sm:block hidden text-black">
      <span>Back</span>
      <svg class="w-4 rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
      </div>${value}`;
    }
    queueContainer.appendChild(newElement);
    input.value = "";
    size++;
    queue_size.innerHTML = size;
    queue.push(value);
    console.log(queue);
    queue_front.innerHTML = queue[0];
    newElement.style.opacity = 0;
    setTimeout(() => {
      newElement.style.opacity = 1;
      dequeue_button.disabled = false;
      front_button.disabled = false;
      enqueue_button.disabled = false;
      reset_button.disabled = false;
    }, 200);
    enqueueSound.play();
    // message.innerText = "";
    dequeue_button.disabled = true;
    front_button.disabled = true;
    enqueue_button.disabled = true;
    reset_button.disabled = true;
  } else {
    message.innerText = "Please enter an element";
    message.style.opacity = 1;
    alertSound.play();
    setTimeout(() => {
      message.style.opacity = 0;
    }, 2000);
  }
}

function dequeue() {
  let allQueueElement = document.querySelectorAll(".queue_element");
  // Delete the first element
  if (allQueueElement.length > 0) {
    setTimeout(() => {
      allQueueElement[0].remove();
      size--;
      queue_size.innerHTML = size;
      queue.shift();
      console.log(queue);
      // message.innerText = "";
      if (queue[0] !== undefined) {
        queue_front.innerHTML = queue[0];
      } else {
        queue_front.innerHTML = "-";
      }
      dequeue_button.disabled = false;
      front_button.disabled = false;
      enqueue_button.disabled = false;
      reset_button.disabled = false;
      allQueueElement[1].innerHTML = `<div class="absolute flex flex-col items-center top-[-25px] sm:block hidden text-black">
      <span>Front</span>
      <svg class="w-4 rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
      </div>${queue[0]}`;
    }, 500);
    allQueueElement[0].style.opacity = "0";
    dequeue_button.disabled = true;
    front_button.disabled = true;
    enqueue_button.disabled = true;
    reset_button.disabled = true;
    dequeueSound.play();
  } else {
    message.innerText = "Queue is empty";
    message.style.opacity = 1;
    alertSound.play();
    setTimeout(() => {
      message.style.opacity = 0;
    }, 2000);
  }
}

function front() {
  if (queue.length > 0) {
    message.innerText = `Front element is ${queue[0]}`;
    frontSound.play();
  } else {
    message.innerText = "Queue is empty";
    alertSound.play();
  }
  message.style.opacity = 1;
  setTimeout(() => {
    message.style.opacity = 0;
  }, 2000);
}

function reset() {
  let allQueueElement = document.querySelectorAll(".queue_element");
  while (queue.length > 0) {
    queue.pop();
  }
  allQueueElement.forEach((element) => {
    element.remove();
  });
  size = 0;
  console.log(queue);
  queue_size.innerHTML = size;
  queue_front.innerHTML = "-";
  resetSound.play();
}

// iButtonToggle function
let information_div = document.getElementById("information_div");
function iButtonToggle() {
  if (information_div.classList.contains("hidden")) {
    information_div.classList.remove("hidden");
    setTimeout(() => {
      information_div.classList.add("hidden");
    }, 10000);
  } else {
    information_div.classList.add("hidden");
  }
}

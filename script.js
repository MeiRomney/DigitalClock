const digitalButton = document.getElementById("digital");
const analogButton = document.getElementById("analog");
const flipButton = document.getElementById("flip");
const digitalClock = document.querySelector(".digitalClock");
const analogClock = document.querySelector(".analogClock");
const flipClock = document.querySelector(".flipClock");

digitalButton.onclick = () => {
    analogClock.classList.remove("visible");
    flipClock.classList.remove("visible");
    digitalClock.classList.add("visible");
    analogButton.classList.remove("clicked");
    flipButton.classList.remove("clicked");
    digitalButton.classList.add("clicked");
}
analogButton.onclick = () => {
    digitalClock.classList.remove("visible");
    flipClock.classList.remove("visible");
    analogClock.classList.add("visible");
    digitalButton.classList.remove("clicked");
    flipButton.classList.remove("clicked");
    analogButton.classList.add("clicked");
}
flipButton.onclick = () => {
    analogClock.classList.remove("visible");
    digitalClock.classList.remove("visible");
    flipClock.classList.add("visible");
    analogButton.classList.remove("clicked");
    digitalButton.classList.remove("clicked");
    flipButton.classList.add("clicked");
}

// Design for Analog Clock
function createAnalogMarks() {
    const ticksContainer = document.querySelector(".ticks");

    // Generate 60 minute ticks
    for(let i = 0; i < 60; i++) {
        const tick = document.createElement("div");
        tick.classList.add("tick");
        if(i % 5 === 0) continue;
        // if(i % 5 === 0) tick.classList.add("hour-mark");

        tick.style.transform = `rotate(${i * 6}deg) translateX(-2px) translateY(-140px)`;
        ticksContainer.appendChild(tick);
    }
    for(let i = 0; i < 12; i++) {
        const tick = document.createElement("div");
        tick.classList.add("tick", "hour-mark");
        tick.style.transform = `rotate(${i * 30}deg) translateX(-2px) translateY(-130px)`;
        ticksContainer.appendChild(tick);
    }

    // Add numbers at 12, 3, 6, 9
    const numberMap = {
        0: "12",
        90: "3",
        180: "6",
        270: "9"
    };

    for (const [deg, num] of Object.entries(numberMap)) {
        const number = document.createElement("div");
        number.classList.add("clock-number");
        number.textContent = num;

        const radius = 115;
        const rad = (parseInt(deg) - 90) * (Math.PI / 180);
        const x = radius * Math.cos(rad);
        const y = radius * Math.sin(rad);

        number.style.left = `calc(50% + ${x}px)`;
        number.style.top = `calc(50% + ${y}px)`;

        document.querySelector(".face").appendChild(number);
    }
}
createAnalogMarks();

// Flip clock
function flipTo(element, newVal) {
    const top = element.querySelector(".top");
    const bottom = element.querySelector(".bottom");
    const flip = element.querySelector(".flip");
    const flipTop = element.querySelector(".flip-top");
    const flipBottom = element.querySelector(".flip-bottom");

    if(top.textContent === newVal) return;

    flip.classList.add("animate");
    flipTop.textContent = top.textContent;
    flipBottom.textContent = newVal;

    setTimeout(() => {
        top.textContent = newVal;
        bottom.textContent = newVal;
        flip.classList.remove("animate");
    }, 600);
}

function updateClocks() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format for digital and flip clocks
    const formattedHour = ((hours % 12) || 12).toString().padStart(2, "0");
    const formattedMinute = minutes.toString().padStart(2, "0");
    const formattedSecond = seconds.toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Digital Clock
    document.getElementById("time").textContent = `${formattedHour}:${formattedMinute}:${formattedSecond} ${ampm}`;

    // Date
    const options = { weekday : 'long', year: 'numeric', month: 'long', day: 'numeric'};
    document.getElementById("date").textContent = now.toLocaleDateString("en-US", options);

    // Flip Clock
    // document.getElementById("flipHour").textContent = formattedHour;
    // document.getElementById("flipMinute").textContent = formattedMinute;
    // document.getElementById("flipSecond").textContent = formattedSecond;
    // document.getElementById("flipAmpm").textContent = ampm;
    flipTo(document.getElementById("flipHour"), formattedHour);
    flipTo(document.getElementById("flipMinute"), formattedMinute);
    flipTo(document.getElementById("flipSecond"), formattedSecond);
    flipTo(document.getElementById("flipAmpm"), ampm);

    // Analog Clock
    const secondDeg = seconds * 6; // 360deg / 60
    const minuteDeg = minutes * 6 + seconds * 0.1; // Add 0.1 deg per second
    const hourDeg = ((hours % 12) + minutes / 60) * 30; // 360deg / 12

    document.getElementById("second").style.transform = `rotate(${secondDeg}deg)`;
    document.getElementById("minute").style.transform = `rotate(${minuteDeg}deg)`;
    document.getElementById("hour").style.transform = `rotate(${hourDeg}deg)`;
}

// Run every second 
setInterval(updateClocks, 1000);

// Call the updateClocks function
updateClocks();
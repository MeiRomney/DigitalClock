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
    document.getElementById("flipHour").textContent = formattedHour;
    document.getElementById("flipMinute").textContent = formattedMinute;
    document.getElementById("flipSecond").textContent = formattedSecond;
    document.getElementById("flipAmpm").textContent = ampm;

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
let json;

async function getData() {
  const url = "./data.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    json = await response.json(); // assign data to variable json
    showData('daily', document.getElementById("daily")); // default view
  } catch (error) {
    console.error(error.message);
  }
}

// Populating the DOM
function showData(timeframe, element) {

  document.querySelectorAll("button").forEach(btn => {
    btn.style.color = "hsl(235, 45%, 61%)"; // default Button color
  });
  element.style.color = "white"; // button color when clicked


  json.forEach(item => {
    const { title, timeframes } = item;
    const current = timeframes[timeframe].current;
    const previous = timeframes[timeframe].previous;

    // Select all h2 elements
    const head = document.querySelectorAll("h2");

    head.forEach(h2 => {
      if (h2.textContent === title) {
        // Get the parent card of this h2
        const card = h2.closest(".card");

        // Find the hours inside this card
        const currentHrs = card.querySelector(".current-hours");
        const previousHrs = card.querySelector(".previous-hours");

        // Update values
        currentHrs.textContent = `${current}hrs`;

        if (timeframe === "daily") {
          previousHrs.textContent = `Yesterday - ${previous}hrs`;
        } else if (timeframe === "weekly") {
          previousHrs.textContent = `Last Week - ${previous}hrs`;
        } else if (timeframe === "monthly") {
          previousHrs.textContent = `Last Month - ${previous}hrs`;
        }
      }
    });
  });
}

getData();
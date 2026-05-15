document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // 1. Grab values and turn them into arrays
  const categories = {
    Starch: document
      .getElementById("starch")
      .value.split(",")
      .map((s) => s.trim()),
    Vegetables: document
      .getElementById("veg")
      .value.split(",")
      .map((s) => s.trim()),
    Protein: document
      .getElementById("protein")
      .value.split(",")
      .map((s) => s.trim()),
    Fruit: document
      .getElementById("fruit")
      .value.split(",")
      .map((s) => s.trim()),
    Dairy: document
      .getElementById("dairy")
      .value.split(",")
      .map((s) => s.trim()),
    Fats: document
      .getElementById("fats")
      .value.split(",")
      .map((s) => s.trim()),
  };

  // Show the output section
  const outputSection = document.getElementById("output");
  outputSection.style.visibility = "visible";
  outputSection.style.height = "auto";

  const mealPlanContainer = document.getElementById("meal-plan");
  mealPlanContainer.innerHTML = ""; // Clear previous

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  days.forEach((day) => {
    const dayCard = document.createElement("div");
    dayCard.className = "day-card";
    dayCard.innerHTML = `<h3>${day}</h3><p class="spinning">Selecting...</p>`;
    mealPlanContainer.appendChild(dayCard);

    const displaySlot = dayCard.querySelector(".spinning");

    // 2. The "Slot Machine" Animation
    let spins = 0;
    const maxSpins = 15; // How many times it flickers
    const interval = setInterval(() => {
      // Pick random items for the flicker effect
      const randomStarch =
        categories.Starch[Math.floor(Math.random() * categories.Starch.length)];
      const randomProtein =
        categories.Protein[
          Math.floor(Math.random() * categories.Protein.length)
        ];

      displaySlot.innerText = `${randomProtein} with ${randomStarch}`;

      spins++;
      if (spins >= maxSpins) {
        clearInterval(interval);
        // 3. Final Selection
        const finalMeal = finalizeMeal(categories);
        displaySlot.innerText = finalMeal;
        displaySlot.classList.remove("spinning");
        displaySlot.classList.add("final-selection");
      }
    }, 80); // Speed of the spin (80ms)
  });
});

function finalizeMeal(cats) {
  const p = cats.Protein[Math.floor(Math.random() * cats.Protein.length)];
  const s = cats.Starch[Math.floor(Math.random() * cats.Starch.length)];
  const v = cats.Vegetables[Math.floor(Math.random() * cats.Vegetables.length)];
  return `${p} + ${s} + ${v}`;
}

// Placeholder for your Export function
function exportToCSV() {
  alert("Exporting your delicious plan to CSV...");
}

function returnHome() {
  window.location.reload();
}

let weeklyPlan = [];

function pullLever() {
  // 1. Trigger Lever Animation
  const lever = document.getElementById("lever");
  lever.classList.add("pulled");

  // 2. Transition Windows
  setTimeout(() => {
    document.getElementById("mealInput").style.display = "none";
    const output = document.getElementById("output");
    output.classList.remove("hidden");
    output.style.visibility = "visible";
    output.style.height = "auto";

    startSpinning();
  }, 500);
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function startSpinning() {
  const categories = {
    protein: document.getElementById("protein").value.split(","),
    starch: document.getElementById("starch").value.split(","),
    veg: document.getElementById("veg").value.split(","),
  };

  const slots = ["breakfast", "lunch", "dinner"];
  let usedMeals = new Set(); // Catch for no repetition

  slots.forEach((slotId, index) => {
    const slotElement = document.querySelector(`#slot-${slotId} .text`);
    let count = 0;

    const interval = setInterval(() => {
      let p = getRandom(categories.protein).trim();
      let s = getRandom(categories.starch).trim();
      slotElement.innerText = `${p} & ${s}`;
      count++;

      if (count > 20 + index * 10) {
        // staggered stopping
        clearInterval(interval);

        // Final selection with repeat check
        let finalMeal;
        do {
          finalMeal = `${getRandom(categories.protein).trim()} + ${getRandom(categories.starch).trim()}`;
        } while (usedMeals.has(finalMeal) && categories.protein.length > 1);

        usedMeals.add(finalMeal);
        slotElement.innerText = finalMeal;
        slotElement.classList.add("landed");

        // Add to our export data
        weeklyPlan.push({ Meal: slotId, Description: finalMeal });
      }
    }, 50);
  });
}

function returnHome() {
  location.reload();
}


let plates = JSON.parse(localStorage.getItem("plates")) || [];
let currentIndex = Number(localStorage.getItem("currentIndex")) || 0;
let results = JSON.parse(localStorage.getItem("results")) || [];

const plateInput = document.getElementById("plateInput");
const loadBtn = document.getElementById("loadBtn");
const count = document.getElementById("count");

const importSection = document.getElementById("importSection");
const checkSection = document.getElementById("checkSection");

const currentPlate = document.getElementById("currentPlate");
const progress = document.getElementById("progress");

const copyBtn = document.getElementById("copyBtn");
const openBtn = document.getElementById("openBtn");

const availableBtn = document.getElementById("availableBtn");
const unavailableBtn = document.getElementById("unavailableBtn");
const skipBtn = document.getElementById("skipBtn");

const exportBtn = document.getElementById("exportBtn");


loadBtn.addEventListener("click", () => {

    plates = plateInput.value
        .split("\n")
        .map(p => p.trim().toUpperCase())
        .filter(p => p.length > 0);

    plates = [...new Set(plates)];

    currentIndex = 0;
results = [];

localStorage.setItem("plates", JSON.stringify(plates));
localStorage.setItem("currentIndex", currentIndex);
localStorage.setItem("results", JSON.stringify(results));

    count.textContent = `${plates.length} plates loaded`;

    importSection.classList.add("hidden");
    checkSection.classList.remove("hidden");

    showCurrentPlate();

});


function showCurrentPlate(){

    if(currentIndex >= plates.length){

        currentPlate.textContent = "DONE!";
        progress.textContent = "All plates checked";

        return;
    }


    currentPlate.textContent = plates[currentIndex];

    progress.textContent =
        `${currentIndex + 1} / ${plates.length}`;

}


function saveResult(status){

    results.push({
        plate: plates[currentIndex],
        status: status
    });

    currentIndex++;

    localStorage.setItem("results", JSON.stringify(results));
    localStorage.setItem("currentIndex", currentIndex);

    showCurrentPlate();

}



availableBtn.addEventListener("click", () => {

    saveResult("Available");

});


unavailableBtn.addEventListener("click", () => {

    saveResult("Unavailable");

});


skipBtn.addEventListener("click", () => {

    saveResult("Skipped");

});



copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(
        plates[currentIndex]
    );

});


openBtn.addEventListener("click", () => {

    window.open(
        "https://eservices.drives.ga.gov/_/",
        "_blank"
    );

});



exportBtn.addEventListener("click", () => {


    let csv =
        "Plate,Status\n";


    results.forEach(result => {

        csv +=
        `${result.plate},${result.status}\n`;

    });


    const blob =
        new Blob(
            [csv],
            {type:"text/csv"}
        );


    const link =
        document.createElement("a");


    link.href =
        URL.createObjectURL(blob);


    link.download =
        "platepilot-results.csv";


    link.click();


});

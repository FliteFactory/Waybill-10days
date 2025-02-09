//инициализация объектов

const fuelRate = document.getElementById("fuelRate");
const odomStart = document.getElementById("odomStart");
const odomEnd = document.getElementById("odomEnd");
const fuelStart = document.getElementById("fuelStart");
const fuelEnd = document.getElementById("fuelEnd");

const strCount = 10;

const tableElements = [];
for (let i = 0; i < strCount; i++) {
    tableElements[i] = new Array();
    tableElements[i][0] = document.getElementById(`odomStart${i + 1}`);
    tableElements[i][1] = document.getElementById(`odomEnd${i + 1}`);
    tableElements[i][2] = document.getElementById(`mileage${i + 1}`);
    tableElements[i][3] = document.getElementById(`consump${i + 1}`);
    tableElements[i][4] = document.getElementById(`balance${i + 1}`);
    tableElements[i][5] = document.getElementById(`refueling${i + 1}`);
}

const totalMileage = document.getElementById("totalMileage");
const totalConsump = document.getElementById("totalConsump");
const totalRefueling = document.getElementById("totalRefueling");

const resetButton = document.getElementById("resetBtn");

let data = {
    fuelRate: 16.4,
    odomStart: 428810,
    fuelStart: 107,
    mileage1: 249,
    mileage2: 123,
    mileage3: 233,
    mileage4: 318,
    mileage5: 198,
    mileage6: 257,
    mileage7: 0,
    mileage8: 0,
    mileage9: 0,
    mileage10: 0,
    refueling1: 64,
    refueling2: 20,
    refueling3: 38,
    refueling4: 52,
    refueling5: 33,
    refueling6: 42,
    refueling7: 0,
    refueling8: 0,
    refueling9: 0,
    refueling10: 0
}

//добавление функции пересчёта путевого для каждого изменения инпутов

fuelRate.addEventListener("change", calculate);
odomStart.addEventListener("change", calculate);
fuelStart.addEventListener("change", calculate);
for (let i = 0; i < strCount; i++) {
    tableElements[i][2].addEventListener("change", calculate);
    tableElements[i][5].addEventListener("change", calculate);
}

resetButton.addEventListener("click", reset);

//инициализация таблицы путевого
initialize();

function calculate() {
    let prevOdom = Number(odomStart.value);
    let prevFuel = Number(fuelStart.value);
    let tempTotalMileage = 0;
    let tempTotalConsump = 0;
    let tempTotalRefueling = 0;
    for (i = 0; i < strCount; i++) {
        tableElements[i][0].textContent = prevOdom;
        tableElements[i][1].textContent = Number(tableElements[i][0].textContent) + Number(tableElements[i][2].value);
        tableElements[i][3].textContent = (Number(tableElements[i][2].value) / 100 * Number(fuelRate.value)).toFixed(2);
        tableElements[i][4].textContent = (prevFuel - Number(tableElements[i][3].textContent) + Number(tableElements[i][5].value)).toFixed(2);
        prevOdom = Number(tableElements[i][1].textContent);
        prevFuel = Number(tableElements[i][4].textContent);
        tempTotalMileage += Number(tableElements[i][2].value);
        tempTotalConsump += Number(tableElements[i][3].textContent);
        tempTotalRefueling += Number(tableElements[i][5].value);
    }
    odomEnd.textContent = tableElements[strCount - 1][1].textContent;
    fuelEnd.textContent = tableElements[strCount - 1][4].textContent;
    totalMileage.textContent = `${tempTotalMileage} км`;
    totalConsump.textContent = `${tempTotalConsump.toFixed(2)} л`;
    totalRefueling.textContent = `${tempTotalRefueling} л`;

    updateData();
    localStorage.setItem("data", JSON.stringify(data));
}

function initialize() {
    if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
    }

    fuelRate.value = Number(data.fuelRate);
    odomStart.value = Number(data.odomStart);
    fuelStart.value = Number(data.fuelStart);

    for (i = 0; i < strCount; i++) {
        tableElements[i][2].value = Number(data[`mileage${i + 1}`]);
        tableElements[i][5].value = Number(data[`refueling${i + 1}`]);
    }

    calculate();
}

function updateData() {
    data.fuelRate = Number(fuelRate.value);
    data.odomStart = Number(odomStart.value);
    data.fuelStart = Number(fuelStart.value);
    for (i = 0; i < strCount; i++) {
        data[`mileage${i + 1}`] = Number(tableElements[i][2].value);
        data[`refueling${i + 1}`] = Number(tableElements[i][5].value);
    }
}

function reset() {
    const answer = confirm("Запомните пробег и остаток. Очистить данные?");
    if (!answer) return;
    fuelRate.value = 16.4;
    odomStart.value = 0;
    fuelStart.value = 0;

    for (i = 0; i < strCount; i++) {
        tableElements[i][2].value = 0;
        tableElements[i][5].value = 0;
    }

    calculate();
}
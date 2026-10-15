// Hämtar och visar alla bilar i tabellen
function showCars() {
// Hämtar bilarna från JSON Server
fetch("http://localhost:3000/car")
.then(response => response.json())
.then(data => {
// Hämtar tabellen och tömmer den
let table = document.getElementById("data");
table.innerHTML = "";

        // Går igenom alla bilar
        data.forEach(car => {
            // Skapar en ny rad i tabellen
            let row = table.insertRow();

            // Lägger in bilens information i tabellen
            row.insertCell().innerHTML = car.id;
            row.insertCell().innerHTML = car.name;
            row.insertCell().innerHTML = car.model;
            row.insertCell().innerHTML = car.year;
            row.insertCell().innerHTML = car.rent;
            row.insertCell().innerHTML = car.status;

            // Skapar en cell för Delete-knappen
            let cell = row.insertCell();
            let button = document.createElement("button");

            // Skriver text på knappen
            button.innerHTML = "Delete";
            button.type = "button";

            // Tar bort bilen när man klickar
            button.onclick = function() {
                deleteCar(car.id);
            };

            // Lägger knappen i tabellen
            cell.appendChild(button);
        });
    })
    // Visar fel i konsolen om något går fel
    .catch(error => console.log(error));

}

// Lägger till en ny bil
function addCar() {
// Hämtar informationen från formuläret
let car = {
id: carform.carid.value,
name: carform.carname.value,
model: carform.model.value,
year: carform.year.value,
rent: carform.rent.value,
status: carform.status.value
};

// Skickar den nya bilen till JSON Server
fetch("http://localhost:3000/car", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    // Gör om bilen till JSON-text
    body: JSON.stringify(car)
})
.then(response => {
    // Kontrollerar om det gick bra
    if (!response.ok) {
        throw new Error("Could not add car");
    }
    return response.json();
})
.then(() => {
    // Tömmer formuläret och uppdaterar tabellen
    carform.reset();
    showCars();
})
// Visar fel om bilen inte kunde läggas till
.catch(error => console.log(error));

}

// Söker efter en bil med hjälp av ID
function searchCar() {
// Hämtar ID från sökfältet
let id = document.getElementById("searchid").value;

// Hämtar bilen med det valda ID-numret
fetch("http://localhost:3000/car/" + id)
    .then(response => {
        // Kontrollerar om bilen hittades
        if (!response.ok) {
            throw new Error("Car not found");
        }
        return response.json();
    })
    .then(car => {
        // Visar bilens information på sidan
        document.getElementById("result").innerHTML =
            car.id + " | " + car.name + " | " +
            car.model + " | " + car.year + " | " +
            car.rent + " | " + car.status;
    })
    .catch(() => {
        // Visas om bilen inte hittas
        document.getElementById("result").innerHTML = "Car not found";
    });

}

// Tar bort en bil med hjälp av ID
function deleteCar(id) {
// Skickar en DELETE-förfrågan till JSON Server
fetch("http://localhost:3000/car/" + encodeURIComponent(id), {
method: "DELETE"
})
.then(response => {
// Kontrollerar om bilen togs bort
if (!response.ok) {
throw new Error("Delete failed: " + response.status);
}

    // Hämtar tabellen igen
    showCars();
})
.catch(error => {
    // Visar fel om borttagningen misslyckas
    console.log(error);
    alert("Could not delete car. Check the ID and server.");
});

}

// Visar alla bilar när sidan startar
showCars();
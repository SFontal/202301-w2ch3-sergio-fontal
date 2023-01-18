const flights = [
    { id: 00, to: "New York", from: "Barcelona", cost: 700, scale: false },
    { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, scale: true },
    { id: 02, to: "Paris", from: "Barcelona", cost: 210, scale: false },
    { id: 03, to: "Roma", from: "Barcelona", cost: 150, scale: false },
    { id: 04, to: "London", from: "Madrid", cost: 200, scale: false },
    { id: 05, to: "Madrid", from: "Barcelona", cost: 90, scale: false },
    { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, scale: true },
    { id: 07, to: "Shangai", from: "Barcelona", cost: 800, scale: true },
    { id: 08, to: "Sydney", from: "Barcelona", cost: 150, scale: true },
    { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, scale: false },
];

function greet() {
    let userName = prompt('Nombre de usuario: ');
    if (userName === '' || userName === ' '.repeat(userName.length)) {
        userName = 'Anónimo/a'
    }
    return `¡Bienvenido/a, ${userName}!\n\n`;
}

function displayInfo() {
    return (displayFlights() +
                averageCost() +
                totalScale() +
                lastFlights()
    );
}

function displayFlights() {
    let flightsArray = [];
    for (let i in flights) {
        flightsArray.push(`El vuelo ${flights[i].id} con origen: ${flights[i].from}, y destino: ${flights[i].to} tiene un coste de ${flights[i].cost}€ ${hasScale(i)}`);
    }
    return flightsArray.join('\n');
}

function lastFlights() {
    let lastFlights = [`\n\nÚltimos 5 vuelos programados:`];
    let maxFromLength = 0;
    let difFromLength;

    flights.forEach(element => {
        if (element.from.length > maxFromLength) {
            maxFromLength = element.from.length;
        }
    });

    for (let i = flights.length - 5; i <= flights.length - 1; i++) {
        if (flights[i].from.length < maxFromLength) {
            difFromLength = maxFromLength - flights[i].from.length;
            lastFlights.push(`${flights[i].from}${' '.repeat(difFromLength)}    ---->    ${flights[i].to}`);
        } else {
            lastFlights.push(`${flights[i].from}    ---->    ${flights[i].to}`);
        }
    }
    return lastFlights.join('\n') + '\n\n';
}

function flightAdd() {
    if (flights.length === 15) {
        return alert('¡Has alcanzado el máximo de vuelos (15)!')
    } 
    
    let newFlight = [];
    let from = prompt('Ciudad de salida:');
    let to = prompt('Ciudad de destino:');
    let cost = prompt('Precio (€):');
    let scale = confirm('¿Vuelo con escala/s?');
    newFlight.push(from, to, cost);

    if (newFlight.includes('') || newFlight.includes(null) || newFlight.some(elem => elem === ' '.repeat(elem.length)) || isNaN(cost)) {
        return alert('¡Datos incorrectos y/o vacíos!');
    } else {
        flights.push({ id: (flights[flights.length - 1].id + 1), to: to, from: from, cost: Number(cost), scale: scale });
    }

    alert('¡Vuelo añadido!');
}

function flightDel() {
    let shortFlights = [];
    let findId;

    flights.forEach(element => {
        shortFlights.push(`ID: ${element.id} - de ${element.from} a ${element.to}`);
    });

    while (true) {
        id = prompt(`Selecciona el ID del vuelo a eliminar:\n\n${shortFlights.join('\n')}`);
        
        if (id === null) {
            return;
        } else if (isNaN(id) || id < 0 || id === '' || id === ' '.repeat(id.length)) {
            alert('¡ID no válido!');
        } else {
            for (let i = 0; i < flights.length; i++) {
                if (id == flights[i].id) {
                    findId = i;
                }
            };
            if (findId === undefined) {
                alert('¡ID no válido!');
            } else {
                flights.splice(findId, 1);
                alert('¡Vuelo eliminado!');
                break;
            }
        }
    }
}

function flightFind() {
    budget = prompt('Búsqueda por precio máximo (€):');
    budgetFlights = [`Vuelos de ${budget}€ (máximo):\n`];

    if (!isNaN(budget) && budget != null) {
        flights.forEach(element => {
            if (element.cost <= budget) {
                budgetFlights.push(`De ${element.from} a ${element.to}: ${element.cost}€`);
            }
        });
        if (budgetFlights.length === 1) {
            alert('No se han encontrado vuelos.')
        } else {
            console.log(budgetFlights.join('\n'));
        }
    } else {
        alert('No se han encontrado vuelos.');
    }
}

function hasScale(i) {
    if (flights[i].scale) {
        return 'con escala/s.';
    } else {
        return 'y no realiza ninguna escala.'
    }
}

function totalScale() {
    let acc = 0;
    for (let i in flights) {
        if (flights[i].scale) {
            acc++;
        }
    }
    return `\nHay ${acc} vuelos que realizan escala/s.`
}

function averageCost() {
    let sumCost = 0;
    for (let i in flights) {
        sumCost += flights[i].cost;
    }
    let average = sumCost / flights.length;
    return `\n\nEl coste medio de los vuelos es ${Number(average.toFixed(2))}€.`;
}

function isAdmin() {
    if (confirm('¿Eres administrador o usuario?\n\n[ACEPTAR] Administrador\n[CANCELAR] Usuario')) {
        return 'admin';
    } else {
        return 'user';
    }
}

function options(user) {
    while (true) {
        if (user === 'admin') {
            choice = prompt('Panel de control:\n\n[1] Añadir Vuelo\n[2] Eliminar Vuelo\n[3] Ver Vuelos\n[4] Salir');
        } else {
            choice = confirm('[ACEPTAR] Buscar vuelo por precio.\n[CANCELAR] Salir')
        }

        switch (choice) {
            case '1':
                flightAdd();
                break;
            case '2':
                flightDel();
                break;
            case '3':
                console.log(displayInfo());
                break;
            case true:
                flightFind();
                break;
            case null:
                break;
            case '4':
            case false:
                return;                
            default:
                alert('¡Opción no válida!');
                break;
        }
    }
}

console.log(greet());
console.log(displayInfo());
options(isAdmin());
console.log('¡Hasta la próxima!');
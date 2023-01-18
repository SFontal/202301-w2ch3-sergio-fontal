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

function main(arr) {
  console.log(greet() +
              displayFlights(arr) +
              averageCost(arr) +
              totalScale(arr) +
              lastFlights(arr));
}

function greet() {
  let userName = prompt('Nombre de usuario: ');

  if (userName === null || userName === '' || userName === ' '.repeat(userName.length)) {
    userName = 'Anónimo/a';
  }
  return `¡Bienvenido, ${userName}!\n\n`;
}

function displayFlights(arr) {
  let flightsArray = [];
  for (let i in arr) {
      flightsArray.push(`El vuelo con origen: ${arr[i].from}, y destino: ${arr[i].to} tiene un coste de ${arr[i].cost}€ ${hasScale(arr, i)}`);
  }
  return flightsArray.join('\n');
}

function lastFlights(arr) {
  let flights = [`\n\nÚltimos vuelos programados:`];
  let maxFromLength = 0;
  let minFromLength = 0;

  arr.forEach(element => {
      minFromLength = element.from.length;
      if (element.from.length > maxFromLength) {
          maxFromLength = element.from.length;
      }
      if (element.from.length < minFromLength) {
          minFromLength = element.from.length;
      }
  });
  
  let difFromLength = maxFromLength - minFromLength;

  for (let i = arr.length - 5; i <= arr.length -1; i++) {
      if (arr[i].from.length === minFromLength) {
          flights.push(`${arr[i].from}${' '.repeat(difFromLength)}    ---->    ${arr[i].to}`);
      } else {
          flights.push(`${arr[i].from}    ---->    ${arr[i].to}`);
      }
  }
  return flights.join('\n');
}

function hasScale(arr, i) {
  if (arr[i].scale) {
      return 'con escala.';
  } else {
      return 'y no realiza ninguna escala.'
  }
}

function totalScale(arr) {
  let acc = 0;
  for (let i in arr) {
      if (arr[i].scale) {
          acc++;
      }
  }
  return `\nHay ${acc} vuelos que realizan escala.`
}

function averageCost(arr) {
  let sumCost = 0;
  for (let i in arr) {
      sumCost += arr[i].cost;
  }
  let average = sumCost / arr.length;
  return `\n\nEl coste medio de los vuelos es ${average}€.`;
}

main(flights);
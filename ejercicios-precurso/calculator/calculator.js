let num1 = prompt('Introduce el primer número: ');
let num2 = prompt('Introduce el segundo número: ');
let resultStore = [];

function calculator(num1, num2) {
    let result = [];
    if (isNaN(num1 * num2) || num1 === ' ' || num2 === ' ' || (num1 === '' && num2 === '')) {
        return `Debes introducir números:\nTus entradas han sido '${num1}' y '${num2}'.`;
    } else if (num1 === '' || num2 === '') {
        if (num1 === '') {
            return `La raíz cuadrada de ${num2} es ${Number(Math.sqrt(num2).toFixed(3))}.`;
        } else {
            return `La raíz cuadrada de ${num1} es ${Number(Math.sqrt(num1).toFixed(3))}.`;
        }
    } else {
        num1 = Number(num1)
        num2 = Number(num2)
        result.push(Number((num1 + num2).toFixed(3)),
                    Number((num1 - num2).toFixed(3)),
                    Number((num1 * num2).toFixed(3)),
                    Number((num1 / num2).toFixed(3)));
        return result;
    }
}

function resultFormat() {
    if (typeof(calculator(num1, num2)) !== 'object') {
        return calculator(num1, num2);
    } else {
        resultStore = calculator(num1, num2);
        return `Los resultados son:\n ${num1} + ${num2} = ${resultStore[0]}\n ${num1} - ${num2} = ${resultStore[1]}\n ${num1} x ${num2} = ${resultStore[2]}\n ${num1} / ${num2} = ${resultStore[3]}`;
    }
}

console.log('Hola');
alert(resultFormat());
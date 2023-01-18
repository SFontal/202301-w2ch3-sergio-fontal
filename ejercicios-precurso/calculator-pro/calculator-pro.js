let resultOperator = [];
let resultFormat = [];

function errorManager(arr = []) {
    let inputArray = arr;
    let choice;

    while (true) {
        let num = prompt(`Introduce un número:\n --> introduce al menos dos valores.\n --> 'ok' para ver los resultados.\n\n ---> Números introducidos: ${new Intl.ListFormat('es').format(inputArray)}`);
        if (num === 'ok') {
            if (inputArray.length === 0 && (choice = prompt(`No has introducido ningún valor.\n\n¿Quieres volver a intentarlo? (s/n) :`)) === 's') {
                errorManager();
                break;
            } else if (inputArray.length === 1 && inputArray[0] !== '') {
                return alert(`La raíz cuadrada de ${inputArray[0]} es ${Math.sqrt(inputArray[0]).toFixed(3)}.`);
            } else if (inputArray.length > 1) {
                let accountVoid = inputArray.map(function (element) {
                    let acc = 0;
                    if (element !== '') {
                        acc++;
                    }
                    return acc;
                })
                let reduce = accountVoid.reduce((a, b) => a + b);
                if (reduce === 1) {
                    let soloNumIndex = Array.from(accountVoid).indexOf(1);
                    return alert(`La raíz cuadrada de ${inputArray[soloNumIndex]} es ${Math.sqrt(inputArray[soloNumIndex]).toFixed(3)}.`);
                } else {
                    return inputArray;
                }
            } else {
                return;
            }
        } else if (isNaN(num * 1) || num === ' ' || (num === '' && inputArray.length >= 1 && inputArray[0] === '')) {
            choice = prompt(`Debes introducir números:\nTu última entrada ha sido '${num}'.\n\n¿Quieres volver a intentarlo? (s/n) :`);
            if (choice === 's') {
                errorManager(inputArray);
                return inputArray;
            } else {
                return;
            }
        } else {
            inputArray.push(num);
        }
    }
}

function operator() {
    let initialNumbers = [];
    let sum, sub, mult, div;
    let result = [];

    for (let num in arguments) {
        n = Number(arguments[num]);
        if (arguments[num] === '') {
            continue;
        } else if (sum === undefined) {
            sum = n;
            mult = n;
            sub = n;
            div = n;
            initialNumbers = initialNumbers.concat(n);
        } else {
            sum += n;
            mult *= n;
            sub -= n;
            div /= n;
            initialNumbers = initialNumbers.concat(n);
        }
    }
    result = result.concat([[initialNumbers, [sum, sub, mult, div]]]);
    return result;
}

function format(resultOperator) {
    let lastOperation = resultOperator[resultOperator.length - 1];
    let introLast = `Los resultados son:\n`;
    let introPrevious = `\n\nLos anteriores resultados son:\n`;
    
    function display(inputValues, operation) {
        return `${inputValues.join(' + ')} = ${Number((operation[0].toFixed(3)))}\n${inputValues.join(' - ')} = ${Number((operation[1].toFixed(3)))}\n${inputValues.join(' x ')} = ${Number((operation[2].toFixed(3)))}\n${inputValues.join(' / ')} = ${Number((operation[3].toFixed(3)))}`;
    }

    function formatPreviousOperations() {
        let result = [];
        for (let i = (resultOperator.length - 2); i >= 0; i--) {
            let inputValues = resultOperator[i][0];
            let operation = resultOperator[i][1];
            result = result.concat(display(inputValues, operation));
        }
        return result.join('\n\n');
    }

    function displayOperation(intro = introLast, defaultOperation = lastOperation) {
        let inputValues = defaultOperation[0];
        let operation = defaultOperation[1]
        
        if (intro === introLast) {
            return alert(intro + display(inputValues, operation));
        } else {
            return alert(introLast + display(inputValues, operation) + intro + formatPreviousOperations());
        }
    }

    if (resultOperator.length > 1) {
        return displayOperation(introPrevious);
    } else {
        return displayOperation();
    }
}

function calculatorPro() {
    let resultErrorFiltered = [];
    resultErrorFiltered = resultErrorFiltered.concat(errorManager());

    if (resultErrorFiltered[0] !== undefined) {
        resultOperator = resultOperator.concat(operator(...resultErrorFiltered));
        resultFormat = format(resultOperator);
    }
    
    if (confirm(`¿Quieres probar de nuevo?`)) {
        calculatorPro();
        return;
    } else {
        return '¡Gracias por tu tiempo!';
    }
}

calculatorPro();
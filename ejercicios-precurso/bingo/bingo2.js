function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function reset() {
    turn = {number: 0, string: '00'};
    turnBar = ' '.repeat(48)
    drumNumbers = [];
    pointsAcc = {streak: 0, points: 90000, current: '090000'};
    linea = [false, false, false];
    bingoPoints = false;
    setGrid();
}

// ------------------------------ USER ------------------------------
let userName;
function user() {
    userName = prompt('\nNombre de usuario: ');
    
    if (userName === null || userName === '' || userName === ' '.repeat(userName.length)) {
        userName = 'Anónimo/a';
    } else if (userName.length > 14) {
        alert('\n\nNombre demasiado largo. Máximo 14 carácteres.');
        user();
    }
}

function spaceAfterName() {
    let space = 14 - userName.length;
    return ' '.repeat(space);
}

// ----------------------------- SCORE ------------------------------
let pointsAcc;
let bingoPoints;
let linea;
function score() {
    
    function newScore() {
        let points = pointsAcc.points.toString();
        if (points.length < 6) {
            pointsAcc.current = '0'.repeat(6 - points.length) + points;
        } else {
            pointsAcc.current = points;
        }
    }
    
    function matchedScore() {
        if (matchedNum) {
            pointsAcc.streak++;
            pointsAcc.points += (100 * pointsAcc.streak);
        } else {
            pointsAcc.streak = 0;
        }        
    }
    
    function lineaScore() {
        if (linea[0] && !linea[1]) {        
            if (drumNumbers.length === 5) {
                pointsAcc.points += (5000 * pointsAcc.streak);
            } else if (pointsAcc.streak === 5) {
                pointsAcc.points += (2500 * pointsAcc.streak);
            } else {
                pointsAcc.points += (1000 * pointsAcc.streak);
            }            
            linea[1] = true;
        }        
    }

    function bingoScore() {
        if (drumNumbers.length === 17) {
            pointsAcc.points += (50000 * pointsAcc.streak);
        } else if (linea[0] && pointsAcc.streak === 2) {
            pointsAcc.points += (25000 * pointsAcc.streak);
        } else {
            pointsAcc.points += (10000 * pointsAcc.streak);
        }
    }
    
    if (bingoPoints) {
        bingoScore();
        newScore();
        addRanking();

    } else {
        pointsAcc.points = pointsAcc.points - 1000;
        matchedScore();
        lineaScore();
        newScore();
    }
}

ranking = [{user: 'ManuR357', turns: 15, points: '862000'},
           {user: 'Tony4', turns: 24, points: '143800'},
           {user: 'R0s_4', turns: 37, points: '126400'},
           {user: 'ISDI', turns: 70, points: '100000'},
           {user: 'kmakus', turns: 52, points: '090900'},
           {user: 'Awa954', turns: 48, points: '083200'},
           {user: '3v1t4', turns: 64, points: '071500'},
           {user: 'err0R!', turns: 90, points: '012500'},
           {user: 'err0R!', turns: 90, points: '012500'},
        ]

function addRanking() {
    ranking.push({user: userName, turns: turn.number, points: pointsAcc.current});
    ranking.sort(function (a, b) { return (b.points - a.points); });
}

// ------------------------------ DRUM ------------------------------
let drumNumbers = [];
function drum() {
    while (true) {
        let num = randomNum(1, 91);
        if (drumNumbers.includes(num)) { continue; }
        drumNumbers.push(num);
        gridAdd(num);
        displayGrid();
        displayLastNum(num);
        return;
    }
}

let separator = `  ║ ├${'──┼'.repeat(9)}──┤`;
let blank = '  │';
let grid = [];
function setGrid() {
    grid = [];
    grid.push(`  ║ ┌${'──┬'.repeat(9)}──┐`);
    grid[18] = `  ║ └${'──┴'.repeat(9)}──┘`;
    for (let i = 1; i < 18; i += 2) {
        grid[i] = ['  ║ │'];
        for (let j = 1; j < 11; j++) { grid[i][j] = blank; }
        if (i+1 < 17) { grid[i+1] = separator; }
    }
}

function gridAdd(num) {
    let i = num;
    while (i > 10) { i -= 10; }
    if (num < 10) {
        grid[1][i] = `0${num}│`;
    } else if (i === 10) {
        grid[Math.floor(num/10)*2-1][i] = `${num}│`;
    } else {
        grid[Math.floor(num/10)*2+1][i] = `${num}│`;
    }
}

let newGrid = [].concat(grid);
function displayGrid() {
    newGrid = [].concat(grid);
    for (let i = 1; i < 18; i += 2) {
        newGrid[i] = newGrid[i].join('');
    }
}

let lastNum = [`  ┌${'─'.repeat(9)}┐ ║`,,,,`  └${'─'.repeat(9)}┘ ║`];
let bigNums = ['▄▀▄', ' ▄█', '█▀▀', '█▀█', '█ █', ' ▄▀', ' ■█', '█▄█', '▀■▄', '█■▄', '█■█', '▀■█', '▀▄▀', '  █', '█▄▄', ' █ '];
function displayLastNum(num) {
    let unit = num;
    let ten = Math.floor(num/10);
    while (unit >= 10) { unit -= 10; }

    if ([0, 2, 3, 6, 8, 9].includes(ten)) { lastNum[1] = `  │ ${bigNums[0]}`; }
    if ([1, 4].includes(ten)) { lastNum[1] = `  │ ${bigNums[1]}`; }
    if (ten == 5) { lastNum[1] = `  │ ${bigNums[2]}`; }
    if (ten == 7) { lastNum[1] = `  │ ${bigNums[3]}`; }
    if ([0, 2, 3, 6, 8, 9].includes(unit)) { lastNum[1] += ` ${bigNums[0]} │ ║`; }
    if ([1, 4].includes(unit)) { lastNum[1] += ` ${bigNums[1]} │ ║` }
    if (unit == 5) { lastNum[1] += ` ${bigNums[2]} │ ║`; }
    if (unit == 7) { lastNum[1] += ` ${bigNums[3]} │ ║`; }
    
    if ([2, 7].includes(ten)) { lastNum[2] = `  │ ${bigNums[5]}`; }
    if (ten == 0) { lastNum[2] = `  │ ${bigNums[4]}`; }
    if (ten == 1) { lastNum[2] = `  │ ${bigNums[13]}`; }
    if (ten == 3) { lastNum[2] = `  │ ${bigNums[6]}`; }
    if (ten == 4) { lastNum[2] = `  │ ${bigNums[7]}`; }
    if (ten == 5) { lastNum[2] = `  │ ${bigNums[8]}`; }
    if (ten == 6) { lastNum[2] = `  │ ${bigNums[9]}`; }
    if (ten == 8) { lastNum[2] = `  │ ${bigNums[10]}`; }
    if (ten == 9) { lastNum[2] = `  │ ${bigNums[11]}`; }
    if ([2, 7].includes(unit)) { lastNum[2] += ` ${bigNums[5]} │ ║`; }
    if (unit == 0) { lastNum[2] += ` ${bigNums[4]} │ ║`; }
    if (unit == 1) { lastNum[2] += ` ${bigNums[13]} │ ║`; }
    if (unit == 3) { lastNum[2] += ` ${bigNums[6]} │ ║`; }
    if (unit == 4) { lastNum[2] += ` ${bigNums[7]} │ ║`; }
    if (unit == 5) { lastNum[2] += ` ${bigNums[8]} │ ║`; }
    if (unit == 6) { lastNum[2] += ` ${bigNums[9]} │ ║`; }
    if (unit == 8) { lastNum[2] += ` ${bigNums[10]} │ ║`; }
    if (unit == 9) { lastNum[2] += ` ${bigNums[11]} │ ║`; }
    
    if ([0, 3, 5, 6, 8, 9].includes(ten)) { lastNum[3] = `  │ ${bigNums[12]}`; }
    if ([1, 4].includes(ten)) { lastNum[3] = `  │ ${bigNums[13]}`; }
    if (ten == 2) { lastNum[3] = `  │ ${bigNums[14]}`; }
    if (ten == 7) { lastNum[3] = `  │ ${bigNums[15]}`; }
    if ([0, 3, 5, 6, 8, 9].includes(unit)) { lastNum[3] += ` ${bigNums[12]} │ ║`; }
    if ([1, 4].includes(unit)) { lastNum[3] += ` ${bigNums[13]} │ ║` }
    if (unit == 2) { lastNum[3] += ` ${bigNums[14]} │ ║`; }
    if (unit == 7) { lastNum[3] += ` ${bigNums[15]} │ ║`; }
}

let streak = [`  ┌${'─'.repeat(9)}┐ ║`,,,,`  └${'─'.repeat(9)}┘ ║`];
function displayStreak() {
    if ([0, 2, 3, 6, 8, 9].includes(pointsAcc.streak)) { streak[1] = `  │     ${bigNums[0]} │ ║`; }
    if ([1, 4].includes(pointsAcc.streak)) { streak[1] = `  │     ${bigNums[1]} │ ║`; }
    if (pointsAcc.streak == 5) { streak[1] = `  │     ${bigNums[2]} │ ║`; }
    if (pointsAcc.streak == 7) { streak[1] = `  │     ${bigNums[3]} │ ║`; }

    if ([2, 7].includes(pointsAcc.streak)) { streak[2] = `  │ ${bigNums[12]} ${bigNums[5]} │ ║`; }
    if (pointsAcc.streak == 0) { streak[2] = `  │ ${bigNums[12]} ${bigNums[4]} │ ║`; }
    if (pointsAcc.streak == 1) { streak[2] = `  │ ${bigNums[12]} ${bigNums[13]} │ ║`; }
    if (pointsAcc.streak == 3) { streak[2] = `  │ ${bigNums[12]} ${bigNums[6]} │ ║`; }
    if (pointsAcc.streak == 4) { streak[2] = `  │ ${bigNums[12]} ${bigNums[7]} │ ║`; }
    if (pointsAcc.streak == 5) { streak[2] = `  │ ${bigNums[12]} ${bigNums[8]} │ ║`; }
    if (pointsAcc.streak == 6) { streak[2] = `  │ ${bigNums[12]} ${bigNums[9]} │ ║`; }
    if (pointsAcc.streak == 8) { streak[2] = `  │ ${bigNums[12]} ${bigNums[10]} │ ║`; }
    if (pointsAcc.streak == 9) { streak[2] = `  │ ${bigNums[12]} ${bigNums[11]} │ ║`; }

    if ([0, 3, 5, 6, 8, 9].includes(pointsAcc.streak)) { streak[3] = `  │ ${bigNums[0]} ${bigNums[12]} │ ║`; }
    if ([1, 4].includes(pointsAcc.streak)) { streak[3] = `  │ ${bigNums[0]} ${bigNums[13]} │ ║`; }
    if (pointsAcc.streak == 2) { streak[3] = `  │ ${bigNums[0]} ${bigNums[14]} │ ║`; }
    if (pointsAcc.streak == 7) { streak[3] = `  │ ${bigNums[0]} ${bigNums[15]} │ ║`; }
}

let smiley = [`  ┌${'─'.repeat(9)}┐ ║`,,'  │         │ ║',,`  └${'─'.repeat(9)}┘ ║`];
function displaySmiley() {
    if (pointsAcc.streak < 1) {
        smiley[1] = '  │  ▄   ▄  │ ║';
        smiley[3] = '  │  ▄▀▀▀▄  │ ║';
    }
    if (pointsAcc.streak === 1) {
        smiley[1] = '  │  ▄   ▄  │ ║';
        smiley[3] = '  │  ▀▄▄▄▀  │ ║';
    }
    if (pointsAcc.streak > 1) {
        smiley[1] = '  │  █   █  │ ║';
        smiley[3] = '  │  ▀▄▄▄▀  │ ║';
    }
}

// ----------------------------- CARD -----------------------------
let matchedNum = false;
function matchedNumbers() {
    matchedNum = false;
    
    card.forEach(number => {
        if (number.number === drumNumbers[drumNumbers.length - 1]) {
            number.matched = true;
            matchedNum = true;
        }
    });
}

let turn = {number: 0, string: '00'};
let turnBar = ' '.repeat(48);
function isTurn() {
    turn.number++
    if (turn.number < 10) {
        turn.string = `0${turn.number}`;
    } else {
        turn.string = turn.number;
    }
    
    turnBar = ' ' + '█'.repeat(Math.ceil(turn.number/2)) + ' '.repeat(47 - Math.ceil(turn.number/2));
}

function isLinea() {
    let acc = 0;
    let row = 0;
    
    card.forEach(number => {
        if (number.row != row) {
            acc = 0;
        }
        row = number.row;
        
        if (number.matched === true) {
            acc++;
        }

        if (acc === 9) {
            linea[0] = true;
            card.forEach(number => {
                if (number.row === row) {
                    number.linea = true;
                }
            });
        }
    });
}

function isBingo() {
    if (card.every(number => number.matched === true)) {
        bingoPoints = true;
        score();
        displayCard();
        alert(`\n¡BINGO!`);
        return true;
    }
}

function randomOddColumns() {
    let columns = [];
    
    while (columns.length < 3) {
        let num = randomNum(1, 10);
        
        if (columns.includes(num)) {
            continue;
        } else {
            columns.push(num);
        }
    }
    return columns.sort();
}

function randomTens() {
    let columns = randomOddColumns();
    let tens = [];
    let arg = [];
    
    for (let i = 0; i < 9; i++) {
        if (i === 0) {
            arg = [1, 10];
        } else {
            arg = [i * 10, i * 10 + 10];
        }
        
        let num = randomNum(arg[0], arg[1]);
        let num2 = randomNum(arg[0], arg[1]);
        
        if (columns.includes(i + 1)) {
            tens.push([num, 'void', 'void']);
        } else {
            if (num >= 80 && num === num2) {num2 = 90}
            
            while (num === num2) {
                num2 = randomNum(arg[0], arg[1]);
            }
            tens.push([num, num2, 'void'].sort());
        }
    }
    return tens;
}

function cardNumbersLayout() {
    let layout = randomTens();
    let rowVoids = [];

    function countVoids() {
        let voids = [0, 0, 0];
        
        layout.forEach (ten => {
            if (ten[0] === 'void') {voids[0]++;}
            if (ten[1] === 'void') {voids[1]++;}
            if (ten[2] === 'void') {voids[2]++;}
        })
        return voids;
    }
    
    while ((rowVoids[0] === 4 && rowVoids[1] === 4 && rowVoids[2] === 4) === false) {
        for (let i in layout) {
            layout[i].sort(() => Math.random() - 0.5);
        }
        rowVoids = countVoids();
    }
    
    layout.forEach(ten => {
        let buffer;
        if (ten[0] > ten[1]) {
            buffer = ten[0];
            ten[0] = ten[1];
            ten[1] = buffer;
        }
        if (ten[1] > ten[2]) {
            buffer = ten[1];
            ten[1] = ten[2];
            ten[2] = buffer;
        }
        if (ten[0] > ten[2]) {
            buffer = ten[0];
            ten[0] = ten[2];
            ten[2] = buffer;
        }
    });
    return layout;
}

function cardNumbersProps() {
    let layout = cardNumbersLayout();
    let card = [];
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 9; j++) {
            let isMatched = false;
            
            if (layout[j][i] === 'void') {isMatched = true;}
            
            card.push({ number: layout[j][i], matched: isMatched, row: i, linea: false });
        }
    }
    return card;
}

function cardHeader() {
    let header = [`   ║ ┌${'─'.repeat(13)}┬${'─'.repeat(27)}┬${'─'.repeat(20)}┐ ║`,
    `   ║ │ ISDI BINGO! │ Jugador/a: ${userName}${' '.repeat(15 - userName.length)}│ Puntuación: ${pointsAcc.current} │ ║`,
    `   ║ └${'─'.repeat(13)}┴${'─'.repeat(27)}┴${'─'.repeat(20)}┘ ║`,
    `   ║ ┌${('─'.repeat(6) + '┬').repeat(8) + '─'.repeat(6)}┐ ║`];
    return header;
}

function cardFooter() {
    let footer = [`   ║ └${('─'.repeat(6) + '┴').repeat(8) + '─'.repeat(6)}┘ ║`,
    `   ║ ┌${'─'.repeat(13)}┬${'─'.repeat(48)}┐ ║`,
                  `   ║ │  Turno: ${turn.string}  │${turnBar}│ ║`,
                  `   ║ └${'─'.repeat(13)}┴${'─'.repeat(48)}┘ ║`];
    return footer;
}

function cardRows() {
    let separator = `   ║ ├${('─'.repeat(6) + '┼').repeat(8) + '─'.repeat(6)}┤ ║`;
    let rows = [[[], [], [], [separator]],[[], [], [], [separator]],[[], [], []]];
    
    card.forEach (value => {
        let linea = ' ';
        let matched = ' ';
        
        if (value.linea === true) {
            linea = '═';
        }
        
        if (value.matched === true) {
            matched = 'x';//'•';
        }

        if (card.indexOf(value) === 0 || card.indexOf(value) === 9 || card.indexOf(value) === 18) {
            rows[value.row][0].push(`   ║ │${linea.repeat(6) + '│'}`);
            rows[value.row][2] = rows[value.row][0];
            if (value.number === 'void') {
                rows[value.row][1].push(`   ║ │  ██  │`);
            } else if (value.number < 10) {
                rows[value.row][1].push(`   ║ │ ${matched}0${value.number}${matched} │`);
            } else {
                rows[value.row][1].push(`   ║ │ ${matched}${value.number}${matched} │`);
            }
        } else if (card.indexOf(value) === 8 || card.indexOf(value) === 17 || card.indexOf(value) === 26) {
            rows[value.row][0].push(`${linea.repeat(6) + '│'} ║`);
            rows[value.row][2] = rows[value.row][0];
            if (value.number === 'void') {
                rows[value.row][1].push(`  ██  │ ║`);
            } else if (value.number < 10) {
                rows[value.row][1].push(` ${matched}0${value.number}${matched} │ ║`);
            } else {
                rows[value.row][1].push(` ${matched}${value.number}${matched} │ ║`);
            }
        } else {
            rows[value.row][0].push(linea.repeat(6) + '│');
            rows[value.row][2] = rows[value.row][0];
            if (value.number === 'void') {
                rows[value.row][1].push(`  ██  │`);
            } else if (value.number < 10) {
                rows[value.row][1].push(` ${matched}0${value.number}${matched} │`);
            } else {
                rows[value.row][1].push(` ${matched}${value.number}${matched} │`);
            }
        }
    });

    rows = rows.flat();
    for (let i in rows) {rows[i] = rows[i].join(''); }
    return rows;
}

function displayCard() {
    return [cardHeader(), cardRows(), cardFooter()].flat();
}

// ----------------------------- TITLE -----------------------------
title = ['\n'.repeat(5),
         '          ▄▄▄▄▄▄ ▄▄▄▄▄▄ ▄▄▄▄▄  ▄▄▄▄▄▄       ███████▄    ████████████  ████      ██    ████████      ████████    ██',
         '            ██   ▀▀■■▄▄ ██  ██   ██         ██     ▀██       ██       ██ ██     ██  ██        ██  ██        ██  ██',
         '          ▀▀▀▀▀▀ ▀▀▀▀▀▀ ▀▀▀▀▀  ▀▀▀▀▀▀       ██▄▄▄▄▄█▀        ██       ██  ██    ██  ██            ██        ██  ██',
         '          ▄▄▄  ▄▄  ▄▄▄  ▄▄▄▄ ▄▄▄   ▄▄▄      ██▀▀▀▀▀██▄       ██       ██    ██  ██  ██    ██████  ██        ██  ██',
         '         █    █  █ █  █ █■   █■▄▀ ▀■■▄      ██     ▄█▀       ██       ██     ██ ██  ██        ██  ██        ██',
         '          ▀▀▀  ▀▀  ▀▀▀  ▀▀▀▀ ▀  ▀ ▀▀▀       ███████▀    ████████████  ██      ████    ████████      ████████    ██\n'];

// ----------------------------- SCREENS -----------------------------
function mainScreen() {
    console.clear();
    return console.log(['\n'.repeat(11), title.join('\n')].join('\n'));
}

function byeScreen() {
    console.clear();
    byeScreen = ['\n'.repeat(17),
                        '          ▄▄▄▄▄▄ ▄▄▄▄▄▄ ▄▄▄▄▄  ▄▄▄▄▄▄       ▄▄▄▄▄▄▄▄▄   ▄▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄      ▄▄    ▄▄▄▄▄▄▄▄      ▄▄▄▄▄▄▄▄    ▄▄',
                        '            ██   ▀▀■■▄▄ ██  ██   ██         ██■■■■■■■█       ██       ██ ▀▀■■▄▄ ██  ██    ■■■■▄▄  ██        ██  ▀▀',
                        '          ▀▀▀▀▀▀ ▀▀▀▀▀▀ ▀▀▀▀▀  ▀▀▀▀▀▀       ▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀▀▀▀  ▀▀      ▀▀▀▀    ▀▀▀▀▀▀▀▀      ▀▀▀▀▀▀▀▀    ▀▀',
                        `          ▄▄▄  ▄▄  ▄▄▄  ▄▄▄▄ ▄▄▄   ▄▄▄      ┌${'─'.repeat(68)}┐`,
                        `         █    █  █ █  █ █■   █■▄▀ ▀■■▄      │${' '.repeat(17)}¡Gracias por jugar, ${userName}!${' '.repeat(14-userName.length)}${' '.repeat(16)}│`,
                        `          ▀▀▀  ▀▀  ▀▀▀  ▀▀▀▀ ▀  ▀ ▀▀▀       └${'─'.repeat(68)}┘\n`];
    return console.log(byeScreen.join('\n'));                        
}

let card = [];
function changeCardScreen() {
    do {
        console.clear();
        card = cardNumbersProps()
        let showCard = displayCard();
        let changeCardScreen = [title.join('\n'), `${' '.repeat(28)}╔${'═'.repeat(66)}╗`];
        showCard.forEach(element => {
            changeCardScreen.push(`${' '.repeat(25)}${element}`);
        });
        changeCardScreen.push(`${' '.repeat(28)}╚${'═'.repeat(66)}╝`);
        console.log(changeCardScreen.join('\n'));
    } while (confirm('\n¿Quieres jugar con este cartón?') === false)
}

function bingoScreen() {
    drum();
    isTurn();
    matchedNumbers();
    if (!linea[0]) { isLinea(); }
    score();
    displaySmiley();
    displayStreak();
    console.clear();
    
    let card = [].concat(displayCard());
    let blank = ' '.repeat(14) + '║';
    let bingoScreen = [`  ╔${'═'.repeat(46)}╗   ╔${'═'.repeat(66)}╗`];
    for (let i = 1; i <= newGrid.length; i++) {
        if (i > 0 && i < 6) { bingoScreen[i] = newGrid[i-1] + lastNum[i-1] + card[i-1]; }
        else if (i > 7 && i < 13) { bingoScreen[i] = newGrid[i-1] + smiley[i - 8] + card[i-1]; }
        else if (i > 14) { bingoScreen[i] = newGrid[i-1] + streak[i - 15] + card[i-1]; }
        else { bingoScreen[i] = newGrid[i-1] + blank + card[i-1]; }
    }
    bingoScreen = bingoScreen.concat([`  ╚${'═'.repeat(46)}╝   ╚${'═'.repeat(66)}╝`]);
    bingoScreen.unshift(...title);
    console.log(bingoScreen.join('\n'));
}

function instructionsScreen() {
    console.clear();
    let instructionsScreen = [title.join('\n'),
                              `  ╔${'═'.repeat(117)}╗`,
                              `  ║${' '.repeat(117)}║`,
                              '  ║ 1.- Cada partida empieza con 90.000 puntos (p).          ┌─────────┐ │                                            │ ║',
                              '  ║                                                          │  █   █  │ │ El "smiley" indica si no se ha acertado el │ ║',
                              '  ║ 2.- Cada turno resta 1.000p del total.                   │         │ │ número (triste), si sí (sonriente), o si   │ ║',
                              '  ║                                                          │  ▀▄▄▄▀  │ │ estás en racha x2 o más (alegre).          │ ║',
                              '  ║ 3.- Cada número acertado sumará 100p.                    └─────────┘ │                                            │ ║',
                              `  ║${' '.repeat(117)}║`,
                              '  ║ 4.- Al cantar "¡LÍNEA!" se sumarán:                                                                                 ║',
                              '  ║     - 5.000p si se canta con los 5 primeros números.     │                                             │┌─────────┐ ║',
                              '  ║     - 2.500p si son 5 números seguidos no iniciales.     │ El multiplicador de racha multiplicará los  ││     ▄▀▄ │ ║',
                              '  ║     - 1.000p en una línea corriente.                     │ puntos que obtengas en ese momento por el   ││ ▀▄▀  ▄▀ │ ║',
                              '  ║                                                          │ número de bolas acertadas seguidas (racha). ││ ▄▀▄ █▄▄ │ ║',
                              '  ║ 5.- Al cantar "¡BINGO!" se sumarán:                      │                                             │└─────────┘ ║',
                              '  ║     - 50.000p si se canta con los 15 primeros números.                                                              ║',
                              '  ║     - 25.000p si se canta 2 números después de ¡LÍNEA!.                                                             ║',
                              '  ║     - 10.000p en un bingo corriente.                                                                                ║',
                              `  ║${' '.repeat(117)}║`,
                              '  ║ 6.- Cantado "¡BINGO!", el resto de turnos no consumidos serán multiplicados por 1.000 y sumados al total.           ║',
                              `  ║${' '.repeat(117)}║`,
                              `  ╚${'═'.repeat(117)}╝`,];

    return console.log(instructionsScreen.join('\n'));
}

function rankingScreen() {
    console.clear();
    let rankingScreen = [title.join('\n'), `  ╔${'═'.repeat(117)}╗`, `  ║${' '.repeat(51)}TOP 10 RANKING${' '.repeat(52)}║`, `  ║${' '.repeat(117)}║`];
    for (let i = 0; i < 9; i++) {
        rankingScreen.push(`  ║${' '.repeat(30)}${i+1}.- ${ranking[i].user + ' '.repeat(20-ranking[i].user.length)}${ranking[i].turns} turnos           ${ranking[i].points} puntos${' '.repeat(30)}║`);
        if (i < 8) { rankingScreen.push(`  ║${' '.repeat(117)}║`); }
    }
    rankingScreen.push(`  ╚${'═'.repeat(117)}╝`);

return console.log(rankingScreen.join('\n'));
}

// ----------------------------- MAIN -----------------------------
function bingo() {
    mainScreen();
    user();
    while (true) {
        reset();
        mainScreen();
        option = prompt(`\nOPCIONES:\n  [1] ¡JUGAR!\n  [2] Cambiar nombre (${userName})\n  [3] Ver instrucciones\n  [4] Ver puntuaciones\n  [5] Salir`);
        switch (option) {
            case '1':
                changeCardScreen();
                while (true) {
                    bingoScreen();
                    if (isBingo()) { break; }
                    if (linea[0] && linea[1] && !linea[2]) {
                        linea[2] = true;
                        alert(`\n  ¡LÍNEA!`);
                    } else {
                        alert ('\nSiguiente Turno')
                    }
                }
                rankingScreen();
                alert('\nVolver al menú');
                break;
            case '2':
                user();
                break;
            case '3':
                instructionsScreen();
                alert('\nVolver al menú');
                break;
            case '4':
                rankingScreen();
                alert('\nVolver al menú');
                break;
            case '5':
                return byeScreen();
        }
    }
}

bingo();
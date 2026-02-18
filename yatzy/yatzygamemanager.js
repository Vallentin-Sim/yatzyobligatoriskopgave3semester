// Yatzy Dice Logik
let diceValues = [0, 0, 0, 0, 0];
let diceHeld = [false, false, false, false, false];
let throwCount = 0;
let random = Math.random;

function rollDice() {
    for (let i = 0; i < 5; i++) {
        if (!diceHeld[i]) {
            diceValues[i] = Math.floor(random() * 6) + 1;
        }
    }
}

function holdDie(index) {
    if (index >= 0 && index < 5) {
        diceHeld[index] = !diceHeld[index];
    }
}

function getDiceValues() {
    return diceValues;
}

function resetDice() {
    for (let i = 0; i < 5; i++) {
        diceValues[i] = 0;
        diceHeld[i] = false;
    }
}

function getThrowCount() {
    return throwCount;
}



// Yatzy GUI Logik

// Yatzy Game Manager / Scorings Logik
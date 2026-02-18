// Yatzy Dice Logik
let diceValues[] = [0, 0, 0, 0, 0];
let diceHeld[] = [false, false, false, false, false];
let random = new Random();

function rollDice() {
    for (let i = 0; i < 5; i++) {
        if (!diceHeld[i]) {
            diceValues[i] = random.nextInt(1,7);
        }
    }
}

function holdDie(index) {
    if (index >= 0 && index < 5) {
        diceHeld[index] = !diceHeld[index];
    }
}


// Yatzy GUI Logik

// Yatzy Game Manager / Scorings Logik
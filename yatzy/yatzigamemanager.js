// ===== YatzyDice Class =====
class YatzyDice {
    // Face values of the 5 dice.
    // 1 <= values[i] <= 6 for i in [0..4]
    constructor() {
        this.values = new Array(5).fill(0);
        this.throwCount = 0;
        this.random = Math.random;
    }

    // Return the 5 face values of the dice.
    getValues() {
        return this.values;
    }

    // Set the 5 face values of the dice. Note: This method is only to be used in tests.
    setValues(values) {
        this.values = values;
    }

    // Return the number of times the 5 dice have been thrown.
    getThrowCount() {
        return this.throwCount;
    }

    // Reset the throw count.
    resetThrowCount() {
        this.throwCount = 0;
    }

    // Roll the 5 dice. Only roll dice that are not hold.
    roll(holdStatus) {
        for (let i = 0; i < 5; i++) {
            if (!holdStatus[i]) {
                this.values[i] = Math.floor(this.random() * 6) + 1;
            }
        }
        this.throwCount++;
    }
}

// ===== YatzyGui Class =====
class YatzyGui {
    constructor() {
        this.dice = new YatzyDice();
        this.holdStatus = new Array(5).fill(false);
        this.initUI();
    }

    initUI() {
        // Initialize the user interface elements
        // Elements are created and event listeners are attached
    }

    rollDice() {
        this.dice.roll(this.holdStatus);
        this.updateUI();
    }

    updateUI() {
        // Update the UI with the current dice values
        const values = this.dice.getValues();
        this.displayDiceValues(values);
    }

    displayDiceValues(values) {
        for (let i = 0; i < 5; i++) {
            const diceElement = document.getElementById(`dice-${i}`);
            if (diceElement) {
                diceElement.textContent = values[i];
            }
        }
    }

    toggleHold(index) {
        this.holdStatus[index] = !this.holdStatus[index];
        const holdButton = document.getElementById(`hold-${index}`);
        if (holdButton) {
            holdButton.classList.toggle('held');
        }
    }

    getThrowCount() {
        return this.dice.getThrowCount();
    }

    resetGame() {
        this.dice.resetThrowCount();
        this.holdStatus = new Array(5).fill(false);
        this.dice.setValues(new Array(5).fill(0));
        this.updateUI();
    }
}

// ===== YatzyGameManager Class =====
class YatzyGameManager {
    constructor() {
        this.gui = new YatzyGui();
        this.gameHistory = [];
        this.currentGameDiceHistory = [];
        this.totalScore = 0;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Roll button
        const rollButton = document.getElementById('roll-button');
        if (rollButton) {
            rollButton.addEventListener('click', () => this.handleRoll());
        }

        // Hold buttons
        for (let i = 0; i < 5; i++) {
            const holdButton = document.getElementById(`hold-${i}`);
            if (holdButton) {
                holdButton.addEventListener('click', () => this.handleHold(i));
            }
        }

        // Score buttons
        for (let category of this.getScoringCategories()) {
            const scoreButton = document.getElementById(`score-${category.id}`);
            if (scoreButton) {
                scoreButton.addEventListener('click', () => this.handleScore(category));
            }
        }

        // Reset button
        const resetButton = document.getElementById('reset-button');
        if (resetButton) {
            resetButton.addEventListener('click', () => this.handleReset());
        }
    }

    getScoringCategories() {
        return [
            { id: 'ones', name: 'Ones', value: (dice) => this.sumDice(dice, 1) },
            { id: 'twos', name: 'Twos', value: (dice) => this.sumDice(dice, 2) },
            { id: 'threes', name: 'Threes', value: (dice) => this.sumDice(dice, 3) },
            { id: 'fours', name: 'Fours', value: (dice) => this.sumDice(dice, 4) },
            { id: 'fives', name: 'Fives', value: (dice) => this.sumDice(dice, 5) },
            { id: 'sixes', name: 'Sixes', value: (dice) => this.sumDice(dice, 6) },
            { id: 'pair', name: 'Pair', value: (dice) => this.calculatePair(dice) },
            { id: 'twoPairs', name: 'Two Pairs', value: (dice) => this.calculateTwoPairs(dice) },
            { id: 'threeOfAKind', name: 'Three of a Kind', value: (dice) => this.calculateNOfAKind(dice, 3) },
            { id: 'fourOfAKind', name: 'Four of a Kind', value: (dice) => this.calculateNOfAKind(dice, 4) },
            { id: 'fullHouse', name: 'Full House', value: (dice) => this.calculateFullHouse(dice) },
            { id: 'smallStraight', name: 'Small Straight', value: (dice) => this.calculateSmallStraight(dice) },
            { id: 'largeStraight', name: 'Large Straight', value: (dice) => this.calculateLargeStraight(dice) },
            { id: 'chance', name: 'Chance', value: (dice) => this.sumAllDice(dice) },
            { id: 'yatzy', name: 'Yatzy', value: (dice) => this.calculateYatzy(dice) }
        ];
    }

    sumDice(dice, num) {
        return dice.reduce((sum, val) => val === num ? sum + val : sum, 0);
    }

    sumAllDice(dice) {
        return dice.reduce((sum, val) => sum + val, 0);
    }

    calculatePair(dice) {
        const counts = {};
        dice.forEach(die => counts[die] = (counts[die] || 0) + 1);
        for (let i = 6; i >= 1; i--) {
            if (counts[i] >= 2) return i * 2;
        }
        return 0;
    }

    calculateTwoPairs(dice) {
        const counts = {};
        dice.forEach(die => counts[die] = (counts[die] || 0) + 1);
        let pairs = [];
        for (let i = 6; i >= 1; i--) {
            if (counts[i] >= 2) pairs.push(i);
            if (pairs.length === 2) return pairs[0] * 2 + pairs[1] * 2;
        }
        return 0;
    }

    calculateNOfAKind(dice, n) {
        const counts = {};
        dice.forEach(die => counts[die] = (counts[die] || 0) + 1);
        for (let i = 1; i <= 6; i++) {
            if (counts[i] >= n) return i * n;
        }
        return 0;
    }

    calculateFullHouse(dice) {
        const counts = {};
        dice.forEach(die => counts[die] = (counts[die] || 0) + 1);
        const values = Object.values(counts);
        if ((values.includes(3) && values.includes(2)) || values.includes(5)) {
            return this.sumAllDice(dice);
        }
        return 0;
    }

    calculateSmallStraight(dice) {
        const sorted = [...dice].sort((a, b) => a - b);
        if ((sorted[0] === 1 && sorted[4] === 5) || 
            (sorted[0] === 2 && sorted[4] === 6)) {
            return 15;
        }
        return 0;
    }

    calculateLargeStraight(dice) {
        const sorted = [...dice].sort((a, b) => a - b);
        if ((sorted[0] === 1 && sorted[4] === 5) || 
            (sorted[0] === 2 && sorted[4] === 6)) {
            return 20;
        }
        return 0;
    }

    calculateYatzy(dice) {
        if (dice.every(die => die === dice[0])) {
            return 50;
        }
        return 0;
    }

    handleRoll() {
        if (this.gui.getThrowCount() < 3) {
            this.gui.rollDice();
            this.recordDiceThrow();
            this.updateThrowCount();
        } else {
            alert('You have used all 3 throws!');
        }
    }

    recordDiceThrow() {
        const diceValues = this.gui.dice.getValues().slice();
        this.currentGameDiceHistory.push({
            throw: this.gui.getThrowCount(),
            values: diceValues
        });
    }

    handleHold(index) {
        this.gui.toggleHold(index);
    }

    handleScore(category) {
        const diceValues = this.gui.dice.getValues();
        const points = category.value(diceValues);
        
        this.totalScore += points;
        
        this.gameHistory.push({
            category: category.name,
            points: points,
            diceHistory: this.currentGameDiceHistory.slice(),
            finalDice: diceValues.slice(),
            timestamp: new Date().toLocaleTimeString()
        });

        this.updateHistory();
        this.handleReset();
    }

    handleReset() {
        this.currentGameDiceHistory = [];
        this.gui.resetGame();
        this.updateThrowCount();
    }

    updateThrowCount() {
        const throwCountElement = document.getElementById('throw-count');
        if (throwCountElement) {
            throwCountElement.textContent = `Throws: ${this.gui.getThrowCount()} / 3`;
        }
    }

    updateHistory() {
        const historyContainer = document.getElementById('history-list');
        if (!historyContainer) return;

        historyContainer.innerHTML = '';
        let runningTotal = 0;

        this.gameHistory.forEach((game, index) => {
            runningTotal += game.points;
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const diceHistory = game.diceHistory.map((throw_, idx) => 
                `Throw ${throw_.throw}: [${throw_.values.join(', ')}]`
            ).join(' → ');

            historyItem.innerHTML = `
                <div class="history-header">
                    <span class="history-category">${game.category}</span>
                    <span class="history-points">${game.points} points</span>
                    <span class="history-total">Total: ${runningTotal}</span>
                </div>
                <div class="history-dice">
                    <small>${diceHistory}</small>
                </div>
                <div class="history-final">
                    <small>Final: [${game.finalDice.join(', ')}]</small>
                </div>
            `;
            historyContainer.appendChild(historyItem);
        });

        const totalElement = document.getElementById('total-score');
        if (totalElement) {
            totalElement.textContent = `Total Score: ${this.totalScore}`;
        }
    }

    start() {
        this.updateThrowCount();
        this.gui.updateUI();
        this.updateHistory();
    }
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameManager = new YatzyGameManager();
    window.gameManager.start();
});

let die = createDice()

//die.throwDice() laver lidt problemer lige pt så det er kommenteret ud
//console.log(die.values);
//console.log(die.chancePoints());
//console.log(die.frequency());
//console.log(die.largeStraightPoints());

// Laver lige nogle throw button og die elementer
const throwBtn = document.querySelector("#throwDice");
const dieEls = [
    document.querySelector("#die1"),
    document.querySelector("#die2"),
    document.querySelector("#die3"),
    document.querySelector("#die4"),
    document.querySelector("#die5")
]

// click to hold adfærd
dieEls.forEach((el, index) => {
    if (!el) return;
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
        die.holdStatus[index] = !die.holdStatus[index];
        el.classList.toggle("held", die.holdStatus[index])
    })
})

console.log(document.body);
console.log(document.querySelector(".numberItem"));

console.log(document.querySelector("div"));

let lockedFields = {
    chance: false, ones: false, twos: false, threes: false, fours: false, fives: false, sixes: false, pair: false, twoPair: false,
    threeKind: false, fourKind: false, fullhouse: false, smallStraight: false, bigStraight: false, yatzy: false}

let throwCounter = document.querySelector("#ThrowCount")
let chancePoint = document.querySelector("#Chance")
chancePoint.addEventListener("click", () => lock("chance"));
let onesPoint = document.querySelector("#ones")
onesPoint.addEventListener("click", () => lock("ones"));
let twosPoint = document.querySelector("#twos")
twosPoint.addEventListener("click", () => lock("twos"));
let treesPoint = document.querySelector("#threes")
treesPoint.addEventListener("click", () => lock("threes"));
let foursPoint = document.querySelector("#fours")
foursPoint.addEventListener("click", () => lock("fours"));
let fivesPoint = document.querySelector("#fives")
fivesPoint.addEventListener("click", () => lock("fives"));
let sixesPoint = document.querySelector("#sixes")
sixesPoint.addEventListener("click", () => lock("sixes"));
let pairPoint = document.querySelector("#pair")
pairPoint.addEventListener("click", () => lock("pair"));
let twoPairPonit = document.querySelector("#twoPair")
twoPairPonit.addEventListener("click", () => lock("twoPair"));
let treeOfAKindPoint = document.querySelector("#treeOfAkind")
treeOfAKindPoint.addEventListener("click", () => lock("threeKind"));
let fourOfAKindPoint = document.querySelector("#fourOfAKind")
fourOfAKindPoint.addEventListener("click", () => lock("fourKind"));
let fullHousePoint = document.querySelector("#fullhouse")
fullHousePoint.addEventListener("click", () => lock("fullhouse"));
let smallStraightPoint = document.querySelector("#smallStraight")
smallStraightPoint.addEventListener("click", () => lock("smallStraight"));
let largeStraightPoint = document.querySelector("#bigStraight")
largeStraightPoint.addEventListener("click", () => lock("bigStraight"));
let yatzyPoint = document.querySelector("#Yatzy")
yatzyPoint.addEventListener("click", () => lock("yatzy"));

const fieldToElement = {
    ones: onesPoint,
    twos: twosPoint,
    threes: treesPoint,
    fours: foursPoint,
    fives: fivesPoint,
    sixes: sixesPoint,
    pair: pairPoint,
    twoPair: twoPairPonit,
    threeKind: treeOfAKindPoint,
    fourKind: fourOfAKindPoint,
    fullhouse: fullHousePoint,
    smallStraight: smallStraightPoint,
    bigStraight: largeStraightPoint,
    chance: chancePoint, 
    yatzy: yatzyPoint
}


// throwdice 
//let buttonThrow = document.querySelector("#throwDice")


function throwThemDice(){
    die.throwDice()
    let para = document.querySelectorAll("#diceBox p")
    for (let i = 0; i < die.values.length; i++) {
        if (para[i]){
            para[i].textContent = die.values[i]
        }
    }
    updateTabel()

    throwCounter.value = die.throwCount

    // disable adfærd efter 3 kast
    if (die.throwCount >= 3) {
        throwBtn.disabled = true;
    } else {
        throwBtn.disabled = false;
    }
}

// Tilføjet toggle lock state.
function lock(field){
    lockedFields[field] = !lockedFields[field]
    const el = fieldToElement[field]
    if (!el) return;
    if(lockedFields[field]){
        el.classList.add("locked")
        el.disabled = true;

        die.values = [0,0,0,0,0]
        die.throwCount = 0;
        die.holdStatus = [false,false,false,false,false]
        die.frequencyArr = [0,0,0,0,0,0];

        dieEls.forEach((el) => {
            if (!el) return
            el.textContent = "Die temp"
            el.classList.remove("held")
        })

        throwCounter.value = die.throwCount
        throwBtn.disabled = false;
        updateTabel();
        calculateTotals();
    } else {
        el.classList.remove("locked")
        el.disabled = false;
    }
}

function restart(){
    die.values = [0,0,0,0,0]
    die.holdStatus = [false,false,false,false,false]
    die.frequencyArr = [0,0,0,0,0,0];
    // chancePoint.textContent = "0" --- Simon: prøver lige at ordne det så restart fungere med mine tilføjelser
    for (const key in fieldToElement) {
        const el = fieldToElement[key]
        if (!el) continue;
        if (el.tagName==="TEXTAREA"){
            el.value = "";
        }
        else el.textContent = "";
        el.classList.remove("locked")
        el.disabled = false;
    }

    dieEls.forEach((el) => {
        if (!el) return
        el.textContent = "Die temp"
        el.classList.remove("held")
    })

    // Reset UI state
    throwCounter.value = 0;
    throwBtn.disabled = false;
    unlockAll()
    calculateTotals();
}

// Har tilføjet lidt extra for at sikre vi åbner for alle felter ved restart.
function unlockAll() {
    for (let key in lockedFields) {
        lockedFields[key] = false;
        const el = fieldToElement[key]
        if (el) {
            el.classList.remove("locked")
            el.disabled = false;
        }
    }
}



// Ændre lige alle textContent til value for textarea elementer. I kan bare ændre det tilbage igen.
function updateTabel(){
    if (!lockedFields.chance){
    chancePoint.value = die.chancePoints()
    }
    if(!lockedFields.ones) onesPoint.value = die.sameValuepoint(1);
    if(!lockedFields.twos) twosPoint.value = die.sameValuepoint(2)
    if(!lockedFields.threes) treesPoint.value = die.sameValuepoint(3)
    if(!lockedFields.fours) foursPoint.value = die.sameValuepoint(4)
    if(!lockedFields.fives) fivesPoint.value = die.sameValuepoint(5)
    if(!lockedFields.sixes) sixesPoint.value = die.sameValuepoint(6)
    if(!lockedFields.pair) pairPoint.value = die.onePairPoints()
    if(!lockedFields.twoPair) twoPairPonit.value = die.twoPairPoints()
    if(!lockedFields.threeKind) treeOfAKindPoint.value = die.threeSamePoints()
    if(!lockedFields.fourKind) fourOfAKindPoint.value = die.fourSamePoints()
    if(!lockedFields.fullhouse) fullHousePoint.value = die.fullHousePoints()
    if(!lockedFields.smallStraight) smallStraightPoint.value = die.smallStraightPoints()
    if(!lockedFields.bigStraight) largeStraightPoint.value = die.largeStraightPoints()
    if(!lockedFields.yatzy) yatzyPoint.value = die.yatzyPoints()

    throwCounter.value = die.throwCount
}

function calculateTotals() {
    // Alle relevante keys
    const allScoreKeys = [
        'ones', 'twos', 'threes', 'fours', 'fives', 'sixes',
        'pair', 'twoPair', 'threeKind', 'fourKind',
        'fullhouse', 'smallStraight', 'bigStraight', 'chance', 'yatzy'
    ];

    let sum = 0;
    allScoreKeys.forEach(key => {
        if (lockedFields[key]) {
            const el = fieldToElement[key];
            if (el) {
                const val = parseInt(el.value || el.textContent) || 0;
                sum += val;
            }
        }
    });

    // Bonus: 50 hvis sum af 1-6 >= 63
    const numberKeys = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
    let numberSum = 0;
    numberKeys.forEach(key => {
        if (lockedFields[key]) {
            const el = fieldToElement[key];
            if (el) {
                const val = parseInt(el.value || el.textContent) || 0;
                numberSum += val;
            }
        }
    });

    const bonus = (numberSum >= 63) ? 50 : 0;
    const total = sum + bonus;

    // Opdater felterne
    const sumEl = document.querySelector("#Sum");
    const bonusEl = document.querySelector("#Bonus");
    const scoreEl = document.querySelector("#Score");

    if (sumEl) sumEl.value = sum;
    if (bonusEl) bonusEl.value = bonus;
    if (scoreEl) scoreEl.value = total;
}
  
// make dice logic   
    function createDice (){

let dice = {}
 
  
  // Face values of the 5 dice.
    // 1 <= values[i] <= 6 for i in [0..4]
    dice.values = [0,0,0,0,0]

    // Number of times the 5 dice have been thrown.
    // 0 <= throwCount <= 3.
    dice.throwCount = 0;

    dice.holdStatus = [false,false,false,false,false]


    dice.frequencyArr = [0,0,0,0,0,0];

    

    /**
     * Reset the throw count.
     */
     // to do
    dice.resetThrowCount = function() {
        dice.throwCount = 0;
        dice.resetHoldStatus();
    }

    
     dice.throwDice=function() {
        dice.throwCount++;
        for (let i =0;i<dice.values.length;i++){
            if (!dice.holdStatus[i]) {
                dice.values[i] = Math.round(Math.random()*5)+1;
            }
        }
    }

    
    // -------------------------------------------------------------------------

    /**
     * Return all results possible with the current face values.<br/>
     * The order of the results is the same as on the score board.<br/>
     * Note: This is an optional method. Comment this method out,<br/>
     * if you don't use it.
     */
     dice.getResult=function() {
        let results = []
        for (let i = 0; i <= 5; i++) {
            results[i] = this.sameValuePoints(i+1);
        }
        results[6] = dice.onePairPoints();
        results[7] = dice.twoPairPoints();
        results[8] = dice.threeSamePoints();
        results[9] = dice.fourSamePoints();
        results[10] = dice.fullHousePoints();
        results[11] = dice.smallStraightPoints();
        results[12] = dice.largeStraightPoints();
        results[13] = dice.chancePoints();
        results[14] = dice.yatzyPoints();

        return results;
    }
    

    // -------------------------------------------------------------------------

    // Return an int[7] containing the frequency of face values.
    // Frequency at index v is the number of dice with the face value v, 1 <= v <= 6.
    // Index 0 is not used.
    // Note: This method can be used in several of the following methods.

   
        
    
     dice.frequency=function() {
        dice.frequencyArr = [0,0,0,0,0,0]
        for (let value of dice.values) {
            dice.frequencyArr[value-1]+=1;
        }
        return dice.frequencyArr
    }
    

    /**
     * Return same-value points for the given face value.<br/>
     * Returns 0, if no dice has the given face value.<br/>
     * Pre: 1 <= value <= 6.
     */
     dice.sameValuepoint=function(value) {
        dice.frequency() ;
        return dice.frequencyArr[value-1]*value;
    }

    /**
     * Return points for one pair (for the face value giving the highest points).<br/>
     * Return 0, if there aren't 2 dice with the same face value.
     */
     dice.onePairPoints=function() {
        let num=0;
        dice.frequency();
        for (let i=1;i<dice.frequencyArr.length;i++){
        if (this.frequencyArr[i]>=2){
            num=(i+1)*2;
        }
        }
        return num;
    }


    /**
     * Return points for two pairs<br/>
     * (for the 2 face values giving the highest points).<br/>
     * Return 0, if there aren't 2 dice with the same face value<br/>
     * and 2 other dice with the same but different face value.
     */
     dice.twoPairPoints=function() {
        dice.frequency();
        let num=0;
        let pairs=0;
        for (let i=0;i<dice.frequencyArr.length;i++){
            if (dice.frequencyArr[i]>1&&dice.frequencyArr[i]<4){
                num+=(i+1)*2;
                pairs++;
            }
        }
        if (pairs!=2){
            num=0;
        }
        return num;
    }

    /**
     * Return points for 3 of a kind.<br/>
     * Return 0, if there aren't 3 dice with the same face value.
     */
     dice.threeSamePoints=function() {
        dice.frequency();
        let num=0;
        for (let i=1;i<dice.frequencyArr.length;i++){
            if (dice.frequencyArr[i] >= 3){
                num=(i+1)*3;
            }
        }
        return num;
    }
    

    /**
     * Return points for 4 of a kind.<br/>
     * Return 0, if there aren't 4 dice with the same face value.
     */
     dice.fourSamePoints=function() {
        dice.frequency();
        let num=0;
        for (let i=1;i<dice.frequencyArr.length;i++){
            if (dice.frequencyArr[i] >= 4){
                num=(i+1)*4;
            }
        }
        return num;
    }
   

    /**
     * Return points for full house.<br/>
     * Return 0, if there aren't 3 dice with the same face value<br/>
     * and 2 other dice with the same but different face value.
     */
 dice.fullHousePoints=function() {
        dice.frequency();
        let threeDice = 0;
        let twoDice = 0;
        let num = 0;
        for (let i = 0; i < dice.frequencyArr.length; i++) {
            if (dice.frequencyArr[i] == 3) {
                threeDice = i+1;
            } else if (dice.frequencyArr[i] == 2) {
                twoDice = i+1;
            }
        }
        if (threeDice > 0 && twoDice > 0) {
            num = threeDice * 3 + twoDice * 2;
        }
        return num;
    }
 

    /**
     * Return points for small straight.<br/>
     * Return 0, if the dice aren't showing 1,2,3,4,5.
     */
 dice.smallStraightPoints=function() {
        dice.frequency();
        let num=0;
        for (let i=0;i<dice.frequencyArr.length-1;i++){
            if (dice.frequencyArr[i]==1){
                num++;
            }
        }
        if (num==5){
            num=15;
        }else {
            num=0;
        }

        return num;
    }

    
    /**
     * Return points for large straight.<br/>
     * Return 0, if the dice aren't showing 2,3,4,5,6.
     */
     dice.largeStraightPoints=function() {
        dice.frequency();
        let num=0;
        for (let i=1;i<dice.frequencyArr.length;i++){
            if (dice.frequencyArr[i]==1){
                num++;
            }
        }
        if (num==5){
            num=20;
        }else {
            num=0;
        }

        return num;
    }

    
    /**
     * Return points for chance (the sum of face values).
     */
     dice.chancePoints=function() {
        let num=0;
        for (const value of dice.values) {
            num+=value
        }
        return num;
    }


    /**
     * Return points for yatzy (50 points).<br/>
     * Return 0, if there aren't 5 dice with the same face value.
     */
     dice.yatzyPoints=function() {
        dice.frequency();
        let num=0;
        for (let i=1;i<this.frequencyArr.length;i++){
            if (this.frequencyArr[i] === 5){
                num = 50;
            }
        }
        return num;
    }
    

dice.resetHoldStatus = function() {
    dice.holdStatus = [false,false,false,false,false];
}
    

    return dice
     }
// Yatzy GUI Logik

// Yatzy Game Manager / Scorings Logik

// sætter spillet op 
restart()
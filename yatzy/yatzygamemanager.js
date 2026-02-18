let die = createDice()

die.throwDice()
console.log(die.values);
console.log(die.chancePoints);
console.log(die.frequency);
  console.log(hello);
  
  
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
    function resetThrowCount() {
        throwCount = 0;
        resetHoldStatus;
    }

    dice.resetThrowCount()
    /**
     * Roll the 5 dice. Only roll dice that are not hold.<br/>
     * Note: holdStatus[i] is true, if die number i is hold (for i in [0..4]).
     */
    function throwDice() {
        throwCount++;
        for (let i =0;i<values.length;i++){
            if (!holdStatus[i]) {
                values[i] = Math.round(Math.random()*5)+1;
            }
        }
    }

    dice.threeDice()
    // -------------------------------------------------------------------------

    /**
     * Return all results possible with the current face values.<br/>
     * The order of the results is the same as on the score board.<br/>
     * Note: This is an optional method. Comment this method out,<br/>
     * if you don't use it.
     */
    function getResults() {
        let results = []
        for (let i = 0; i <= 5; i++) {
            results[i] = this.sameValuePoints(i+1);
        }
        results[6] = this.onePairPoints();
        results[7] = this.twoPairPoints();
        results[8] = this.threeSamePoints();
        results[9] = this.fourSamePoints();
        results[10] = this.fullHousePoints();
        results[11] = this.smallStraightPoints();
        results[12] = this.largeStraightPoints();
        results[13] = this.chancePoints();
        results[14] = this.yatzyPoints();

        return results;
    }
    dice.getResults()

    // -------------------------------------------------------------------------

    // Return an int[7] containing the frequency of face values.
    // Frequency at index v is the number of dice with the face value v, 1 <= v <= 6.
    // Index 0 is not used.
    // Note: This method can be used in several of the following methods.

   
        
    
    function frequency() {
        frequencyArr=[0,0,0,0,0,0]
        for (const value in values) {
            frequencyArr[value]+=1;
        }
        return frequencyArr
    }
    dice.frequency()

    /**
     * Return same-value points for the given face value.<br/>
     * Returns 0, if no dice has the given face value.<br/>
     * Pre: 1 <= value <= 6.
     */
    function sameValuePoints(value) {
        frequency() ;
        return frequency[value]*value;
    }
dice.sameValuePoints()
    /**
     * Return points for one pair (for the face value giving the highest points).<br/>
     * Return 0, if there aren't 2 dice with the same face value.
     */
    function onePairPoints() {
        let num=0;
        frequency();
        for (let i=1;i<frequency.length;i++){
        if (frequency[i]>=2){
            num=i*2;
        }
        }
        return num;
    }
dice.onePairPoints()

    /**
     * Return points for two pairs<br/>
     * (for the 2 face values giving the highest points).<br/>
     * Return 0, if there aren't 2 dice with the same face value<br/>
     * and 2 other dice with the same but different face value.
     */
    function twoPairPoints() {
        frequency();
        let num=0;
        let pairs=0;
        for (let i=0;i<frequency.length;i++){
            if (frequency[i]>1&&frequency[i]<4){
                num+=i*2;
                pairs++;
            }
        }
        if (pairs!=2){
            num=0;
        }
        return num;
    }
dice.twoPairPoints()
    /**
     * Return points for 3 of a kind.<br/>
     * Return 0, if there aren't 3 dice with the same face value.
     */
    function threeSamePoints() {
        frequency();
        let num=0;
        for (let i=1;i<frequency.length;i++){
            if (frequency[i] >= 3){
                num=i*3;
            }
        }
        return num;
    }
    dice.threeSamePoints()

    /**
     * Return points for 4 of a kind.<br/>
     * Return 0, if there aren't 4 dice with the same face value.
     */
    function fourSamePoints() {
        frequency();
        let num=0;
        for (let i=1;i<frequency.length;i++){
            if (frequency[i] >= 4){
                num=i*4;
            }
        }
        return num;
    }
    dice.fourSamePoints()

    /**
     * Return points for full house.<br/>
     * Return 0, if there aren't 3 dice with the same face value<br/>
     * and 2 other dice with the same but different face value.
     */
function fullHousePoints() {
        // TODO
        frequency();
        let threeDice = 0;
        let twoDice = 0;
        let num = 0;
        for (let i = 0; i < frequency.length; i++) {
            if (frequency[i] == 3) {
                threeDice = i;
            } else if (frequency[i] == 2) {
                twoDice = i;
            }
        }
        if (threeDice > 0 && twoDice > 0) {
            num = threeDice * 3 + twoDice * 2;
        }
        return num;
    }
    dice.fullHousePoints()

    /**
     * Return points for small straight.<br/>
     * Return 0, if the dice aren't showing 1,2,3,4,5.
     */
function smallStraightPoints() {
        frequency();
        let num=0;
        for (let i=1;i<frequency.length-1;i++){
            if (frequency[i]==1){
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

    dice.smallStraightPoints()
    /**
     * Return points for large straight.<br/>
     * Return 0, if the dice aren't showing 2,3,4,5,6.
     */
    function largeStraightPoints() {
        frequency();
        let num=0;
        for (let i=2;i<frequency.length;i++){
            if (frequency[i]==1){
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

    dice.largeStraightPoints()
    /**
     * Return points for chance (the sum of face values).
     */
    function chancePoints() {
        let num=0;
        for (const value of values) {
            num+=value
        }
        return num;
    }

    dice.chancePoints()
    /**
     * Return points for yatzy (50 points).<br/>
     * Return 0, if there aren't 5 dice with the same face value.
     */
    function yatzyPoints() {
        frequency();
        let num=0;
        for (let i=1;i<frequency.length;i++){
            if (frequency[i] == 5){
                num = 50;
            }
        }
        return num;
    }
    dice.yatzyPoints()

    function resetHoldStatus(){

holdStatus=[false,false,false,false,false]
return holdStatus

    }
    dice.resetHoldStatus()


    return dice
     }









// Yatzy GUI Logik

// Yatzy Game Manager / Scorings Logik
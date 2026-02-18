let die = createDice()

die.throwDice()
console.log(die.values);
console.log(die.chancePoints());
console.log(die.frequency());
console.log(die.largeStraightPoints());
  


  
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


    dice.frequency = [0,0,0,0,0,0];

    

    /**
     * Reset the throw count.
     */
     // to do
    dice.resetThrowCount = function() {
        throwCount = 0;
        resetHoldStatus;
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
        frequencyArr=[0,0,0,0,0,0]
        for (const value in dice.values) {
            frequencyArr[value]+=1;
        }
        return frequencyArr
    }
    

    /**
     * Return same-value points for the given face value.<br/>
     * Returns 0, if no dice has the given face value.<br/>
     * Pre: 1 <= value <= 6.
     */
     dice.sameValuepoint=function(value) {
        dice.frequency() ;
        return frequency[value]*value;
    }

    /**
     * Return points for one pair (for the face value giving the highest points).<br/>
     * Return 0, if there aren't 2 dice with the same face value.
     */
     dice.onePairPoints=function() {
        let num=0;
        dice.frequency();
        for (let i=1;i<dice.frequency.length;i++){
        if (frequency[i]>=2){
            num=i*2;
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
        frequency();
        let num=0;
        let pairs=0;
        for (let i=0;i<dice.frequency.length;i++){
            if (dice.frequency[i]>1&&dice.frequency[i]<4){
                num+=i*2;
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
        frequency();
        let num=0;
        for (let i=1;i<dice.frequency.length;i++){
            if (dice.frequency[i] >= 3){
                num=i*3;
            }
        }
        return num;
    }
    

    /**
     * Return points for 4 of a kind.<br/>
     * Return 0, if there aren't 4 dice with the same face value.
     */
     dice.fourSamePoints=function() {
        frequency();
        let num=0;
        for (let i=1;i<dice.frequency.length;i++){
            if (dice.frequency[i] >= 4){
                num=i*4;
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
        // TODO
        frequency();
        let threeDice = 0;
        let twoDice = 0;
        let num = 0;
        for (let i = 0; i < dice.frequency.length; i++) {
            if (dice.frequency[i] == 3) {
                threeDice = i;
            } else if (dice.frequency[i] == 2) {
                twoDice = i;
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
        frequency();
        let num=0;
        for (let i=1;i<dice.frequency.length-1;i++){
            if (dice.frequency[i]==1){
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
        for (let i=2;i<dice.frequency.length;i++){
            if (dice.frequency[i]==1){
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
        for (let i=1;i<frequency.length;i++){
            if (frequency[i] == 5){
                num = 50;
            }
        }
        return num;
    }
    

     dice.resetHoldStatus=function(){

dice.holdStatus=[false,false,false,false,false]
return holdStatus

    }
    

    return dice
     }









// Yatzy GUI Logik

// Yatzy Game Manager / Scorings Logik
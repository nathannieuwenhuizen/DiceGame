//When the winddow is loaded.
window.addEventListener("load",function(){
    
    //Declares the variables needed for the game.
    var diceA,diceB,turns,lives,canRoll;
    
    //Declares the dices, cups, button and div ellements.
    var dice = document.getElementById("dice");
    var dice2 = document.getElementById("dice2");
    var cup = document.getElementById("cup");
    
    var rollButton = document.getElementById("spawnButton");
    
    var resultText = document.getElementById("resultText");
    var statusText = document.getElementById("statusText");
    var buttonText = document.getElementById("buttonText");
    
    //Declares numberoperations for the calculations.
    var numberOperations = new NumberOperations();
    
    //prevents selecting the text.
    document.onselectstart = new Function("return false");
    
    //Restarts the game.
    ResetGame();
    
    //button click event for the rollbutton.
    rollButton.addEventListener("click", function(e){
        //if there are no lives, it resets the game. Else it rolls the dice.
        if(lives == 0)
            ResetGame();
        else
            RollDice();
    }, false);
    //Same click event for the cup. Doesn't reset though.
    cup.addEventListener("click", function(e){
        if(lives != 0)
            RollDice();
    }, false);
    
    //The reset game restarts the variables making it possible to play the game.
    function ResetGame()
    {
        canRoll = true;
        turns = 0;
        lives = 5;
        buttonText.innerHTML = "Roll!";
        UpdateText("Try to roll the dices with the same number of each other");
    }
    
    //The rolldice function called from the button and cup click events.
    function RollDice()
    {
        //if canroll is true.
        if(canRoll){
            
            //canroll is false preventing spamming the button.
            canRoll = false;
            
            //turns is added.
            turns++;
            
            //Status text gets updated.
            UpdateText(resultText.innerHTML);
            
            //DiceA and DiceB get random values between 1 and 6.
            diceA = numberOperations.GetRandomNumberInRange(1,6);
            diceB = numberOperations.GetRandomNumberInRange(1,6);
            
            //CSS animation updates.
            AnimationUpdate();
            
            //After 1.5 seconds, the values will be checked.
            setTimeout(function () {CheckingTheDicesValue();},1500);
        }
    }
    //The AnimationUpdate declares the animation of the cup and dices empty and declares it again making it reset.
    function AnimationUpdate()
    {
        //The animation is declared empty
        cup.style.animation=dice.style.animation =dice2.style.animation ='';
        
        //after 0.01 second the animation is declared with the dices animation declared to the appropiate spinning animation.
        setTimeout(function () {
            cup.style.animation='cupShake 0.1s forwards 4 alternate';
            
             dice.style.animation = 'spinTo'+diceA+' 2s forwards 1 0s normal, diceMove 2s forwards 2 alternate';
            dice2.style.animation =  'spinTo'+diceB+' 2s forwards 1 0s normal, diceMove2 2s forwards 2 alternate';
        },10);
    }
    
    //This function checks the values of the dices.
    function CheckingTheDicesValue()
    {
        //canRoll is declared true making it you can roll again.
        canRoll = true;
        
        //if the dice values are the same.
        if(diceA == diceB)
        {
            //lives goes up.
            lives++;
            
            //Text gets updated.
            UpdateText("You got "+diceA+" and "+diceB+"! Life up!");
        }
        
        //if the dices are different.
        else
        {
            //lives goes down.
            lives--;
            UpdateText("You rolled a "+diceA+" and "+diceB+" and are not the same...");
            
            //if there are no lives left.
            if(lives == 0)
            {
                //Text gets updated.
                UpdateText("You lost. You lasted for "+turns+" turns.");
                //Button text is changed to restart.
                buttonText.innerHTML = "restart";
            }
        }
    }
    //The update text handles the result and status text to show the right message.
    function UpdateText(result)
    {
        //resultText gets the parameter value.
        resultText.innerHTML = result;
        
        //statusText updates with the right variables.
        statusText.innerHTML = "Turns: "+turns+" | Lives: "+lives;
    }
})
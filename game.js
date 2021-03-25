var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});
function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    soundon(randomChosenColour);
}

$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    soundon(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function soundon(ide){
    var audio = new Audio("sounds/" + ide + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        setTimeout(nextSequence(),1000);
    }
    else
    {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        soundon("wrong");
        userClickedPattern=[];
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    startOver();
    }
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}

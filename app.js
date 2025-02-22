// DOM elements acesss
const userScore = document.getElementById("user-score");
const compScore = document.getElementById("comp-score");
const msg = document.getElementById("msg");
const reset = document.querySelector(".reset");
const choices = document.querySelectorAll(".choice");
const heading = document.querySelector("#h");

// Scores  initialize 
let userScoreValue = 0;
let compScoreValue = 0;

// Har choice par event listener add 
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        // game over , no action
        if (userScoreValue === 3 || compScoreValue === 3) {
            return; // Game over, no action
        }

        // fun call
        const userChoice = choice.id; // User ki choice 
        const compChoice = getComputerChoice(); // Computer  choice generate 
        const result = determineWinner(userChoice, compChoice); // who win
        updateScores(result); // Result  se scores update 
        displayMessage(userChoice, compChoice, result); // Choices aur result 
    });
});

// Reset button par event listener add karna
reset.addEventListener("click", resetGame);

// Computer choice genrator
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)]; // Random choice select karna
}

// Winner find  function
function determineWinner(userChoice, compChoice) {
    if (userChoice === compChoice) return "It's a draw!"; // Draw check karna
    if (
        (userChoice === "rock" && compChoice === "scissors") ||
        (userChoice === "paper" && compChoice === "rock") ||
        (userChoice === "scissors" && compChoice === "paper")
    ) {
        return "You win!"; // User win
    }
    return "Computer wins!"; // Computer win
}

// update score
function updateScores(result) {
    if (result === "You win!") {
        userScoreValue++; // User ka score increase
        userScore.textContent = userScoreValue; // User score display update karna
    } else if (result === "Computer wins!") {
        compScoreValue++; // Computer score increase
        compScore.textContent = compScoreValue; // Computer score display update karna
    }

    // max score 3-> Game auto reset 
    if (userScoreValue === 3 || compScoreValue === 3) {
        msg.innerHTML = userScoreValue === 3 ? "Congratulations! You reached 3 points!" : "Computer reached 3 points..! ";
        heading.innerHTML = "Game is being reset!";
        heading.style.color = "red";
        setTimeout(resetGame, 3000); // 3 seconds baad game reset karna
    }
}


// on src msg / choices
function displayMessage(userChoice, compChoice, result) {
    msg.textContent = `You chose ${userChoice}, Computer chose ${compChoice}. ${result}`; // Choices aur result 
}

// Game reset  function
function resetGame() {
    userScoreValue = 0; // User  score reset 
    compScoreValue = 0; // Computer  score reset
    userScore.textContent = userScoreValue; // User score display update
    compScore.textContent = compScoreValue; // Computer score display update 
    msg.textContent = "Play your move ..!"; // Reset message 
    heading.innerHTML = "Rock Paper Scissors"; // Heading ko reset 
    heading.style.color = ""; // Heading color ko reset 

}
document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector(".contain"),
        userResult = document.querySelector(".user_result img"),
        cpuResult = document.querySelector(".cpu_result img"),
        result = document.querySelector(".result"),
        optionImages = document.querySelectorAll(".option_image"),
        playerScoreEl = document.getElementById("player-score"),
        cpuScoreEl = document.getElementById("cpu-score"),
        rulesBtn = document.getElementById("rules-btn"),
        rulesModal = document.getElementById("rules-modal"),
        closeRulesBtn = document.querySelector(".close-btn"),
        gameResultModal = document.getElementById("game-result-modal"),
        gameResultText = document.getElementById("game-result-text"),
        resetBtn = document.getElementById("reset-btn");

    let playerScore = 0;
    let cpuScore = 0;
    let isGameInProgress = false;

    rulesBtn.addEventListener('click', () => {
        rulesModal.style.display = 'flex';
    });

    closeRulesBtn.addEventListener('click', () => {
        rulesModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === rulesModal) {
            rulesModal.style.display = 'none';
        }
        if (e.target === gameResultModal) {
            gameResultModal.style.display = 'none';
        }
    });

    function resetGame() {
        playerScore = 0;
        cpuScore = 0;
        isGameInProgress = false;
        playerScoreEl.textContent = '0';
        cpuScoreEl.textContent = '0';
        userResult.src = "./img/rock.png";
        cpuResult.src = "./img/rock.png";
        result.textContent = "Let's Play!!";
        gameResultModal.style.display = 'none';
        optionImages.forEach(img => {
            img.classList.remove("active");
            img.style.pointerEvents = 'auto'; 
        });
    }

    resetBtn.addEventListener('click', resetGame);

    optionImages.forEach((image, index) => {
        image.addEventListener("click", (e) => {
            if (isGameInProgress || playerScore === 5 || cpuScore === 5) {
                return;
            }

            isGameInProgress = true;
            optionImages.forEach(img => {
                img.style.pointerEvents = 'none';
            });

            optionImages.forEach(img => img.classList.remove("active"));
            image.classList.add("active");

            userResult.src = "./img/rock.png";
            cpuResult.src = "./img/rock.png";
            result.textContent = "Wait...";

            gameContainer.classList.add("start");

            let gameTimeout = setTimeout(() => {
                gameContainer.classList.remove("start");

                let userChoice = image.dataset.choice;
                let imageSrc = e.target.querySelector("img").src;
                userResult.src = imageSrc;

                const choices = ["rock", "paper", "scissors"];
                let randomNumber = Math.floor(Math.random() * 3);
                let cpuChoice = choices[randomNumber];
                let cpuImageSrc = `./img/${cpuChoice}.png`;
                cpuResult.src = cpuImageSrc;

                let gameOutcome = determineWinner(userChoice, cpuChoice);

                if (gameOutcome === "User") {
                    playerScore++;
                    playerScoreEl.textContent = playerScore;
                    result.textContent = "You Won!!";
                } else if (gameOutcome === "Cpu") {
                    cpuScore++;
                    cpuScoreEl.textContent = cpuScore;
                    result.textContent = "Computer Won!!";
                } else {
                    result.textContent = "Match Draw";
                }

                isGameInProgress = false;
                optionImages.forEach(img => {
                    img.style.pointerEvents = 'auto';
                });

                if (playerScore === 5 || cpuScore === 5) {
                    endGame();
                }

            }, 2500);
        });
    });

    function determineWinner(userChoice, cpuChoice) {
        if (userChoice === cpuChoice) return "Draw";

        const winConditions = {
            rock: "scissors",
            paper: "rock",
            scissors: "paper"
        };

        return winConditions[userChoice] === cpuChoice ? "User" : "Cpu";
    }

    function endGame() {
        gameResultText.textContent = playerScore === 5 
            ? "Congratulations! You Won the Game!" 
            : "Computer Won the Game. Try Again!";
        gameResultModal.style.display = 'flex';
        
        optionImages.forEach(img => {
            img.style.pointerEvents = 'none';
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const word = "woosha"; // Example word, replace this with your dynamic word logic
    const maxAttempts = 6; // The number of attempts allowed

    const grid = document.getElementById("grid");
    const message = document.getElementById("message");

    // Dynamically create the grid based on the word length
    const wordLength = word.length;
    grid.innerHTML = ""; // Clear previous grid if any

    // Create the grid rows based on the max attempts
    for (let i = 0; i < maxAttempts; i++) {
        const row = document.createElement("div");
        row.classList.add("grid-row");
        row.id = `row-${i}`;

        // Create cells based on the word length
        for (let j = 0; j < wordLength; j++) {
            const cell = document.createElement("input");
            cell.classList.add("grid-cell");
            cell.setAttribute("maxlength", "1");
            cell.id = `cell-${i}-${j}`;
            row.appendChild(cell);
        }

        grid.appendChild(row);
    }

    // Logic for keyboard input and checking the word
    let currentRow = 0;
    let currentCol = 0;
    const correctWord = word.toUpperCase(); // Convert the word to uppercase for consistency

    document.addEventListener("keydown", function (e) {
        const key = e.key.toUpperCase();

        if (key === "BACKSPACE" && currentCol > 0) {
            // Move the cursor back to previous cell if backspace is pressed
            currentCol--;
            document.getElementById(`cell-${currentRow}-${currentCol}`).focus();
            document.getElementById(`cell-${currentRow}-${currentCol}`).value = "";
        }

        if (key.length === 1 && /[A-Z]/.test(key) && currentCol < wordLength) {
            // Only accept alphabetic input and within the grid width
            document.getElementById(`cell-${currentRow}-${currentCol}`).value = key;
            currentCol++;

            // Move the focus to the next cell
            if (currentCol < wordLength) {
                document.getElementById(`cell-${currentRow}-${currentCol}`).focus();
            }

            // If the row is complete, check the word
            if (currentCol === wordLength) {
                checkWord();
            }
        }
    });

    function checkWord() {
        let guess = "";
        for (let i = 0; i < wordLength; i++) {
            guess += document.getElementById(`cell-${currentRow}-${i}`).value;
        }

        guess = guess.toUpperCase(); // Convert the guess to uppercase

        if (guess === correctWord) {
            message.textContent = "Correct!";
            message.style.color = "green";
        } else {
            message.textContent = `Incorrect. Try again!`;
            message.style.color = "red";
        }

        // Move to the next row after checking
        currentRow++;
        currentCol = 0;

        if (currentRow === maxAttempts) {
            message.textContent = `Game Over! The word was: ${correctWord}`;
        }
    }
});













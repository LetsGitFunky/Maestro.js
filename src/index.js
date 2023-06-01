import './styles/main.scss';
import { attachEventListeners } from './scripts/events.js';
import { Game } from "./scripts/game.js";
import * as Tone from 'tone';

let game;  // Variable to hold the current game

document.addEventListener("DOMContentLoaded", () => {
    game = new Game();
    attachEventListeners(game);  // Attach the event listeners to the page elements

    const newGameButton = document.getElementById('new-game');
    newGameButton.addEventListener('click', async () => {
        if (game.isPracticeMode === true) {
            game.isPracticeMode === false;
        }
        game.startNewGame();
    });

    // const practiceModeButton = document.getElementById('practice-mode');
    // practiceModeButton.addEventListener('click', () => {
    //     game.togglePracticeMode();
    // });

    const earTrainingModeButton = document.getElementById('ear-training');
    earTrainingModeButton.addEventListener('click', () => {
        game.toggleEarTrainingMode();
    });

    const viewDiagramButton = document.getElementById("viewDiagramButton");
    const keyboard = document.getElementsByClassName("keyboard")[0];
    viewDiagramButton.addEventListener("click", (e) => {
        let keyboardStyle = window.getComputedStyle(keyboard).visibility;
        if (keyboardStyle === "hidden") {
            keyboard.style.visibility = "visible";
            viewDiagramButton.innerText = "Hide Keys";
        } else {
            keyboard.style.visibility = "hidden";
            viewDiagramButton.innerText = "Show Keys"
        }
    });

    const consoleError = console.error; // keep a reference to the original console.error function

console.error = function(message) {
    console.log(message)
    if (message.indexOf('') > -1) {
        // If the error message contains 'your specific error', don't log it
        return;
    }

    // Otherwise, log it as usual
    consoleError.apply(console, arguments);
};

});

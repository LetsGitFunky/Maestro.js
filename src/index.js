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
        game.startNewGame();
    });

    const practiceModeButton = document.getElementById('practice-mode');

    practiceModeButton.addEventListener('click', () => {
        game.togglePracticeMode();
    });

    const earTrainingModeButton = document.getElementById('ear-training');

    earTrainingModeButton.addEventListener('click', () => {
        game.toggleEarTrainingMode();
    });

});

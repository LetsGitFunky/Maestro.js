import './styles/main.scss';
import { attachEventListeners } from './scripts/events.js';
import { Game } from "./scripts/game.js";
import * as Tone from 'tone';

let game;  // Variable to hold the current game

document.addEventListener("DOMContentLoaded", () => {
    const newGameButton = document.getElementById('new-game');

    // let game

    newGameButton.addEventListener('click', async () => {
        game = new Game();
        console.log(game)
        attachEventListeners(game);  // Attach the event listeners to the page elements
    });
    // if (game === undefined) {
    //     attachEventListeners(undefined);  // Attach the event listeners to the page elements
    // }
});

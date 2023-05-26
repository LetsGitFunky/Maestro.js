// import './styles/main.scss';
// import { userPlaysNotes } from './scripts/events.js';
// import { Game } from "./scripts/game.js"

// document.addEventListener("DOMContentLoaded", () => {
//     let body = document.querySelector('body');
//     userPlaysNotes() // from events.js

//     const newGameButton = document.getElementById('new-game');



//     // let game = new Game();
//     // game.startNewGame();

//     userPlaysNotes((note) => game.handleNotePlayed(note))

// });

import './styles/main.scss';
import { attachEventListeners } from './scripts/events.js';
import { Game } from "./scripts/game.js";
import * as Tone from 'tone';

document.addEventListener("DOMContentLoaded", () => {
    let body = document.querySelector('body');

    let game;

    const newGameButton = document.getElementById('new-game');

    newGameButton.addEventListener('click', async () => {
        // await Tone.start();
        game = new Game();
        attachEventListeners(game);
    });

    attachEventListeners(); // default to practice mode

});

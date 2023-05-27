import { playMelody, playNote, playTriumphSound } from './sound.js';

const melodies = [
    ["C4", "E4", "D4", "F4", "E4", "D4", "C4"],
    ["C4", "G4", "A4", "G4", "E4", "F4", "D4", "E4", "C4"],
    ["C4", "C5", "B4", "G4", "A4", "B4", "C5"]
];

export class Game {
    constructor() {
        this.currentMelody = ["C4", "D4"]; //test melody for youWin logic
        // this.currentMelody = [];
        this.userMelody = [];
        this.userMelodyTemp = [];
        this.isPlaying = false;
        this.startNewGame();
    }

    startNewGame() {
        // let randomIndex = Math.floor(Math.random() * melodies.length); // comment out for youWin testing
        // this.currentMelody = melodies[randomIndex]; // comment out for youWin testing
        this.userMelody = [];
        setTimeout(() => this.playCurrentMelody(), 500);
    }

    playCurrentMelody() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            const melodySlice = this.currentMelody.slice(0, this.userMelody.length + 1);
            playMelody(melodySlice).then(() => {
                this.isPlaying = false;
            });
        }
    }

    handleNotePlayed(note) {
        if (this.isPlaying) return;

        this.userMelodyTemp.push(note);
        let userMelodyString = this.userMelodyTemp.join("");
        let currentMelodyString = this.currentMelody.slice(0, this.userMelodyTemp.length).join("");

        if (userMelodyString === currentMelodyString) {

            if (this.userMelodyTemp.length === this.userMelody.length + 1) {
                // The user successfully entered the sequence, move to the next round
                this.userMelody = [...this.userMelodyTemp];
                this.userMelodyTemp = []; // Reset temporary melody

                // Check if the user has won the game
                if (this.userMelody.length === this.currentMelody.length) {
                    this.youWin();
                } else {
                    setTimeout(() => this.playCurrentMelody(), 500);
                }
            }
        } else {
            // The user made a mistake, reset the round
            this.userMelodyTemp = [];
            setTimeout(() => this.playCurrentMelody(), 500);
        }
    }

    youWin() {
        // Add a delay of 500ms before playing the triumphant sound
        setTimeout(() => {
            playTriumphSound();
        }, 750);

        // Get the message element
        const messageElement = document.getElementById('message');

        // Set the message text
        // messageElement.textContent = "Congratulations, you've completed the melody! Click here to start a new game.";
        messageElement.innerHTML = "Congratulations, you've completed the melody!<br>Click here to start a new game.";


        // Add the show class to start the animation
        messageElement.classList.add('show');

        // Add an event listener to the message element that will start a new game when the message is clicked
        messageElement.addEventListener('click', () => {
            messageElement.classList.remove('show');
            this.startNewGame();
        }, { once: true }); // The { once: true } option ensures the listener is only called once
    }

}

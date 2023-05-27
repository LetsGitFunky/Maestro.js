import { playMelody, playNote, playTriumphSound } from './sound.js';

const melodies = [
    ["C4", "E4", "D4", "F4", "E4", "D4", "C4"],
    ["C4", "G4", "A4", "G4", "E4", "F4", "D4", "E4", "C4"],
    ["C4", "C5", "B4", "G4", "A4", "B4", "C5"]
];

export class Game {
    constructor() {
        this.currentMelody = [];
        this.userMelody = [];
        this.userMelodyTemp = [];
        this.isPlaying = false;
        this.startNewGame();
    }

    startNewGame() {
        let randomIndex = Math.floor(Math.random() * melodies.length);
        this.currentMelody = melodies[randomIndex];
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
        // Play a sound of triumph
        playTriumphSound();

        // Get the message element
        const messageElement = document.getElementById('message');

        // Set the message text
        messageElement.textContent = "Congratulations, you've completed the melody!";

        // Add the show class to start the animation
        messageElement.classList.add('show');

        // Assuming your triumphant sound or the animation lasts for 2 seconds
        setTimeout(() => {
            // Remove the show class after the sound has played or animation has finished
            messageElement.classList.remove('show');
        }, 2000); // adjust this as per your triumphant sound or animation duration
    }
}

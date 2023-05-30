import { playMelody, playNote, playTriumphSound } from './sound.js';

const melodies = [
    ["C4", "D4"],
    // ["C4", "E4", "D4", "F4", "E4", "D4", "C4"],
    // ["C4", "G4", "A4", "G4", "E4", "F4", "D4", "E4", "C4"],
    // ["C4", "C5", "B4", "G4", "A4", "B4", "C5"],
    // ["C4", "Eb4", "F4", "C4", "Eb4", "Gb4", "F4", "C4", "Eb4", "F4", "Eb4", "C4"],
    // ["C5", "C5", "Bb4", "C5", "G4", "Gb4", "F4", "C4", "Eb4", "C4"]

];

export class Game {
    constructor() {
        // this.currentMelody = ["C4", "D4"]; //test melody for youWin logic
        this.currentMelody = [];
        this.userMelody = [];
        this.userMelodyTemp = [];
        this.isPlaying = false;
        this.isPracticeMode = true;
        this.earTrainingMode = false;
        // this.startNewGame();
    }

    toggleEarTrainingMode() {
        this.isEarTrainingMode = !this.isEarTrainingMode;
    }


    togglePracticeMode() {
        this.isPracticeMode = !this.isPracticeMode;
    }

    startNewGame() {
        let randomIndex = Math.floor(Math.random() * melodies.length); // comment out for youWin testingasdg
        this.currentMelody = melodies[randomIndex]; // comment out for youWin testing
        this.hideMessage();
        this.userMelody = [];
        this.userMelodyTemp = [];
        this.isPracticeMode = false;
        setTimeout(() => this.playCurrentMelody(), 500);
    }

    playCurrentMelody() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            const melodySlice = this.currentMelody.slice(0, this.userMelody.length + 1);
            playMelody(melodySlice, this).then(() => {
                this.isPlaying = false;
            });
        }
    }

    handleNotePlayed(note) {
        if (this.isPlaying) return;

        if (this.isPracticeMode) {
            playNote(note);
        } else {

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
    }

    youWin() {
        // Add a delay before playing the triumphant sound
        setTimeout(() => {
            playTriumphSound();
        }, 750);

        // reset values
        this.currentMelody = [];
        this.userMelody = [];
        this.userMelodyTemp = [];

        // Get the message element
        const messageElement = document.getElementById('message');

        // Set the message text
        messageElement.innerHTML = "Congratulations, you have completed the melody! <br> Encore!";

        // Add the show class to start the animation
        messageElement.classList.add('show');

    }

    // helper function so that victory message persists until start of next game.
    hideMessage() {
        const messageElement = document.getElementById('message');
        messageElement.classList.remove('show');
    }


}

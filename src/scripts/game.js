import * as Tone from "tone"
import { Player } from 'tone';
import { playMelody, playNote, playTriumphSound } from './sound.js';

// let randomIndex = 0;

const melodies = [
    ["C4", "D4"],
    ["C4", "E4", "D4", "F4", "E4", "D4", "C4"],
    ["C4", "G4", "A4", "G4", "E4", "F4", "D4", "E4", "C4"],
    ["C4", "C5", "B4", "G4", "A4", "B4", "C5"],
    ["C4", "Eb4", "F4", "C4", "Eb4", "Gb4", "F4", "C4", "Eb4", "F4", "Eb4", "C4"],
    ["C5", "C5", "Bb4", "C5", "G4", "Gb4", "F4", "C4", "Eb4", "C4"],
    ["C4", "G4", "G4", "F4", "G4", "F4", "Eb4", "F4", "F4", "Eb4", "C4", "Eb4"],
    ["C4", "A4", "Bb4", "C4", "C5", "Bb4", "A4", "Bb4"],
    ["C4", "Eb4", "Eb4", "F4", "F4", "Ab4", "G4", "Ab4", "G4", "Ab4", "Eb4", "Eb4", "F4", "F4"],
    ["A4", "A4", "C5", "A4", "G4", "F4", "E4"],
    ["C4", "D4", "Eb", "F4", "G4", "Eb4", "G4", "Gb4", "D4", "Gb4", "F4", "Db4", "F4"],
    ["C4", "D4", "E4", "G4", "A4", "C5"],
];

// const songList = [
//     "testMelody",
//     "testMelody2",
//     "testMelody3",
//     "Somewhere Over The Rainbow",
//     "Smoke on the Water",
//     "Sunshine of Your Love",
//     "Next Episode",
//     "We Want The Funk",
//     "Iron Man",
//     "Seven Nation Army"
// ];

// let songs = {
//     "testMelody": ["C4", "D4"],
//     "testMelody2": ["C4", "E4", "D4", "F4", "E4", "D4", "C4"],
//     "testMelody3": ["C4", "G4", "A4", "G4", "E4", "F4", "D4", "E4", "C4"],
//     "somewhereOverTheRainbow": ["C4", "C5", "B4", "G4", "A4", "B4", "C5"],
//     "smokeontheWater": ["C4", "Eb4", "F4", "C4", "Eb4", "Gb4", "F4", "C4", "Eb4", "F4", "Eb4", "C4"],
//     "sunshineofYourLove": ["C5", "C5", "Bb4", "C5", "G4", "Gb4", "F4", "C4", "Eb4", "C4"],
//     "nextEpisode": ["C4", "G4", "G4", "F4", "G4", "F4", "Eb4", "F4", "F4", "Eb4", "C4", "Eb4"],
//     "weWantTheFunk": ["C4", "A4", "Bb4", "C4", "C5", "Bb4", "A4", "Bb4"],
//     "ironMan": ["C4", "Eb4", "Eb4", "F4", "F4", "Ab4", "G4", "Ab4", "G4", "Ab4", "Eb4", "Eb4", "F4", "F4"],
//     "sevenNationArmy": ["A4", "A4", "C5", "A4", "G4", "F4", "E4"],
//     "grieg": ["C4", "D4", "Eb", "F4", "G4", "Eb4", "G4", "Gb4", "D4", "Gb4", "F4", "Db4", "F4"],
// };

export class Game {
    constructor() {
        // this.currentMelody = ["C4", "D4"]; //test melody for youWin logic
        this.currentMelody = [];
        this.userMelody = [];
        this.userMelodyTemp = [];
        this.isPlaying = false;
        this.isPracticeMode = true;
        this.earTrainingMode = false;
    }

    toggleEarTrainingMode() {
        this.isEarTrainingMode = !this.isEarTrainingMode;
    }


    // if (itemContainer.style.display === 'flex') {
    //     itemContainer.style.display = 'none';
    // } else {
    //     itemContainer.style.display = 'flex';
    // };

    togglePracticeMode() {
        // if (this.isPracticeMode === true) {
        //     this.isPracticeMode === false
        // } else {
        //     this.isPracticeMode === true;
        // }
        this.isPracticeMode = !this.isPracticeMode;
        this.hideMessage();
    }

    updateNoteCount() {
        const noteCountElement = document.getElementById('note-count');
        noteCountElement.textContent = `Progress: ${this.userMelody.length} / ${this.currentMelody.length}`;

        // Add the glow class to the element
        noteCountElement.classList.add('note-count-glow');

        // Remove the class after 2 seconds (the duration of the glow animation)
        setTimeout(() => noteCountElement.classList.remove('note-count-glow'), 5000);
    }


    startNewGame() {
        this.isPracticeMode = false;
        let randomIndex = Math.floor(Math.random() * melodies.length);
        // randomIndex = Math.floor(Math.random() * melodies.length); // in process for songIndex victory logic
        this.currentMelody = melodies[randomIndex];
        this.hideMessage();
        this.userMelody = [];
        this.updateNoteCount();
        this.userMelodyTemp = [];
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
                    this.updateNoteCount();
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
        if (this.currentMelody === melodies[4]) {
            let smoke = new Player(`../assets/sounds/smoke.wav`).toDestination();
            setTimeout(() => {
                smoke.start();
            }, 750);
        } else {
            setTimeout(() => {
                playTriumphSound();
            }, 750);
        }

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

        setTimeout(() => {
            this.hideMessage();
        }, 5000);

        //
        // this.isPracticeMode = true;
        this.togglePracticeMode();
    }

    // helper function so that victory message persists until start of next game.
    hideMessage() {
        const messageElement = document.getElementById('message');
        messageElement.classList.remove('show');
    }


}

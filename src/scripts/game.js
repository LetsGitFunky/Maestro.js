import { playMelody, playNote } from './sound.js';

const melodies = [
    ["C4", "E4", "D4", "F4", "E4", "D4", "C4"],
    ["C4", "G4", "A4", "G4", "E4", "F4", "D4", "E4", "C4"],
    ["C4", "C5", "B4", "G4", "A4", "B4", "C5"]
]


export class Game {
    constructor() {
        this.currentMelody = [];
        this.userMelody = [];
        this.userMelodyTemp = [];
        this.currentStreak = 0;
        this.startNewGame();
    }

    startNewGame() {
        let randomIndex = Math.floor(Math.random() * melodies.length);
        this.currentMelody = melodies[randomIndex];
        this.currentStreak = 0;
        this.userMelody = [];
        this.playCurrentMelody();
    }

    playCurrentMelody() {
        const melodySlice = this.currentMelody.slice(0, this.userMelody.length + 1);
        playMelody(melodySlice);
    }

    handleNotePlayed(note) {
        console.log(this)
        this.userMelodyTemp.push(note);

        let userMelodyString = this.userMelodyTemp.join("");
        let currentMelodyString = this.currentMelody.slice(0, this.userMelodyTemp.length).join("");

        if (userMelodyString !== currentMelodyString) {
            this.currentStreak = 0;
            this.userMelodyTemp = [];
            setTimeout(() => this.playCurrentMelody(), 1000);
            return;
        } else {
            this.currentStreak++;
            this.userMelody = [...this.userMelodyTemp];
            setTimeout(() => this.playCurrentMelody(), 1000);
        }
    }
}

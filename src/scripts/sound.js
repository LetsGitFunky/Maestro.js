import * as Tone from 'tone';
import { Player } from 'tone';

let triumphSound = new Player("../../assets/sounds/triumphantSound.wav").toDestination();

export function playTriumphSound() {
    triumphSound.start();
}

export const synth = new Tone.Synth().toDestination();

export function playNote(note) {
    if (synth.state !== 'started') {
        synth.triggerAttack(note);
        setTimeout(() => synth.triggerRelease(), 500);
    }
}

export function playMelody(melody) {
    return new Promise(resolve => {
        melody.forEach((note, index) => {
            setTimeout(() => {
                playNote(note);
                if (index === melody.length - 1) {
                    // We're done playing the melody, so resolve the promise
                    resolve();
                }
            }, 750 + (index * 750));
        });
    });
};

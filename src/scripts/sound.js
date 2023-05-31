import * as Tone from 'tone';
import { Player } from 'tone';

// let triumphSound = new Player("../../assets/sounds/triumphantSound.wav").toDestination();

let triumphSound = new Player("../assets/sounds/triumphantSound.wav").toDestination();

// function youWinSnippet(songName) {
//     let clip = new Player(`../assets/sounds/${songName}.wav`).toDestination();
//     clip.start();
// }

triumphSound.load().then(() => {
    triumphSound.toDestination();
});


// export function playTriumphSound() {
//     triumphSound.start();
// }

export function playTriumphSound() {
    if (triumphSound.loaded) {
        triumphSound.start();
    }
}

export const synth = new Tone.Synth().toDestination();

// export function playNote(note) {
//     if (synth.state !== 'started') {
//         synth.triggerAttack(note);
//         setTimeout(() => synth.triggerRelease(), 500);
//     }
// }

// patch for double note error
export function playNote(note) {
    // If the synth is already playing a note, release it
    if (synth.state === 'started') {
        synth.triggerRelease();
    }

    // Then start the new note
    synth.triggerAttack(note);

    // And schedule the release of this note after 500 ms
    setTimeout(() => synth.triggerRelease(), 500);
}

export function playMelody(melody, game) {
    return new Promise(resolve => {
        melody.forEach((note, index) => {
            setTimeout(() => {
                // get notes
                const keyElement = document.querySelector(`#${note}`);
                if (!game.isEarTrainingMode) {
                    // create computer class so notes light up when cpu plays
                    keyElement.classList.add('computer-active');
                }
                // play note
                playNote(note);
                // remove active class
                if (!game.isEarTrainingMode) {
                    setTimeout(() => keyElement.classList.remove('computer-active'), 200);
                }
                // We're done playing the melody, so resolve the promise
                if (index === melody.length - 1) {
                    resolve();
                }
            }, 750 + (index * 750));
        });
    });
};

import * as Tone from 'tone';

export const synth = new Tone.Synth().toDestination();


// playNote used in ./events : userPlaysNotes,
// will also be used in game.js when computer plays melody back to user
export function playNote(note) {
    synth.triggerAttackRelease(note, '8n');
}

// to be used in ./game.js at the start of each round
// export function playMelody(melody) {
//     melody.forEach(note => {

//     })
// }

const notes = {
      a: 'C4',
      s: 'D4',
      d: 'E4',
      f: 'F4',
      g: 'G4',
      h: 'A4',
      j: 'B4',
      k: 'C5'
    }

const context = new AudioContext()
 
function playNote(frequency) {
    /* ... */
   oscillator.frequency.value = frequency
    /* ... */
 }	
	
document.addEventListener('keypress', ({key}) => {
    const note = notes[key]
    const {frequency} = new Note(note)
    playNote(frequency)
})	
	
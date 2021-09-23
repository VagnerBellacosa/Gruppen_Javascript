let context = new AudioContext(),
   oscillator = context.createOscillator(),
   contextGain = context.createGain();

oscillator.connect(contextGain);
contextGain.connect(context.destination);
oscillator.start(0);
let context = new AudioContext(),
   oscillator = context.createOscillator();

oscillator.type = 'sine';
oscillator.connect(context.destination);
oscillator.start();
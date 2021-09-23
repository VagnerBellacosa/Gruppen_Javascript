  const context = new AudioContext()
    const oscillator = context.createOscillator()

    oscillator.frequency.value = 440
    oscillator.type = 'sine'
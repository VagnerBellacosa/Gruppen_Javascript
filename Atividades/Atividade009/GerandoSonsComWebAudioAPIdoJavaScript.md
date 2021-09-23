# Gerando sons com a Web Audio API do JavaScript

Veja como podemos gerar sons com JavaScript usando a Web Audio API.

Olá, Web Developers!

Sabiam que podemos gerar sons com JavaScript? Isso graças à Web Audio API, que nos fornece poderosas funcionalidades para se trabalhar com áudio. Podemos fazer coisas como adicionar efeitos a um arquivo de áudio ou criar músicas a partir do JavaScript.

## Começando com um beep

Para começar, vamos gerar um simples *beep*.

Copiar

```js
let context = new AudioContext(),
   oscillator = context.createOscillator();

oscillator.type = 'sine';
oscillator.connect(context.destination);
oscillator.start();
```

Primeiro nós instanciamos o `AudioContext`, que é o principal objeto para podermos gerar um som. A partir dele nós criamos um oscilador, que é responsável por emitir um sinal contínuo, que será o nosso som.

Precisamos indicar o tipo de onde que nosso oscilador irá gerar. Indicamos que queremos uma onda senoidal (*sine*).

Depois conectamos o nosso oscilador ao `context.destination`, que representa o destino final do áudio. Se você está no computador, provavelmente isso indica as suas caixas de som. Por fim, executamos a função `start()` para iniciar o som.

Para parar o som, basta executar `oscillator.stop()`.

<iframe src="https://jsfiddle.net/qmkjex64/2/embedded/result/dark/" id="JSFEMB_18892" width="100%" height="140" frameborder="0" sandbox="allow-modals allow-forms allow-same-origin allow-scripts allow-popups allow-top-navigation-by-user-activation allow-downloads" allow="midi; geolocation; microphone; camera; display-capture; encrypted-media;" style="box-sizing: inherit; border: 1px solid rgb(224, 222, 222); font: inherit; margin: 0px 0px 20px; padding: 0px; vertical-align: baseline; min-height: 200px;"></iframe>

Ao parar o som você pode notar um pequeno clique. Isso acontece basicamente quando paramos o som em um lugar qualquer que não seja o ponto zero da onda, como mostrado na imagem abaixo.

![img](https://dkrn4sk0rn31v.cloudfront.net/2018/09/27143604/sin-wave-click.png)

## Encerrando o som

Um modo de acabar com esse som de clique ao pararmos o som (e que pode ser bem desconfortável) é alterar a nossa onda, como se estivéssemos diminuindo ela.

Para isso, usamos a função `exponentialRampToValueAtTime()`, que vai alterando de forma exponencial o valor do nosso som.

Vamos então fazer uma pequena alteração em nosso código:

Copiar

```js
let context = new AudioContext(),
   oscillator = context.createOscillator(),
   contextGain = context.createGain();

oscillator.connect(contextGain);
contextGain.connect(context.destination);
oscillator.start(0);
```

Agora criamos um ganho, um objeto que nos permitirá trabalhar com a função `exponentialRampToValueAtTime()`. Ligamos ele ao oscilador e depois ligamos ao destino de saída do som.

Para parar o som, ao invés de simplesmente executarmos a função `stop()`, vamos executar o seguinte código:

Copiar

```js
contextGain.gain.exponentialRampToValueAtTime(
  	0.00001, context.currentTime + 0.04
	)
```

O que fizemos aqui foi alterar o valor do ganho, que basicamente seria como se estivéssemos abaixando o volume aos poucos.

Veja que o primeiro parâmetro que passamos é bem próximo de zero. Isso porque essa função não pode receber um valor zerado ou negativo.

O segundo parâmetro é o tempo em que queremos que a alteração seja feita.

Abaixo você pode conferir que não importa mais em que momento pare o som, ele não terá mais aquele clique.

<iframe src="https://jsfiddle.net/qmkjex64/4/embedded/result/dark/" id="JSFEMB_18892" width="100%" height="140" frameborder="0" sandbox="allow-modals allow-forms allow-same-origin allow-scripts allow-popups allow-top-navigation-by-user-activation allow-downloads" allow="midi; geolocation; microphone; camera; display-capture; encrypted-media;" style="box-sizing: inherit; border: 1px solid rgb(224, 222, 222); font: inherit; margin: 0px 0px 20px; padding: 0px; vertical-align: baseline; min-height: 200px;"></iframe>

## Efeitos ao parar o som

Quando paramos o som, passamos um tempo bem pequeno para que a alteração no ganho fosse realizada (0.4).

Dependendo do tempo que passarmos, podemos ter efeitos interessantes.

<iframe src="https://jsfiddle.net/qmkjex64/5/embedded/result/dark/" id="JSFEMB_18892" width="100%" height="140" frameborder="0" sandbox="allow-modals allow-forms allow-same-origin allow-scripts allow-popups allow-top-navigation-by-user-activation allow-downloads" allow="midi; geolocation; microphone; camera; display-capture; encrypted-media;" style="box-sizing: inherit; border: 1px solid rgb(224, 222, 222); font: inherit; margin: 0px 0px 20px; padding: 0px; vertical-align: baseline; min-height: 200px;"></iframe>

Isso acaba nos dando sensações diferentes. E essa sensação fica ainda mais evidente quando iniciamos e já encerramos o som logo em seguida.

<iframe src="https://jsfiddle.net/qmkjex64/6/embedded/result/dark/" id="JSFEMB_18892" width="100%" height="140" frameborder="0" sandbox="allow-modals allow-forms allow-same-origin allow-scripts allow-popups allow-top-navigation-by-user-activation allow-downloads" allow="midi; geolocation; microphone; camera; display-capture; encrypted-media;" style="box-sizing: inherit; border: 1px solid rgb(224, 222, 222); font: inherit; margin: 0px 0px 20px; padding: 0px; vertical-align: baseline; min-height: 200px;"></iframe>

Sons bens mais agradáveis do que aquele som contínuo, não é mesmo?

## Diferentes ondas, diferentes osciladores

O que criamos até agora foi um som a partir de um oscilador usando uma onda senoidal. Há outros tipos de ondas, como podemos ver na seguinte imagem:

![img](https://dkrn4sk0rn31v.cloudfront.net/2018/09/28064635/signals.png)

Para alterar o tipo de onda, basta passarmos um dos seguintes códigos:

Copiar

```js
oscillator.type = 'sine';
oscillator.type = 'square';
oscillator.type = 'triangle';
oscillator.type = 'sawtooth';
```

<iframe src="https://jsfiddle.net/qmkjex64/7/embedded/result/dark/" id="JSFEMB_18892" width="100%" height="140" frameborder="0" sandbox="allow-modals allow-forms allow-same-origin allow-scripts allow-popups allow-top-navigation-by-user-activation allow-downloads" allow="midi; geolocation; microphone; camera; display-capture; encrypted-media;" style="box-sizing: inherit; border: 1px solid rgb(224, 222, 222); font: inherit; margin: 0px 0px 20px; padding: 0px;vertical-align: baseline; min-height: 200px;"></iframe>



## Tocando notas

Até o momento nós só tocamos um simples *beep*. Mas se quisermos tocar algo, precisamos tocar notas musicais diferentes.

Cada nota é um som emitido a uma determinada frequência. Abaixo temos uma tabela que indica cada nota e sua respectiva frequência:

![img](https://dkrn4sk0rn31v.cloudfront.net/2018/09/28065939/Captura-de-Tela-2018-09-28-a%CC%80s-06.58.35.png)

Para alterar a frequência, basta indicar um valor em `oscillator.frequency.value`. Para tocar um “Dó” (C4):

Copiar

```js
const C4 = 261.6,
	D4 = 293.7,
  E4 = 329.6,
  F4 = 349.2,
  G4 = 392.0,
  A4 = 440.0,
  B4 = 493.9;

oscillator.frequency.value = C4;
```

No exemplo, passei a frequência para uma constante apenas para o nosso código ficar mais legível. É bem mais simples e legível deixar o nome das notas do que deixar o número da frequência.

<iframe src="https://jsfiddle.net/qmkjex64/8/embedded/result/dark/" id="JSFEMB_18892" width="100%" height="140" frameborder="0" sandbox="allow-modals allow-forms allow-same-origin allow-scripts allow-popups allow-top-navigation-by-user-activation allow-downloads" allow="midi; geolocation; microphone; camera; display-capture; encrypted-media;" style="box-sizing: inherit; border: 1px solid rgb(224, 222, 222); font: inherit; margin: 0px 0px 20px; padding: 0px; vertical-align: baseline; min-height: 200px;"></iframe>

## Evoluindo

Caso queira se aprofundar, procure saber mais sobre bibliotecas e frameworks como o `Tone.js`, uma ferramenta completa com várias funcionalidades para se trabalhar com música interativa no navegador.

<iframe src="https://jsfiddle.net/jqnLgyja/23/embedded/result,js/dark/?username=yotammann" id="JSFEMB_18892" width="100%" height="198" frameborder="0" sandbox="allow-modals allow-forms allow-same-origin allow-scripts allow-popups allow-top-navigation-by-user-activation allow-downloads" allow="midi; geolocation; microphone; camera; display-capture; encrypted-media;" style="box-sizing: inherit; border: 1px solid rgb(224, 222, 222); font: inherit; margin: 0px 0px 20px; padding: 0px; vertical-align: baseline; min-height: 200px;"></iframe>

- https://tonejs.github.io/
- https://alemangui.github.io/pizzicato/
- https://howlerjs.com/
- http://hoch.github.io/WAAX/
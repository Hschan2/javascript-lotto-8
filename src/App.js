import Game from './Game.js';

class App {
  async run() {
    const game = new Game();
    await game.start();
  }
}

export default App;

import { readBuyAmount, readWinningNumbers, readBonusNumber } from "./view/InputHandler.js";
import { printBuyAmount, printLottos, printResult, printEarningRate, printError } from "./view/OutputHandler.js";
import User from "./User.js";
import Lotto from "./Lotto.js";
import { DELIMITER } from "./constants/constant.js";

class Game {
  #user;
  #winningNumber;

  async start() {
    await this.#readBuyAmount();
    this.#issueLottos();
    await this.#readWinningLotto();
    this.#showResult();
  }

  async #readBuyAmount() {
    while (true) {
      try {
        const amount = await readBuyAmount();
        this.#user = new User(amount);
        return;
      } catch (error) {
        printError(error.message);
      }
    }
  }

  #issueLottos() {
    this.#user.purchaseLottos();
    printBuyAmount(this.#user.getLottoCount());
    printLottos(this.#user.getLottos());
  }

  async #readWinningLotto() {
    while (true) {
      try {
        const { winningNumbersArr, bonusNumber } = await this.#getAndValidateWinningLottoInput();
        this.#winningNumber = {
          numbers: winningNumbersArr,
          bonus: bonusNumber,
        };
        return;
      } catch (error) {
        printError(error.message);
      }
    }
  }

  async #getAndValidateWinningLottoInput() {
    const winningNumbersStr = await readWinningNumbers();
    const winningNumbersArr = winningNumbersStr.split(DELIMITER).map(Number);
    new Lotto(winningNumbersArr);

    const bonusNumberStr = await readBonusNumber();
    Lotto.validateBonusNumber(bonusNumberStr, winningNumbersArr);

    return { winningNumbersArr, bonusNumber: Number(bonusNumberStr) };
  }

  #showResult() {
    const result = this.#user.calculateTotalResult(this.#winningNumber);
    const earningRate = this.#user.calculateEarningRate(result);
    printResult(result);
    printEarningRate(earningRate);
  }
}

export default Game;

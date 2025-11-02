
import { readBuyAmount, readWinningNumbers, readBonusNumber } from "./view/InputHandler.js";
import { printBuyAmount, printLottos, printResult, printEarningRate, printError } from "./view/OutputHandler.js";
import User from "./User.js";
import Lotto from "./Lotto.js";
import { BUY_LOTTO_AMOUNT, DELIMITER } from "./constants/constant.js";
import { generateRandomNumbers } from "./utils/RandomNumberGenerator.js";

class Game {
  #user;
  #winningLotto;

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
    const amount = this.#user.getAmount();
    const lottoCount = amount / BUY_LOTTO_AMOUNT;
    this.#generateRandomLottoNumbers(lottoCount)

    printBuyAmount(this.#user.getLottoCount());
    printLottos(this.#user.getLottos());
  }

  #generateRandomLottoNumbers(lottoCount) {
    const lottos = [];
    for (let i = 0; i < lottoCount; i++) {
      const randomNumbers = generateRandomNumbers();
      lottos.push(new Lotto(randomNumbers));
    }
    this.#user.setLottos(lottos);
  }

  async #readWinningLotto() {
    while (true) {
      try {
        const { winningNumbersArr, bonusNumber } = await this.#getAndValidateWinningLottoInput();
        this.#winningLotto = {
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
    const result = this.#user.calculateTotalResult(this.#winningLotto);
    const earningRate = this.#user.calculateEarningRate(result);
    printResult(result);
    printEarningRate(earningRate);
  }
}

export default Game;

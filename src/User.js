
import { BUY_LOTTO_AMOUNT, WINNING_PRIZE } from "./constants/constant.js";
import { BUY_LOTTO_ERROR, INPUT_ERROR } from "./constants/error.js";

class User {
  #amount;
  #lottos;

  constructor(amount) {
    this.#validate(amount);
    this.#amount = Number(amount);
    this.#lottos = [];
  }

  #validate(amount) {
    if (String(amount).trim() === '') throw new Error(INPUT_ERROR.EMPTY_INPUT);
    if (!/^\d+$/.test(amount)) throw new Error(INPUT_ERROR.NOT_NUMBER);
    if (Number(amount) % BUY_LOTTO_AMOUNT !== 0) {
      throw new Error(BUY_LOTTO_ERROR.NOT_ONE_THOUSAND_UNIT);
    }
  }

  calculateTotalResult(winningLotto) {
    const result = { FIRST: 0, SECOND: 0, THIRD: 0, FOURTH: 0, FIFTH: 0 };
    this.#lottos.forEach(lotto => {
      const rank = lotto.getRank(winningLotto);
      if (rank) {
        result[rank] += 1;
      }
    });
    return result;
  }

  calculateEarningRate(result) {
    const totalWinnings = Object.entries(result).reduce((sum, [rank, count]) => {
      return sum + (WINNING_PRIZE[rank] * count);
    }, 0);
    const earningRate = (totalWinnings / this.#amount) * 100;
    return earningRate.toFixed(1);
  }

  setLottos(lottos) {
    this.#lottos = lottos;
  }

  getLottoCount() {
    return this.#lottos.length;
  }

  getLottos() {
    return this.#lottos;
  }

  getAmount() {
    return this.#amount;
  }
}

export default User;

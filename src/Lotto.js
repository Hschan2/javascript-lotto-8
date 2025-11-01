import { LOTTO_NUMBER_COUNT, RANK } from "./constants/constant.js";
import { LOTTO_NUMBER_ERROR } from "./constants/error.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  static validateBonusNumber(bonus, winningNumbers) {
    const bonusNumber = Number(bonus);
    if (String(bonus).trim() === '' || isNaN(bonusNumber)) {
      throw new Error(LOTTO_NUMBER_ERROR.NOT_NUMBER);
    }
    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error(LOTTO_NUMBER_ERROR.NOT_ONE_TO_FOUR_FIVE);
    }
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(LOTTO_NUMBER_ERROR.NOT_DUPLICATION);
    }
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO_NUMBER_COUNT) {
      throw new Error(LOTTO_NUMBER_ERROR.NOT_SIX_COUNT_LOTTO);
    }
    if (new Set(numbers).size !== LOTTO_NUMBER_COUNT) {
      throw new Error(LOTTO_NUMBER_ERROR.NOT_DUPLICATION);
    }
    if (numbers.some(isNaN)) {
      throw new Error(LOTTO_NUMBER_ERROR.NOT_NUMBER);
    }
    if (numbers.some(num => num < 1 || num > 45)) {
      throw new Error(LOTTO_NUMBER_ERROR.NOT_ONE_TO_FOUR_FIVE);
    }
  }

  getRank(winningLotto) {
    const matchCount = this.#countMatch(winningLotto.numbers);
    const hasBonus = this.#hasBonus(winningLotto.bonus);

    if (matchCount === 6) return RANK.FIRST;
    if (matchCount === 5 && hasBonus) return RANK.SECOND;
    if (matchCount === 5) return RANK.THIRD;
    if (matchCount === 4) return RANK.FOURTH;
    if (matchCount === 3) return RANK.FIFTH;
    return null;
  }

  #countMatch(winningNumbers) {
    return this.#numbers.filter(number => winningNumbers.includes(number)).length;
  }

  #hasBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
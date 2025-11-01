
import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGE } from "../constants/message.js";

export async function readBuyAmount() {
  return await Console.readLineAsync(`${INPUT_MESSAGE.LOTTO_BUY_AMOUNT}\n`);
}

export async function readWinningNumbers() {
  return await Console.readLineAsync(`${INPUT_MESSAGE.USER_LOTTO_NUMBERS}\n`);
}

export async function readBonusNumber() {
  return await Console.readLineAsync(`${INPUT_MESSAGE.USER_BONUS_NUMBER}\n`);
}

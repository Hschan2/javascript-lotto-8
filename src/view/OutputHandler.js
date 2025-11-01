import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGE, WINNING_DETAILS } from "../constants/message.js";

export function printBuyAmount(amount) {
  Console.print(`
${amount}${OUTPUT_MESSAGE.BUY_COUNT}`);
}

export function printLottos(lottos) {
  lottos.forEach(lotto => {
    Console.print(`[${lotto.getNumbers().join(", ")}]`);
  });
}

export function printResult(result) {
  Console.print(`
${OUTPUT_MESSAGE.WINNING_STATISTICS}`);
  Console.print(OUTPUT_MESSAGE.DIVIDING_LINE);

  const ranks = ['FIFTH', 'FOURTH', 'THIRD', 'SECOND', 'FIRST'];
  ranks.forEach(rank => {
    const detail = WINNING_DETAILS[rank];
    const count = result[rank] || 0;
    Console.print(`${detail.message} - ${count}개`);
  });
}

export function printEarningRate(earningRate) {
  Console.print(`총 수익률은 ${earningRate}%입니다.`);
}

export function printError(message) {
  Console.print(message);
}
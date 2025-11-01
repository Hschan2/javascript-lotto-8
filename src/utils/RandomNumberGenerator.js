import { Random } from "@woowacourse/mission-utils";
import { RANDOM_NUMBER } from "../constants/constant";

export function generateRandomNumbers() {
    const randomLottoNumbers = Random.pickUniqueNumbersInRange(RANDOM_NUMBER.MIN_RANDOM_NUMBER, RANDOM_NUMBER.MAX_RANDOM_NUMBER, RANDOM_NUMBER.MAX_UNIT);
    return randomLottoNumbers.sort((a, b) => a - b);
}

export function generateRandomBonusNumbers() {
    return Random.pickUniqueNumbersInRange(RANDOM_NUMBER.MIN_RANDOM_NUMBER, RANDOM_NUMBER.MAX_RANDOM_NUMBER, RANDOM_NUMBER.MIN_UNIT);
}
export const PREFIX_ERROR = '[ERROR]';
export const LOTTO_NUMBER_ERROR = {
    NOT_ONE_TO_FOUR_FIVE: `${PREFIX_ERROR} 로또 번호는 1부터 45 사이의 숫자여야 합니다.`,
    NOT_DUPLICATION: `${PREFIX_ERROR} 로또 번호는 중복되지 않아야 합니다.`,
    NOT_SIX_COUNT_LOTTO: `${PREFIX_ERROR} 로또 번호는 6개여야 합니다.`,
    NOT_NUMBER: `${PREFIX_ERROR} 로또 번호는 숫자만 입력해야 합니다.`,
}
export const LOTTO_BONUS_NUMBER_ERROR = {
    NOT_ONE_TO_FOUR_FIVE: `${PREFIX_ERROR} 보너스 번호는 1부터 45 사이의 숫자여야 합니다.`,
    NOT_ONE: `${PREFIX_ERROR} 보너스 번호는 1개여야 합니다.`,
}
export const INPUT_ERROR = {
    EMPTY_INPUT: `${PREFIX_ERROR} 숫자를 입력해 주세요.`,
    NOT_NUMBER: `${PREFIX_ERROR} 숫자만 입력해야 합니다.`,
}
export const BUY_LOTTO_ERROR = {
    NOT_ONE_THOUSAND_UNIT: `${PREFIX_ERROR} 로또 금액은 1,000원 단위로 입력해야 합니다.`,
}
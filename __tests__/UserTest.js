import { RANK } from "../src/constants/constant";
import Lotto from "../src/Lotto";
import User from "../src/User";

describe("유저 클래스 테스트", () => {
    test("로또 구매 가격을 입력하지 않으면 예외를 발생한다.", () => {
        expect(() => {
            new User('');
        }).toThrow("[ERROR]");
    });

    test("입력한 로또 구매 가격이 숫자가 아니면 예외를 발생한다.", () => {
        expect(() => {
            new User('a');
        }).toThrow("[ERROR]");
    });

    test("입력한 로또 구매 가격이 1000단위로 나누어지지 않는 숫자면 예외를 발생한다.", () => {
        expect(() => {
            new User(1234);
        }).toThrow("[ERROR]");
    });
});

describe("유저 클래스: 관리 및 계산 테스트", () => {
    test("setLottos로 로또를 관리하고 getLottos/getLottoCount로 조회가 가능하다.", () => {
        const user = new User('2000');
        const lottos = [
            new Lotto([1, 2, 3, 4, 5, 6]),
            new Lotto([7, 8, 9, 10, 11, 12]),
        ];

        user.setLottos(lottos);
        expect(user.getLottoCount()).toBe(2);
        expect(user.getLottos()).toBe(lottos);
    });

    test("calculateTotalResult로 당첨 통계를 정확하게 계산한다.", () => {
        const user = new User('3000');
        const WinningLotto = {
            numbers: [1, 2, 3, 4, 5, 6],
            bonus: 7,
        };
        const lottos = [
            new Lotto([1, 2, 3, 4, 5, 7]),
            new Lotto([1, 2, 3, 10, 11, 12]),
            new Lotto([10, 11, 12, 13, 14, 15]),
        ];

        user.setLottos(lottos);

        const result = user.calculateTotalResult(WinningLotto);

        expect(result).toEqual({
            [RANK.FIRST]: 0,
            [RANK.SECOND]: 1,
            [RANK.THIRD]: 0,
            [RANK.FOURTH]: 0,
            [RANK.FIFTH]: 1,
        });
    });

    test("calculateEarningRate로 수익률을 계산한다. (소수점 첫째 자리까지)", () => {
        const user = new User('8000');
        const result = {
            [RANK.FIFTH]: 1,
        };
        const earningRate = user.calculateEarningRate(result);

        expect(earningRate).toBe('62.5');
    });

    test("getAmount는 생성시 금액을 정확히 반환한다.", () => {
        const user = new User('5000');

        expect(user.getAmount()).toBe(5000);
    });
});
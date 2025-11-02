import { RANK } from "../src/constants/constant";
import Lotto from "../src/Lotto";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  // TODO: 추가 기능 구현에 따른 테스트 코드 작성
  test("로또 번호에 숫자가 아닌 문자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 'a', 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  test("로또 번호의 숫자가 1부터 45 사이의 숫자가 아니면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 55]);
    }).toThrow("[ERROR]");
  });

  // 보너스 숫자 유효성 검사 테스트
  test("보너스 번호에 숫자가 아닌 문자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      Lotto.validateBonusNumber('a', [1, 2, 3, 4, 5, 6]);
    }).toThrow("[ERROR]");
  });

  test("보너스 번호가 빈 값이면 예외가 발생한다.", () => {
    expect(() => {
      Lotto.validateBonusNumber('', [1, 2, 3, 4, 5, 6]);
    }).toThrow("[ERROR]");
  });

  test("보너스 번호의 숫자가 1부터 45 사이의 숫자가 아니면 예외가 발생한다.", () => {
    expect(() => {
      Lotto.validateBonusNumber(55, [1, 2, 3, 4, 5, 6]);
    }).toThrow("[ERROR]");
  });

  test("보너스 번호가 로또 번호 중 중복되는 번호면 예외가 발생한다.", () => {
    expect(() => {
      Lotto.validateBonusNumber(3, [1, 2, 3, 4, 5, 6]);
    }).toThrow("[ERROR]");
  });
});

describe("로또 클래스: getRank 테스트", () => {
  const WinningLotto = {
    numbers: [1, 2, 3, 4, 5, 6],
    bonus: 7,
  };

  test("1등 테스트: 6개 번호가 일치하면 1등 값을 반환한다.", () => {
    const userLotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(userLotto.getRank(WinningLotto)).toBe(RANK.FIRST);
  });

  test("2등 테스트: 5개 번호의 번화와 보너스 번호가 일치하면 2등 값을 반환한다.", () => {
    const userLotto = new Lotto([1, 2, 3, 4, 5, 7]);
    expect(userLotto.getRank(WinningLotto)).toBe(RANK.SECOND);
  });

  test("3등 테스트: 5개 번호가 일치하면 3등 값을 반환한다.", () => {
    const userLotto = new Lotto([1, 2, 3, 4, 5, 8]);
    expect(userLotto.getRank(WinningLotto)).toBe(RANK.THIRD);
  });

  test("4등 테스트: 4개 번호가 일치하면 5등 값을 반환한다.", () => {
    const userLotto = new Lotto([1, 2, 3, 4, 9, 10]);
    expect(userLotto.getRank(WinningLotto)).toBe(RANK.FOURTH);
  });

  test("5등 테스트: 3개 번호가 일치하면 6등 값을 반환한다.", () => {
    const userLotto = new Lotto([1, 2, 3, 8, 9, 10]);
    expect(userLotto.getRank(WinningLotto)).toBe(RANK.FIFTH);
  });

  test("미당첨 테스트: 2개 번호가 일치하면 로또에 미당첨인 null을 내보낸다.", () => {
    const userLotto = new Lotto([1, 2, 8, 9, 10, 11]);
    expect(userLotto.getRank(WinningLotto)).toBe(null);
  });
});

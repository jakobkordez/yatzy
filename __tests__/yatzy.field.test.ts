import {
  YatzyFieldChance,
  YatzyFieldNumOAK,
  YatzyFieldOnePair,
  YatzyFieldTwoPairs,
  YatzyFieldSingle,
  YatzyFieldYatzy,
  YatzyField,
  YatzySinglesBonusField,
  YatzyFieldStraight,
  YatzyFieldFullHouse,
  YatzySumField,
} from '@/logic/yatzy_field';

describe('Upper table', () => {
  const ones = new YatzyFieldSingle(1);
  const fives = new YatzyFieldSingle(5);

  test('None 1', () => {
    expect(ones.getScore([4, 2, 5, 2, 3])).toBe(0);
  });

  test('None 2', () => {
    expect(fives.getScore([1, 2, 3, 4, 2])).toBe(0);
  });

  test('One 1', () => {
    expect(ones.getScore([4, 1, 2, 5, 6])).toBe(1);
  });

  test('One 2', () => {
    expect(fives.getScore([4, 1, 2, 5, 6])).toBe(5);
  });

  test('Many 1', () => {
    expect(ones.getScore([1, 4, 2, 1, 1])).toBe(3);
  });

  test('Many 2', () => {
    expect(fives.getScore([5, 3, 5, 5, 5])).toBe(20);
  });
});

describe('One Pair', () => {
  const op = new YatzyFieldOnePair();

  test('No pair', () => {
    expect(op.getScore([1, 2, 3, 4, 5])).toBe(0);
  });

  test('Pair of ones', () => {
    expect(op.getScore([5, 1, 3, 1, 2])).toBe(2);
  });

  test('Two pairs 1', () => {
    expect(op.getScore([5, 4, 1, 1, 4])).toBe(8);
  });

  test('Two pairs 2', () => {
    expect(op.getScore([4, 1, 4, 1, 4])).toBe(8);
  });

  test('Two pairs 3', () => {
    expect(op.getScore([1, 1, 4, 1, 4])).toBe(8);
  });
});

describe('Two pair', () => {
  const tp = new YatzyFieldTwoPairs();

  test('None', () => {
    expect(tp.getScore([4, 4, 3, 1, 2])).toBe(0);
  });

  test('Two pairs 1', () => {
    expect(tp.getScore([4, 4, 1, 2, 1])).toBe(10);
  });

  test('Two pairs 2', () => {
    expect(tp.getScore([6, 6, 6, 5, 5])).toBe(22);
  });

  test('Three pairs', () => {
    expect(tp.getScore([5, 5, 1, 1, 6, 6])).toBe(22);
  });
});

describe('N of a kind', () => {
  const three = new YatzyFieldNumOAK(3);
  const four = new YatzyFieldNumOAK(4);

  test('None 1', () => {
    expect(three.getScore([1, 2, 3, 4, 5])).toBe(0);
  });

  test('Three 1', () => {
    expect(three.getScore([1, 2, 3, 3, 3])).toBe(9);
  });

  test('Three 2', () => {
    expect(three.getScore([4, 4, 4, 4, 4])).toBe(12);
  });

  test('Four 1', () => {
    expect(four.getScore([1, 4, 1, 4, 4])).toBe(0);
  });

  test('Four 2', () => {
    expect(four.getScore([4, 4, 4, 4, 4])).toBe(16);
  });
});

describe('Straight', () => {
  describe('Small 1', () => {
    const straight = new YatzyFieldStraight(5, 1, 5);

    test('Test 1', () => {
      expect(straight.getScore([1, 2, 3, 4, 5])).toBe(15);
    });

    test('Test 2', () => {
      expect(straight.getScore([2, 3, 4, 5, 6])).toBe(0);
    });

    test('Test 3', () => {
      expect(straight.getScore([1, 4, 2, 3, 1])).toBe(0);
    });

    test('Test 4', () => {
      expect(straight.getScore([3, 2, 4, 5, 1])).toBe(15);
    });
  });

  describe('Small 2', () => {
    const straight = new YatzyFieldStraight(4);

    test('Test 1', () => {
      expect(straight.getScore([1, 2, 3, 4, 5])).toBe(14);
    });

    test('Test 2', () => {
      expect(straight.getScore([2, 3, 4, 5, 6])).toBe(18);
    });

    test('Test 3', () => {
      expect(straight.getScore([1, 4, 2, 3, 1])).toBe(10);
    });

    test('Test 4', () => {
      expect(straight.getScore([3, 1, 6, 4, 1])).toBe(0);
    });

    test('Test 5', () => {
      expect(straight.getScore([4, 2, 1, 1, 2])).toBe(0);
    });
  });

  describe('Large 1', () => {
    const straight = new YatzyFieldStraight(5, 2, 6);

    test('Test 1', () => {
      expect(straight.getScore([1, 2, 3, 4, 5])).toBe(0);
    });

    test('Test 2', () => {
      expect(straight.getScore([2, 3, 4, 5, 6])).toBe(20);
    });

    test('Test 3', () => {
      expect(straight.getScore([1, 4, 2, 3, 1])).toBe(0);
    });

    test('Test 4', () => {
      expect(straight.getScore([3, 2, 4, 6, 5])).toBe(20);
    });
  });

  describe('Large 2', () => {
    const straight = new YatzyFieldStraight(5);

    test('Test 1', () => {
      expect(straight.getScore([1, 2, 3, 4, 5])).toBe(15);
    });

    test('Test 2', () => {
      expect(straight.getScore([2, 3, 4, 5, 6])).toBe(20);
    });

    test('Test 3', () => {
      expect(straight.getScore([1, 4, 2, 3, 1])).toBe(0);
    });

    test('Test 4', () => {
      expect(straight.getScore([3, 2, 4, 6, 5])).toBe(20);
    });

    test('Test 5', () => {
      expect(straight.getScore([3, 2, 4, 5, 1])).toBe(15);
    });
  });
});

describe('Full House', () => {
  const fullHouse = new YatzyFieldFullHouse();

  test('No full house', () => {
    expect(fullHouse.getScore([2, 4, 2, 5, 4])).toBe(0);
    expect(fullHouse.getScore([2, 2, 4, 4, 5])).toBe(0);
    expect(fullHouse.getScore([3, 3, 3, 3, 3])).toBe(0);
    expect(fullHouse.getScore([5, 5, 5, 5, 5])).toBe(0);
    expect(fullHouse.getScore([5, 5, 5, 5, 4])).toBe(0);
  });

  test('Sorted', () => {
    expect(fullHouse.getScore([1, 1, 1, 4, 4])).toBe(11);
    expect(fullHouse.getScore([5, 5, 5, 3, 3])).toBe(21);
  });

  test('Shuffled', () => {
    expect(fullHouse.getScore([1, 4, 1, 4, 4])).toBe(14);
    expect(fullHouse.getScore([5, 3, 5, 3, 3])).toBe(19);
  });
});

describe('Chance', () => {
  const chance = new YatzyFieldChance();

  test('Test 1', () => {
    expect(chance.getScore([1, 1, 1, 1, 1])).toBe(5);
  });

  test('Test 2', () => {
    expect(chance.getScore([6, 6, 6, 6, 6])).toBe(30);
  });

  test('Test 3', () => {
    expect(chance.getScore([5, 3, 2, 5, 6])).toBe(21);
  });
});

describe('Yatzy', () => {
  const yatzy = new YatzyFieldYatzy(50, false);

  test('Test 1', () => {
    expect(yatzy.getScore([1, 1, 1, 1, 1])).toBe(50);
  });

  test('Test 2', () => {
    expect(yatzy.getScore([6, 6, 6, 6, 6])).toBe(50);
  });

  test('Test 3', () => {
    expect(yatzy.getScore([5, 3, 2, 5, 6])).toBe(0);
  });

  test('Empty', () => {
    expect(yatzy.getScore([])).toBe(0);
  });

  test('One', () => {
    expect(yatzy.getScore([6])).toBe(0);
  });
});

describe('Sum', () => {
  const sum = new YatzySumField();
  const fields = [
    new YatzyFieldSingle(4),
    new YatzySinglesBonusField(63, 25),
    new YatzyFieldChance(),
    sum,
  ];

  test('Nulls', () => {
    const scores = [null, null, null, null];

    expect(sum.calculate(scores, fields)).toBe(0);
  });

  test('Zeros', () => {
    const scores = [0, 0, 0, 0];

    expect(sum.calculate(scores, fields)).toBe(0);
  });

  test('Only scorable', () => {
    const scores = [1, 2, 4, 8];

    expect(sum.calculate(scores, fields)).toBe(7);
  });
});

describe('Serialization', () => {
  const tests = [
    { name: 'Ones', field: new YatzyFieldSingle(1) },
    { name: 'Twos', field: new YatzyFieldSingle(2) },
    { name: 'Threes', field: new YatzyFieldSingle(3) },
    { name: 'Fours', field: new YatzyFieldSingle(4) },
    { name: 'Fives', field: new YatzyFieldSingle(5) },
    { name: 'Sixes', field: new YatzyFieldSingle(6) },
    { name: 'Bonus', field: new YatzySinglesBonusField(63, 25) },
    { name: 'One pair', field: new YatzyFieldOnePair() },
    { name: 'Two pairs', field: new YatzyFieldTwoPairs() },
    { name: 'Three of a kind', field: new YatzyFieldNumOAK(3) },
    { name: 'Four of a kind', field: new YatzyFieldNumOAK(4) },
    { name: 'Small straight 1', field: new YatzyFieldStraight(5, 1, 5) },
    { name: 'Small straight 2', field: new YatzyFieldStraight(4) },
    { name: 'Large straight 1', field: new YatzyFieldStraight(5, 2, 6) },
    { name: 'Large straight 2', field: new YatzyFieldStraight(5) },
    { name: 'Full House', field: new YatzyFieldFullHouse() },
    { name: 'Chance', field: new YatzyFieldChance() },
    { name: 'Yatzy 1', field: new YatzyFieldYatzy(50, false) },
    { name: 'Yatzy 2', field: new YatzyFieldYatzy(60, true) },
    { name: 'Total', field: new YatzySumField() },
  ];

  tests.forEach(({ name, field }) => {
    test(name, () => {
      expect(
        YatzyField.fromJSON(JSON.parse(JSON.stringify(field))),
      ).toStrictEqual(field);
    });
  });
});

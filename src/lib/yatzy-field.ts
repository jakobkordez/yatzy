export interface YatzyFieldDef {
	key: string;
	minScore?: number;
	bonus?: number;
	num?: number;
	count?: number;
	min?: number;
	max?: number;
	baseReward?: number;
	diceReward?: boolean;
}

export abstract class YatzyField {
	abstract toJSON(): YatzyFieldDef;

	static fromJSON(json: YatzyFieldDef) {
		switch (json.key) {
			case YatzySinglesBonusField.key:
				return new YatzySinglesBonusField(json.minScore!, json.bonus!);

			case YatzySumField.key:
				return new YatzySumField();

			case YatzyFieldSingle.key:
				return new YatzyFieldSingle(json.num!);

			case YatzyFieldOnePair.key:
				return new YatzyFieldOnePair();

			case YatzyFieldTwoPairs.key:
				return new YatzyFieldTwoPairs();

			case YatzyFieldNumOAK.key:
				return new YatzyFieldNumOAK(json.num!);

			case YatzyFieldStraight.key:
				return new YatzyFieldStraight(json.count!, json.min, json.max);

			case YatzyFieldFullHouse.key:
				return new YatzyFieldFullHouse();

			case YatzyFieldChance.key:
				return new YatzyFieldChance();

			case YatzyFieldYatzy.key:
				return new YatzyFieldYatzy(json.baseReward!, json.diceReward!);

			default:
				throw '';
		}
	}
}

export abstract class YatzyScorableField extends YatzyField {}

export abstract class YatzyBasicField extends YatzyScorableField {
	abstract getScore(dice: number[]): number;
}

export abstract class YatzyCalculatableField extends YatzyField {
	abstract calculate(scores: (number | null)[], fields: YatzyField[]): number | null;
}

export class YatzySinglesBonusField extends YatzyCalculatableField implements YatzyScorableField {
	static key = 'YF_SinglesBonus';

	minScore: number;
	bonus: number;

	constructor(minScore: number, bonus: number) {
		super();
		this.minScore = minScore;
		this.bonus = bonus;
	}

	calculate(scores: (number | null)[], fields: YatzyField[]): number | null {
		scores = scores.filter((_, i) => fields[i] instanceof YatzyFieldSingle);

		const total = scores.reduce<number>((p, c) => p + (c ?? 0), 0);
		if (total >= this.minScore) return this.bonus;

		const ffields = fields.filter((f) => f instanceof YatzyFieldSingle) as YatzyFieldSingle[];
		const potential = scores.reduce<number>((p, c, i) => p + (c ?? ffields[i].num * 5), 0);
		if (potential < this.minScore) return 0;

		return null;
	}

	toJSON() {
		return {
			key: YatzySinglesBonusField.key,
			minScore: this.minScore,
			bonus: this.bonus
		};
	}
}

export class YatzySumField extends YatzyCalculatableField {
	static key = 'YF_Sum';

	calculate(scores: (number | null)[], fields: YatzyField[]): number | null {
		return scores
			.filter((_, i) => !(fields[i] instanceof YatzySumField))
			.reduce<number>((p, c) => p + (c ?? 0), 0);
	}

	toJSON() {
		return {
			key: YatzySumField.key
		};
	}
}

export class YatzyFieldSingle extends YatzyBasicField {
	static key = 'YF_Single';

	num: number;

	constructor(num: number) {
		super();
		this.num = num;
	}

	getScore(dice: number[]): number {
		return dice.filter((d) => d === this.num).reduce((a, b) => a + b, 0);
	}

	toJSON() {
		return {
			key: YatzyFieldSingle.key,
			num: this.num
		};
	}
}

export class YatzyFieldOnePair extends YatzyBasicField {
	static key = 'YF_OnePair';

	getScore(dice: number[]): number {
		const pairs = getMults(dice, 2);
		if (pairs.length === 0) return 0;
		return Math.max(...pairs) * 2;
	}

	toJSON() {
		return {
			key: YatzyFieldOnePair.key
		};
	}
}

export class YatzyFieldTwoPairs extends YatzyBasicField {
	static key = 'YF_TwoPairs';

	getScore(dice: number[]): number {
		const pairs = getMults(dice, 2);
		if (pairs.length < 2) return 0;
		pairs.sort((a, b) => b - a);
		return pairs[0] * 2 + pairs[1] * 2;
	}

	toJSON() {
		return {
			key: YatzyFieldTwoPairs.key
		};
	}
}

export class YatzyFieldNumOAK extends YatzyBasicField {
	static key = 'YF_NumOAK';

	num: number;

	constructor(num: number) {
		super();
		this.num = num;
	}

	getScore(dice: number[]): number {
		const same = getMults(dice, this.num);
		if (same.length === 0) return 0;
		return Math.max(...same) * this.num;
	}

	toJSON() {
		return {
			key: YatzyFieldNumOAK.key,
			num: this.num
		};
	}
}

export class YatzyFieldStraight extends YatzyBasicField {
	static key = 'YF_Straight';

	constructor(
		public count: number,
		public min?: number,
		public max?: number
	) {
		super();
	}

	getScore(dice: number[]): number {
		if (this.min) dice = dice.filter((d) => d >= this.min!);
		if (this.max) dice = dice.filter((d) => d <= this.max!);
		const dSet = new Set(dice);
		dice = Array.from(dSet).sort();
		if (dice.length < this.count) return 0;
		let c = 1;
		let i = dice.length - 2;
		for (; i >= 0; --i) {
			if (dice[i] + 1 === dice[i + 1]) {
				++c;
				if (c === this.count) break;
			} else c = 1;
		}
		if (c < this.count) return 0;
		return dice[i] * this.count + (this.count * (this.count - 1)) / 2;
	}

	toJSON() {
		return {
			key: YatzyFieldStraight.key,
			count: this.count,
			min: this.min,
			max: this.max
		};
	}
}

export class YatzyFieldFullHouse extends YatzyBasicField {
	static key = 'YF_FullHouse';

	getScore(dice: number[]): number {
		const pairs = getMults(dice, 2);
		const trips = getMults(dice, 3);
		if (pairs.length === 0 || trips.length === 0) return 0;
		const mTrips = Math.max(...trips);
		const fPairs = pairs.filter((p) => p !== mTrips);
		if (fPairs.length === 0) return 0;
		const mPairs = Math.max(...fPairs);
		return mTrips * 3 + mPairs * 2;
	}

	toJSON() {
		return {
			key: YatzyFieldFullHouse.key
		};
	}
}

export class YatzyFieldChance extends YatzyBasicField {
	static key = 'YF_Chance';

	getScore(dice: number[]): number {
		return dice.reduce((a, b) => a + b, 0);
	}

	toJSON() {
		return {
			key: YatzyFieldChance.key
		};
	}
}

export class YatzyFieldYatzy extends YatzyBasicField {
	static key = 'YF_Yatzy';

	// baseReward: number;
	// diceReward: boolean;

	constructor(
		public baseReward: number,
		public diceReward: boolean
	) {
		super();
	}

	getScore(dice: number[]): number {
		return getMults(dice, 5).length > 0
			? this.baseReward + (this.diceReward ? dice[0] * dice.length : 0)
			: 0;
	}

	toJSON() {
		return {
			key: YatzyFieldYatzy.key,
			baseReward: this.baseReward,
			diceReward: this.diceReward
		};
	}
}

function getMults(dice: number[], minCount: number): number[] {
	const counts = new Array(6).fill(0);
	dice.forEach((d) => ++counts[d - 1]);
	return counts.map((c, i) => (c >= minCount ? i + 1 : 0)).filter((d) => d > 0);

	// const counts = new Map<number, number>();
	// dice.forEach((d) => {
	//   counts.set(d, (counts.get(d) ?? 0) + 1);
	// });
	// return Array.from(counts.entries())
	//   .filter(([_, count]) => count >= minCount)
	//   .map(([num, _]) => num);
}

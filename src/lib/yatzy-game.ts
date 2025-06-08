import {
	YatzyField,
	YatzySumField,
	YatzyFieldYatzy,
	YatzyFieldStraight,
	YatzyFieldNumOAK,
	YatzyFieldOnePair,
	YatzyFieldSingle,
	YatzyFieldTwoPairs,
	YatzySinglesBonusField,
	YatzyFieldFullHouse,
	YatzyFieldChance,
	YatzyCalculatableField,
	type YatzyFieldDef
} from './yatzy-field';

const defaultFields = [
	{ title: 'Ones', field: new YatzyFieldSingle(1) },
	{ title: 'Twos', field: new YatzyFieldSingle(2) },
	{ title: 'Threes', field: new YatzyFieldSingle(3) },
	{ title: 'Fours', field: new YatzyFieldSingle(4) },
	{ title: 'Fives', field: new YatzyFieldSingle(5) },
	{ title: 'Sixes', field: new YatzyFieldSingle(6) },
	{ title: 'Bonus', field: new YatzySinglesBonusField(63, 25) },
	{ title: 'One pair', field: new YatzyFieldOnePair() },
	{ title: 'Two pairs', field: new YatzyFieldTwoPairs() },
	{ title: 'Three of a kind', field: new YatzyFieldNumOAK(3) },
	{ title: 'Four of a kind', field: new YatzyFieldNumOAK(4) },
	{ title: 'Small straight', field: new YatzyFieldStraight(5, 1, 5) },
	{ title: 'Large straight', field: new YatzyFieldStraight(5, 2, 6) },
	// { title: 'Small straight', field: new YatzyFieldStraight(4) },
	// { title: 'Large straight', field: new YatzyFieldStraight(5) },
	{ title: 'Full House', field: new YatzyFieldFullHouse() },
	{ title: 'Chance', field: new YatzyFieldChance() },
	{ title: 'Yatzy', field: new YatzyFieldYatzy(50, false) },
	{ title: 'Total', field: new YatzySumField() }
];

export class YatzyGame {
	constructor(
		public readonly players: string[],
		public readonly fields: YatzyField[] = defaultFields.map(({ field }) => field),
		public readonly fieldNames: string[] = defaultFields.map(({ title }) => title),
		public readonly scores: (number | null)[][] = players.map(() => fields.map(() => null))
	) {
		for (let f = 0; f < fields.length; f++) {
			if (!(fields[f] instanceof YatzyCalculatableField)) continue;

			for (let p = 0; p < players.length; p++) {
				scores[p][f] = (fields[f] as YatzyCalculatableField).calculate(scores[p], fields);
			}
		}
	}

	setField(playerI: number, fieldI: number, val: number | null): YatzyGame {
		return new YatzyGame(
			this.players,
			this.fields,
			this.fieldNames,
			this.scores.map((row, i) =>
				i === playerI ? row.map((v, j) => (j === fieldI ? val : v)) : row
			)
		);
	}

	static fromJSON(json: YatzyGameDef): YatzyGame {
		return new YatzyGame(
			json.players,
			json.fields.map(YatzyField.fromJSON),
			json.fieldNames,
			json.scores
		);
	}
}

export interface YatzyGameDef {
	players: string[];
	fields: YatzyFieldDef[];
	fieldNames: string[];
	scores: (number | null)[][];
}

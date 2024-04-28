import {
	YatzyField,
	YatzyFieldSingle,
	YatzySinglesBonusField,
	YatzyFieldOnePair,
	YatzyFieldTwoPairs,
	YatzyFieldNumOAK,
	YatzyFieldFullHouse,
	YatzyFieldChance,
	YatzyFieldYatzy,
	YatzySumField,
	YatzyCalculatableField,
	YatzyFieldStraight,
	type YatzyFieldDef
} from './yatzy-field';

export interface YatzyGameDef {
	players: string[];
	fields: YatzyFieldDef[];
	fieldNames: string[];
	scores: (number | null)[][];
}

export class YatzyGame {
	fields: YatzyField[];
	fieldNames: string[];
	players: string[];
	scores: (number | null)[][];

	constructor(
		players: string[],
		fields?: YatzyField[],
		fieldNames?: string[],
		scores?: (number | null)[][]
	) {
		this.players = players;

		const defFields = [
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

		this.fields = fields ?? defFields.map(({ field }) => field);
		this.fieldNames = fieldNames ?? defFields.map(({ title }) => title);

		this.scores = scores ?? YatzyGame.initScores(players.length, this.fields.length);
		for (let i = 0; i < players.length; ++i) this._calculateFields(i);
	}

	_setField(player: number, field: number, value: number | null): void {
		this.scores[player][field] = value;
		this._calculateFields(player);
	}

	private _calculateFields(player: number): void {
		for (let f = 0; f < this.fields.length; ++f) {
			if (!(this.fields[f] instanceof YatzyCalculatableField)) continue;

			this.scores[player][f] = (this.fields[f] as YatzyCalculatableField).calculate(
				this.scores[player],
				this.fields
			);
		}
	}

	private static initScores(players: number, fields: number) {
		const scores = new Array(players);
		for (let i = 0; i < players; i++) {
			scores[i] = new Array(fields).fill(null);
		}
		return scores;
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

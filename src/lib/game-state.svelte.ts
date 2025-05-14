import { getContext, setContext } from 'svelte';
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
	YatzyCalculatableField
} from './yatzy-field';

interface YatzyGame {
	players: string[];
	fields: YatzyField[];
	fieldNames: string[];
	scores: (number | null)[][];
}

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

const STORAGE_KEY = 'game-state';

function createGameState() {
	let value = $state<YatzyGame | null | undefined>(undefined);

	// Init state
	try {
		const state = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '');
		value = {
			players: state.players,
			fields: state.fields.map(YatzyField.fromJSON),
			fieldNames: state.fieldNames,
			scores: state.scores
		};
	} catch (error) {
		console.error(error);
		value = null;
	}

	$effect(() => {
		if (!value) {
			localStorage.removeItem(STORAGE_KEY);
		} else {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
		}
	});

	function _calculateFields(player: number): void {
		if (!value) return;
		for (let f = 0; f < value.fields.length; ++f) {
			if (!(value.fields[f] instanceof YatzyCalculatableField)) continue;

			value.scores[player][f] = (value.fields[f] as YatzyCalculatableField).calculate(
				value.scores[player],
				value.fields
			);
		}
	}

	return {
		get gameInProgress() {
			if (value === undefined) return undefined;
			return value !== null;
		},
		get players() {
			return value?.players;
		},
		get fields() {
			return value?.fields;
		},
		get fieldNames() {
			return value?.fieldNames;
		},
		get scores() {
			return value?.scores;
		},
		createGame(players: string[]) {
			value = {
				players,
				fields: defaultFields.map(({ field }) => field),
				fieldNames: defaultFields.map(({ title }) => title),
				scores: players.map(() => defaultFields.map(() => null))
			};
		},
		exitGame() {
			value = null;
		},
		setField(playerI: number, fieldI: number, val: number | null) {
			if (!value) return;
			value.scores[playerI][fieldI] = val;
			_calculateFields(playerI);
		}
	};
}

const GAME_STATE = 'GAME_STATE';

export type GameState = ReturnType<typeof createGameState>;

export function setGameContext() {
	return setContext<GameState>(GAME_STATE, createGameState());
}

export function getGameContext() {
	return getContext<GameState>(GAME_STATE);
}

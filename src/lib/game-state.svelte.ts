import { getContext, setContext } from 'svelte';
import { YatzyGame, type YatzyGameDef } from './yatzy-game';

const STORAGE_KEY = 'game-state';
const HISTORY_KEY = 'game-history';

function createGameState() {
	let value = $state<YatzyGame | null | undefined>(undefined);
	let history = $state<YatzyGame[]>([]);

	// Init state
	const str = localStorage.getItem(STORAGE_KEY);
	if (str) {
		try {
			const state = JSON.parse(str);
			value = YatzyGame.fromJSON(state);
		} catch (error) {
			console.error(error);
			value = null;
		}
	} else {
		value = null;
	}

	const historyStr = localStorage.getItem(HISTORY_KEY);
	if (historyStr) {
		try {
			const json = JSON.parse(historyStr) as YatzyGameDef[];
			history = json.map(YatzyGame.fromJSON);
		} catch (error) {
			console.error(error);
		}
	}

	$effect(() => {
		if (!value) {
			localStorage.removeItem(STORAGE_KEY);
		} else {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
		}
		localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
	});

	return {
		get game() {
			return value;
		},
		get gameInProgress() {
			if (value === undefined) return undefined;
			return value !== null;
		},
		createGame(players: string[]) {
			value = new YatzyGame(players);
		},
		exitGame() {
			if (value) history = [value, ...history];
			value = null;
		},
		setField(playerI: number, fieldI: number, val: number | null) {
			if (!value) return;
			value = value.setField(playerI, fieldI, val);
		},
		get history() {
			return history;
		},
		removeFromHistory(i: number) {
			history = [...history.slice(0, i), ...history.slice(i + 1)];
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

import { writable } from 'svelte/store';
import { YatzyGame } from './yatzy-game';

export const gameState = writable<YatzyGame | null | undefined>(undefined);

// Init state
try {
	const state = YatzyGame.fromJSON(JSON.parse(localStorage.getItem('game-state') ?? ''));
	gameState.set(state);
} catch (error) {
	console.error(error);
	gameState.set(null);
}

gameState.subscribe((value) => {
	if (!value) {
		localStorage.removeItem('game-state');
	} else {
		localStorage.setItem('game-state', JSON.stringify(value));
	}
});

export function createGame(players: string[]) {
	gameState.set(new YatzyGame(players));
	document.location.href = '/game';
}

export function exitGame() {
	gameState.set(null);
	document.location.href = '/new-game';
}

export function setFieldAndSave(playerI: number, fieldI: number, value: number | null) {
	gameState.update((game) => {
		game?._setField(playerI, fieldI, value);
		return game;
	});
}

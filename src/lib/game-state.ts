import { writable } from 'svelte/store';
import { YatzyGame } from './yatzy-game';

const storedGame = (() => {
	try {
		return YatzyGame.fromJSON(JSON.parse(localStorage.getItem('game-state') ?? ''));
	} catch (error) {
		console.error(error);
		return undefined;
	}
})();

export const gameState = writable<YatzyGame | undefined>(storedGame);

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
	gameState.set(undefined);
	document.location.href = '/new-game';
}

export function setFieldAndSave(playerI: number, fieldI: number, value: number | null) {
	gameState.update((game) => {
		game?._setField(playerI, fieldI, value);
		return game;
	});
}

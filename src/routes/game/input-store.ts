import { writable } from 'svelte/store';

interface InputStore {
	player: number;
	dice: (number | null)[];
	selectedDice: number;
	erase: boolean;
}

export const inputStore = writable<InputStore>({
	player: 0,
	dice: new Array(5).fill(null),
	selectedDice: 0,
	erase: false
});

export function updateInputs(vals: Partial<InputStore>) {
	inputStore.update((v) => ({
		...v,
		...vals
	}));
}

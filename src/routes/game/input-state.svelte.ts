import { getContext, setContext } from 'svelte';

interface _InputState {
	player: number;
	dice: (number | null)[];
	selectedDice: number;
	erase: boolean;
}

function createInputState() {
	const state = $state<_InputState>({
		player: 0,
		dice: new Array(5).fill(null),
		selectedDice: 0,
		erase: false
	});

	return {
		get player() {
			return state.player;
		},
		set player(v: number) {
			state.player = v;
		},
		get dice() {
			return state.dice;
		},
		set dice(v: (number | null)[]) {
			state.dice = v;
		},
		get selectedDice() {
			return state.selectedDice;
		},
		set selectedDice(v: number) {
			state.selectedDice = v;
		},
		get erase() {
			return state.erase;
		},
		set erase(v: boolean) {
			state.erase = v;
		}
	};
}

const INPUT_STATE = 'INPUT_STATE';

export type InputState = ReturnType<typeof createInputState>;

export function setInputContext() {
	return setContext<InputState>(INPUT_STATE, createInputState());
}

export function getInputContext() {
	return getContext<InputState>(INPUT_STATE);
}

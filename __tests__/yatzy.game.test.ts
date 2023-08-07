import { YatzyGame } from '@/logic/yatzy_game';

describe('Game init', () => {
  test('One player game', () => {
    const game = new YatzyGame(['Jakob']);

    expect(game.players).toStrictEqual(['Jakob']);
    expect(game.fields.length).toBeGreaterThan(0);
    expect(game.scores.length).toBe(1);
  });

  test('Five player game', () => {
    const game = new YatzyGame(['Jakob', 'Ana', 'Vid', 'Janez', 'Lucija']);

    expect(game.players).toStrictEqual([
      'Jakob',
      'Ana',
      'Vid',
      'Janez',
      'Lucija',
    ]);
    expect(game.fields.length).toBeGreaterThan(0);
    expect(game.scores.length).toBe(5);
  });
});

describe('Serialization', () => {
  test('Test', () => {
    const game = new YatzyGame(['Jakob', 'Ana']);

    expect(YatzyGame.fromJSON(JSON.parse(JSON.stringify(game)))).toStrictEqual(
      game,
    );
  });
});

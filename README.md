# [Yatzy scorecard](https://yatzy.jkob.cc/)

A Svelte app for keeping score in Yatzy.

## Developing

Once you've cloned the repository and installed dependencies with `yarn install`, start a development server:

```bash
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

The app currently uses `adapter-static` adapter for [static site generation](https://kit.svelte.dev/docs/adapter-static).

## Custom Rules

If you play Yatzy a bit differently, you can change the game rules by adding custom fields to [`yatzy-field.ts`](src/lib/yatzy-field.ts) and changing the game logic in [`yatzy-game.ts`](src/lib/yatzy-game.ts).

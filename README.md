# Monkey Typing 🐵🍌

A colorful, responsive HTML5 letter-typing game for early learners (K–2). Help Milo the monkey collect bananas by typing the letter shown on screen.

## Features

- Intro screen with a Start Game button
- 60-second letter practice round
- Random A–Z targets
- Keyboard input and tappable on-screen letters
- Score, bananas, current streak, and best streak
- Positive feedback for correct letters and gentle prompts for mistakes
- End screen, Play Again, and Back to Intro
- Responsive layout for desktop, tablet, and mobile
- No framework, build step, or server required

## Files

- `index.html` — game screens and page structure
- `style.css` — colorful UI, character illustration, and responsive layout
- `game.js` — game state, keyboard controls, scoring, and timer

## Run locally

1. Download and unzip the project.
2. Open `index.html` in a modern browser.

For local development, you may also run a simple static server, but it is not required.

## Publish with GitHub Pages

1. Sign in to GitHub and create a new repository, for example `monkey-typing`.
2. Upload `index.html`, `style.css`, `game.js`, and `README.md` to the **root** of the repository.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for the deployment to finish. GitHub will show the published URL in the Pages section.

The game uses relative asset paths and works on a project site URL such as `https://YOUR-USERNAME.github.io/monkey-typing/`.

## Customize

- Change the round length in `game.js` by editing `timeLeft: 60` in the initial state and the reset state in `startGame()`.
- Adjust points per correct letter by changing `state.score += 10`.
- Edit intro and end-screen copy in `index.html` and `game.js`.
- Update colors and layout in `style.css`.

## Accessibility notes

- The interface uses semantic buttons, visible text feedback, and an `aria-live` region for feedback.
- The game can be played using a physical keyboard or by tapping the on-screen letter buttons.
- Reduced-motion preferences are respected.

## License

This starter project is provided for you to customize. Review any third-party assets or fonts you add before publishing. The current monkey artwork is CSS-drawn and emoji-based; Google Fonts is an optional external font loaded by CSS, with system-font fallbacks.

(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const screens = {
    intro: $("intro-screen"),
    game: $("game-screen"),
    result: $("result-screen")
  };
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const state = {
    score: 0, bananas: 0, streak: 0, bestStreak: 0,
    timeLeft: 60, target: "A", running: false, timerId: null,
    lastTarget: "", correct: 0, mistakes: 0
  };

  const targetEl = $("target-letter");
  const targetCard = $("target-card");
  const monkey = $("game-monkey");
  const bananaBunch = $("banana-bunch");
  const feedback = $("feedback");
  const keyButtons = [...document.querySelectorAll("[data-letter]")];

  function showScreen(name) {
    Object.entries(screens).forEach(([key, element]) => {
      element.classList.toggle("hidden", key !== name);
    });
  }

  function setFeedback(message, type = "") {
    feedback.textContent = message;
    feedback.className = `feedback ${type}`.trim();
  }

  function updateStats() {
    $("score").textContent = state.score;
    $("bananas").textContent = state.bananas;
    $("streak").textContent = state.streak;
    $("time").textContent = state.timeLeft;
  }

  function chooseTarget() {
    let next = state.target;
    while (next === state.target && letters.length > 1) {
      next = letters[Math.floor(Math.random() * letters.length)];
    }
    state.lastTarget = state.target;
    state.target = next;
    targetEl.textContent = next;
    keyButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.letter === next);
    });
  }

  function startGame() {
    stopTimer();
    Object.assign(state, {
      score: 0, bananas: 0, streak: 0, bestStreak: 0,
      timeLeft: 60, target: "", running: true,
      lastTarget: "", correct: 0, mistakes: 0
    });
    monkey.style.left = window.matchMedia("(max-width: 760px)").matches ? "12%" : "22%";
    bananaBunch.style.opacity = "1";
    bananaBunch.style.transform = "scale(1)";
    updateStats();
    chooseTarget();
    setFeedback("Find the letter and press its key!");
    showScreen("game");
    state.timerId = window.setInterval(() => {
      if (!state.running) return;
      state.timeLeft -= 1;
      updateStats();
      if (state.timeLeft <= 0) finishGame();
    }, 1000);
  }

  function stopTimer() {
    if (state.timerId !== null) {
      window.clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function handleLetter(rawLetter) {
    if (!state.running) return;
    const letter = String(rawLetter).toUpperCase();
    if (!/^[A-Z]$/.test(letter)) return;

    if (letter === state.target) {
      state.correct += 1;
      state.score += 10;
      state.bananas += 1;
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      setFeedback(["Great job! 🍌", "You got it! ⭐", "Awesome typing! 🌟", "Way to go! 🐵"][Math.floor(Math.random() * 4)], "good");
      monkey.classList.remove("jump");
      void monkey.offsetWidth;
      monkey.classList.add("jump");
      bananaBunch.style.transform = "scale(1.45) rotate(12deg)";
      bananaBunch.style.opacity = ".35";
      window.setTimeout(() => {
        if (!state.running) return;
        bananaBunch.style.transform = "scale(1)";
        bananaBunch.style.opacity = "1";
      }, 180);
      const progress = Math.min(1, state.score / 300);
      const left = 18 + progress * 42;
      monkey.style.left = `${left}%`;
      chooseTarget();
    } else {
      state.mistakes += 1;
      state.streak = 0;
      setFeedback(`Almost! Look for ${state.target}. Try again!`, "bad");
      targetCard.classList.remove("shake");
      void targetCard.offsetWidth;
      targetCard.classList.add("shake");
    }
    updateStats();
  }

  function finishGame() {
    state.running = false;
    stopTimer();
    keyButtons.forEach((button) => button.classList.remove("active"));
    $("final-score").textContent = state.score;
    $("final-bananas").textContent = state.bananas;
    $("final-streak").textContent = state.bestStreak;
    const copy = state.bananas >= 25
      ? "Incredible! You and Milo are jungle superstars!"
      : state.bananas >= 12
        ? "Great work! You collected lots of bananas with your typing."
        : state.bananas > 0
          ? "Nice practice! Play again to collect even more bananas."
          : "Every typing adventure starts somewhere. Try again with Milo!";
    $("result-copy").textContent = copy;
    showScreen("result");
  }

  $("start-btn").addEventListener("click", startGame);
  $("play-again-btn").addEventListener("click", startGame);
  $("intro-btn").addEventListener("click", () => {
    state.running = false;
    stopTimer();
    showScreen("intro");
  });
  $("home-btn").addEventListener("click", () => {
    state.running = false;
    stopTimer();
    showScreen("intro");
  });

  keyButtons.forEach((button) => {
    button.addEventListener("click", () => handleLetter(button.dataset.letter));
  });

  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    if (screens.game.classList.contains("hidden")) return;
    if (/^[a-z]$/i.test(event.key)) {
      event.preventDefault();
      handleLetter(event.key);
    }
  });

  document.addEventListener("visibilitychange", () => {
    // Avoid unexpected timer behavior while a child switches tabs.
    if (document.hidden && state.running) {
      // The countdown pauses naturally on many browsers; no extra action needed.
    }
  });

  showScreen("intro");
})();

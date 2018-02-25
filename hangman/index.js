(function () {

    "use strict";

    let secret = "";

    let status = "";

    const countCorrects = function () {
        return document.querySelectorAll(".secret.center-text.correct").length;
    };

    const countErrors = function () {

        const img = document.getElementById("gallows");

        return Number(img.src.match(/(\d+).jpg/)[1]);
    };

    const updateGallows = function (reset) {

        const img = document.getElementById("gallows");

        const errors = (reset)
            ? 0
            : countErrors() + 1;

        img.src = `images/gallows-${errors}.jpg`;
    };

    const reenableButtons = function () {

        const buttons = document.querySelectorAll("button:disabled");

        buttons.forEach(function (btn) {
            btn.disabled = false;
        });
    };

    const removeAllChildren = function (node) {
        while (node.firstChild) {
            node.firstChild.remove();
        }
    };

    const loadWord = function () {

        const container = document.getElementById("word");

        removeAllChildren(container);

        for (let i = 0; i < secret.length; i += 1) {

            let div = document.createElement("div");

            div.className = "secret center-text";
            div.appendChild(document.createTextNode("\u200c"));

            container.appendChild(div);
        }
    };

    const chooseSecret = function () {

        const words = ["BUZZED", "PURPOSE", "NICE", "BEE", "FIXED", "FRIGHTENED", "RICH", "NEEDY", "QUARTER", "FLIGHT", "HAMMER", "CROWD", "LACKING", "STRAIGHT", "RUDE", "TRAIN", "CACTUS", "CRATE", "GRAY", "SAVE", "YOUNG"];

        secret = words[Math.floor(Math.random() * words.length)];
    };

    const restart = function () {
        chooseSecret();
        loadWord();
        reenableButtons();
        updateGallows(true);
        status = "playing";
    };

    const finishGame = function () {

        let msg;
        let sound;

        switch (status) {
        case "won":
            msg = "Congratulations! You win!";
            sound = "win-tada.mp3";
            break;
        case "lost":
            msg = "Better luck next time...";
            sound = "lose-hyena.mp3";
            break;
        }

        new Audio(`audio/${sound}`).play();

        // Delay showing message to allow the audio to play
        setTimeout(function () {

            alert(msg);
            restart();
        }, 100);
    };

    const updateStatus = function () {

        const maxErrors = 6;

        if (countErrors() >= maxErrors) {
            status = "lost";
        } else if (countCorrects() === secret.length) {
            status = "won";
        }
    };

    const displayLetter = function (letter) {

        let correct = false;

        secret.split("").forEach(function (secretLtr, idx) {

            if (secretLtr !== letter) {
                return;
            }

            correct = true;

            const div = document.querySelector(`#word > div:nth-child(${idx + 1})`);

            div.classList.add("correct");

            div.firstChild.remove();
            div.appendChild(document.createTextNode(letter));
        });

        return correct;
    };

    const game = function (letter) {

        if (!displayLetter(letter)) {
            updateGallows();
        }

        updateStatus();

        if (status !== "playing") {
            // Delay finishing the game so the browser has time to render the last letter
            setTimeout(finishGame, 100);
        }
    };

    const letterOnclick = function (evt) {

        const btn = evt.currentTarget;

        if (status !== "playing" || btn.disabled) {
            return;
        }

        const letter = btn.firstChild.nodeValue;

        btn.disabled = true;

        game(letter);
    };

    const loadButtons = function () {

        const buttons = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const div = document.getElementById("letters");

        const rowLimit = 10;
        let rowQtt = 0;
        let row;

        buttons.forEach(function (txt) {

            const btn = document.createElement("button");

            btn.id = `btn-${txt}`;
            btn.type = "button";
            btn.addEventListener("click", letterOnclick);
            btn.appendChild(document.createTextNode(txt));

            if (row === undefined || rowQtt >= rowLimit) {
                row = document.createElement("div");
                row.className = "row";
                rowQtt = 0;
                div.appendChild(row);
            }

            row.appendChild(btn);
            rowQtt += 1;
        });
    };

    const setupKeyboard = function () {

        document.addEventListener("keydown", function (evt) {

            if (evt.key.length !== 1) {
                return;
            }

            const btn = document.getElementById(`btn-${evt.key.toUpperCase()}`);

            if (btn !== null) {
                btn.dispatchEvent(new Event("click"));
            }
        });
    };

    const winOnload = function () {

        setupKeyboard();

        loadButtons();

        restart();
    };

    window.onload = winOnload;
}());

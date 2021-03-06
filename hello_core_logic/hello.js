const hello = {
    "Tester Board": {
        "To Do": ["Laundry", "Buy Apples", "Pay Phone Bill"],
        "Doing": ["Laundry", "Studying Javascript", "Studying HTML", "Studying Ruby"],
        "Done": ["Laundry"]
    },
    "Dreams": {
        "Wish List": ["Conquer the Seven Kingdoms", "Get my baby back", "My hand needs to chill"]
    }
};

const listBoards = function () {

    "use strict";

    const lnBrk = "\n";
    const separator = `------------------${lnBrk}`;

    return Object.keys(hello).reduce((str, name, idx) => `${str}${idx + 1}- ${name}${lnBrk}${separator}`, separator);
};

const createBoard = function (boardName) {

    "use strict";

    if (hello[boardName] !== undefined) {
        return "Board already exists";
    }

    hello[boardName] = {};

    return `Board ${boardName} was created`;
};

const removeBoard = function (boardName) {

    "use strict";

    if (hello[boardName] === undefined) {
        return "Board doesn't exist";
    }

    delete hello[boardName];

    return `Board ${boardName} was removed`;
};

const displayBoard = function (boardName) {

    "use strict";

    if (hello[boardName] === undefined) {
        return "Board doesn't exist";
    }

    const lnBrk = "\n";
    const separator = `|--------------${lnBrk}`;

    let str = separator;

    Object.keys(hello[boardName]).forEach(function (list) {

        // Section header (list name)
        str += `| ${list}${lnBrk}${separator}`;

        // Items (cards)
        const bullet = "|> ";
        str += bullet + hello[boardName][list].join("\n" + bullet) + "\n" + separator;
    });

    return str;
};

const createList = function (boardName, listName) {

    "use strict";

    if (hello[boardName] === undefined) {
        return "Board doesn't exist";
    }

    if (hello[boardName][listName] !== undefined) {
        return "List name already exists";
    }

    hello[boardName][listName] = [];

    // If the list was created, return undefined
};

const createCard = function (boardName, listName, cardName) {

    "use strict";

    if (hello[boardName] === undefined) {
        return "Board doesn't exist";
    }

    if (hello[boardName][listName] === undefined) {
        return "List doesn't exist";
    }

    hello[boardName][listName].push(cardName);

    // If the card was added, return undefined
};

const removeList = function (boardName, listName) {

    "use strict";

    if (hello[boardName] === undefined) {
        return "Board doesn't exist";
    }

    if (hello[boardName][listName] === undefined) {
        return "List doesn't exist";
    }

    delete hello[boardName][listName];

    // If the list was deleted, return undefined
};

const removeCard = function (boardName, listName, cardIdx) {

    "use strict";

    if (hello[boardName] === undefined) {
        return "Board doesn't exist";
    }

    if (hello[boardName][listName] === undefined) {
        return "List doesn't exist";
    }

    if (hello[boardName][listName][cardIdx] === undefined) {
        return "Card doesn't exist";
    }

    hello[boardName][listName].splice(cardIdx, 1);

    // If the card was removed, return undefined
};

const moveCard = function (boardName, fromList, toList, fromCardIndex, toCardIndex) {

    "use strict";

    if (hello[boardName] === undefined) {
        return "Board doesn't exist";
    }

    if (hello[boardName][fromList] === undefined) {
        return "List doesn't exist";
    }

    if (hello[boardName][fromList][fromCardIndex] === undefined) {
        return "Card doesn't exist";
    }

    if (hello[boardName][toList] === undefined) {
        return "Destination list doesn't exist";
    }

    if (toCardIndex < 0 || toCardIndex > hello[boardName][toList].length) {
        return "Invalid destination index";
    }

    // Insert card in the destination list
    hello[boardName][toList].splice(toCardIndex, 0, hello[boardName][fromList][fromCardIndex]);

    // Remove card from the origin list
    hello[boardName][fromList].splice(fromCardIndex, 1);
};

console.log("listBoards:\n" + listBoards());

console.log("createBoard('Cuisine'): " + createBoard("Cuisine"));
console.log("createBoard('Tester Board'): " + createBoard("Tester Board"));

console.log("removeBoard('Dreams'): " + removeBoard("Dreams"));

console.log("listBoards:\n" + listBoards());

console.log("displayBoard('Tester Board'):\n" + displayBoard("Tester Board"));

console.log("createList('Cuisine', 'Types'): " + createList("Cuisine", "Types"));
console.log("createCard('Cuisine', 'Types', 'Vietnamese'): " + createCard("Cuisine", "Types", "Vietnamese"));

console.log("displayBoard('Cuisine'):\n" + displayBoard("Cuisine"));

console.log("removeList('Tester Board', 'Done'): " + removeList("Tester Board", "Done"));
console.log("removeCard('Tester Board', 'Doing', 2): " + removeCard("Tester Board", "Doing", 2));
console.log("moveCard('Tester Board', 'Doing', 'To Do', 1, 1): " + moveCard("Tester Board", "Doing", "To Do", 1, 1));

console.log("displayBoard('Tester Board'):\n" + displayBoard("Tester Board"));

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

    const separator = "------------------\n";

    return Object.keys(hello).reduce((str, name, idx) => `${str}${idx + 1}- ${name}\n${separator}`, separator);
};

const createBoard = function (boardName) {

    if (hello[boardName] !== undefined) {
        return "Board already exists";
    }

    hello[boardName] = {};

    return `Board ${boardName} was created`;
};

const removeBoard = function (boardName) {

    if (hello[boardName] === undefined) {
        return "Board doesn't exist";
    }

    delete hello[boardName];

    return `Board ${boardName} was removed`;
};

const displayBoard = function (boardName) {

    if (hello[boardName] === undefined) {
        return "Board doesn't exist";
    }

    const separator = "|--------------\n";

    let str = separator;

    Object.keys(hello[boardName]).forEach(function (list) {

        // Section header
        str += `| ${list}\n${separator}`;

        // Items
        const bullet = "|> ";
        str += bullet + hello[boardName][list].join("\n" + bullet) + "\n" + separator;
    });

    return str;
};

console.log("listBoards:\n" + listBoards());

console.log("createBoard('Cuisine'):", createBoard("Cuisine"));
console.log("createBoard('Tester Board'):", createBoard("Tester Board"));

console.log("removeBoard('Dreams'):", removeBoard("Dreams"))

console.log("listBoards:\n" + listBoards());

console.log("displayBoard('Tester Board'):\n" + displayBoard("Tester Board"))

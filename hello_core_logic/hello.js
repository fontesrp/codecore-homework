const hello = {
    'Tester Board': {
      'To Do': ['Laundry', 'Buy Apples', 'Pay Phone Bill'],
      'Doing': ['Laundry', 'Studying Javascript', 'Studying HTML', 'Studying Ruby'],
      'Done': ['Laundry']
    },
    'Dreams': {
      'Wish List': ['Conquer the Seven Kingdoms', 'Get my baby back', 'My hand needs to chill'],
    }
};

const listBoards = function () {

    const separator = "------------------\n";

    return Object.keys(hello).reduce((str, key, idx) => `${str}${idx + 1}- ${key}\n${separator}`, separator);
};

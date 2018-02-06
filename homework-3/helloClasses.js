class Task {

    constructor(name, assignee) {
        Object.assign(this, {
            name: name,
            assignee: assignee
        });
    }

    render() {
        return (this.assignee === undefined)
            ? this.name
            : this.name + " • " + this.assignee;
    }
}

class List {

    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask() {
        Array.prototype.push.apply(this.tasks, arguments);
        return this;
    }

    removeTask(name) {

        let taskIdx;

        this.tasks.find(function (task, idx) {

            if (task.name === name) {
                taskIdx = idx;
                return true;
            }

            return false;
        });

        return (taskIdx === undefined)
            ? null
            : this.tasks.splice(taskIdx, 1)[0];
    }

    render() {

        const separator = "|---------\n";
        const lineStarter = "| ";

        return separator + lineStarter + this.name + "\n" + separator + this.tasks.map((task, idx) => lineStarter + idx + "> " + task.render() + "\n").join("") + "|";
    }
}

class Board {

    constructor(name) {
        this.name = name;
        this.lists = [];
    }

    addList(list) {
        this.lists.push(list);
        return this;
    }

    findList(name) {

        let listIdx = -1;

        this.lists.find(function (list, idx) {

            if (list.name === name) {
                listIdx = idx;
                return true;
            }

            return false;
        });

        return listIdx;
    }

    removeList(name) {

        const listIdx = this.findList(name);

        return (listIdx === -1)
            ? null
            : this.lists.splice(listIdx, 1)[0];
    }

    render() {

        const separator = "*".repeat(this.name.length + 4) + "\n";

        return separator + "* " + this.name + " *\n" + separator + this.lists.map((list) => list.render()).join("\n") + "\n";
    }

    moveTaskTo(taskName, origName, destName) {

        const origIdx = this.findList(origName);

        if (origIdx === -1) {
            return;
        }

        const destIdx = this.findList(destName);

        if (destIdx === -1) {
            return;
        }

        const task = this.lists[origIdx].removeTask(taskName);

        if (task === null) {
            return;
        }

        this.lists[destIdx].addTask(task);
    }
}

const myTask = new Task("Clean dishes");
const myTaskWithAssignee = new Task("Wash clothes", "You");

console.log(myTask.render());
console.log(myTaskWithAssignee.render());

const toDoList = new List("To Do");

// adds "Laundry" task to "To Do" list
toDoList.addTask(new Task("Laundry", "You"));
// also works by chaining
toDoList
    .addTask(new Task("Buy Apples"))
    .addTask(new Task("Pay Phone Bill", "Me"));
// also works
toDoList.addTask(new Task("Buy Bananas"), new Task("Go hicking", "Me"), new Task("T3", "Me"));

console.log(toDoList.tasks);

console.log(toDoList.removeTask("Buy Apples"));
console.log(toDoList.removeTask("Buy Apples"));

console.log(toDoList.render());

const toDoList2 = new List("To Do")
    .addTask(new Task("Laundry", "You"))
    .addTask(new Task("Buy Apples"))
    .addTask(new Task("Pay Phone Bill", "Me"));

const doingList = new List("Doing")
    .addTask(new Task("Laundry"))
    .addTask(new Task("Study JavaScript", "Jill"))
    .addTask(new Task("Study HTML", "Jill"))
    .addTask(new Task("Study Ruby", "Me"));

const doneList = new List("Done")
    .addTask(new Task("Laundry"))
    .addTask(new Task("Ruby Exercises Homework"));

const myBoard = new Board("My Board")
    .addList(toDoList2)
    .addList(doingList)
    .addList(doneList);

myBoard.addList(new List("Remove Me!"));

// Finds and removes the list named "Remove Me!"
myBoard.removeList("Remove Me!");

console.log(myBoard.render());

myBoard.moveTaskTo("Laundry", "To Do", "Doing");
myBoard.moveTaskTo("Buy Apples", "To Do", "Doing");

console.log(myBoard.render());

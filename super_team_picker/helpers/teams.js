(function () {

    "use strict";

    const randBetween = function (min, max) {

        return Math.floor(Math.random() * (max - min)) + min;
    };

    const shuffle = function (usrArr) {

        const arr = usrArr.slice();

        arr.forEach(function (curr, idx) {

            let rand = randBetween(idx, arr.length);

            arr[idx] = arr[rand];
            arr[rand] = curr;
        });

        return arr;
    };

    const byTeamCount = function (qtt, members) {

        const teams = Array.from({
            length: qtt
        });

        let t = 0;

        shuffle(members).forEach(function (name) {

            if (teams[t] === undefined) {
                teams[t] = [name];
            } else {
                teams[t].push(name);
            }

            t += 1;

            if (t >= qtt) {
                t = 0;
            }
        });

        return teams;
    };

    const byTeamSize = function (qtt, members) {

        const teamQtt = Math.round(members.length / qtt);

        return byTeamCount(teamQtt, members);
    };

    exports.divide = function (method, qtt, members) {

        const mem = members.split(",").map(name => name.trim());
        qtt = Number(qtt);

        switch (method) {
        case "teamCount":
            return byTeamCount(qtt, mem);
        case "numberPerTeam":
            return byTeamSize(qtt, mem);
        }
    };
})();

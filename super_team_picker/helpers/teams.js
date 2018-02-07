(function () {

    "use strict";

    const randBetween = function (min, max) {

        return Math.floor(Math.random() * (max - min)) + min;
    };

    const shuffle = function (usrArr) {

        const arr = usrArr.slice();

        for (let i = 0; i < arr.length; i += 1) {

            let idx = randBetween(i, arr.length);

            let tmp = arr[idx];
            arr[idx] = arr[i];
            arr[i] = tmp;
        }

        return arr;
    };

    const byTeamSize = function (qtt, members) {

        const teams = [];

        for (let m = 0; m < members.length; m += qtt) {
            teams.push(members.slice(m, m + qtt));
        }

        return teams;
    };

    const byTeamCount = function (qtt, members) {

        const teams = Array.from({
            length: qtt
        });

        let t = 0;

        members.forEach(function (name) {

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

    exports.divide = function (method, qtt, members) {

        const mem = shuffle(members.split(",").map(name => name.trim()));
        qtt = Number(qtt);

        switch (method) {
        case "teamCount":
            return byTeamCount(qtt, mem);
        case "numberPerTeam":
            return byTeamSize(qtt, mem);
        }
    };
})();


exports.up = function(knex) {

    "use strict";

    return knex.schema.createTable("cohorts", function (table) {

        table.increments("id");

        table.string("name");
        table.text("logo");
        table.text("members");

        table.timestamps(false, true);
    });
};

exports.down = function(knex) {

    "use strict";

    return knex.schema.dropTale("cohorts");
};

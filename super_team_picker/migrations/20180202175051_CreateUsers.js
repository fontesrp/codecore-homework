
exports.up = function(knex) {

    "use strict";

    return knex.schema.createTable("users", function (table) {

        table.increments("id");

        table.string("name");
        table.integer("cohord_id");

        table.timestamps(false, true);
    });
};

exports.down = function(knex) {

    "use strict";

    return knex.schema.dropTable("users");
};

// Update with your config settings.

const sharedConfig = {
    client: "postgresql",
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: "knex_migrations"
    }
};

module.exports = {

    development: {
        ...sharedConfig,
        connection: {
            database: "super_team_picker"
        }
    },

    staging: {
        ...sharedConfig,
        connection: {
            database: "super_team_picker_stg"
        }
    },

    production: {
        ...sharedConfig,
        connection: {
            database: "super_team_picker_prd"
        }
    }
};

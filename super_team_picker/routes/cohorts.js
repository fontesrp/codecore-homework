const express = require("express");
const knex = require("../db");
const teams = require("../helpers/teams.js");
const router = express.Router();

(function () {

    "use strict";

    router.get("/", function (req, res, next) {

        knex.select()
            .from("cohorts")
            .orderBy("created_at", "DESC")
            .then(function (results) {
                res.render("cohorts/index", {
                    title: "Cohorts",
                    cohorts: results
                });
            });
    });

    router.post("/", function (req, res, next) {

        if (req.body.logo === undefined || req.body.name === undefined || req.body.members === undefined) {
            res.redirect("/cohorts");
            return;
        }

        knex.insert({
            logo: req.body.logo,
            name: req.body.name,
            members: req.body.members
        }).into("cohorts").then(function () {
            res.redirect("/cohorts");
        });
    });

    router.get("/new", function (req, res, next) {

        res.render("cohorts/new", {
            title: "New Cohort"
        });
    });

    router.get("/:id", function (req, res, next) {

        const id = req.params.id;
        const method = req.query.method;
        const qtt = req.query.qtt;

        knex.first()
            .from("cohorts")
            .where("id", id)
            .then(function (results) {

                return res.render("cohorts/show", {
                    title: `Cohort ${id}`,
                    cohort: results,
                    teams: (qtt === undefined || method === undefined)
                        ? []
                        : teams.divide(method, qtt, results.members)
                });
            });
    });

    module.exports = router;
})();

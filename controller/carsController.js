const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const sequelize = require("sequelize");
const {Cars} = require("../models");
const {Type_Cars} = require("../models");

const homepageView = (req, res) => {
    axios
        .get("http://localhost:8000/api/v1/Cars")
        .then((response) => {
            res.render("index", {cars: response.data, moment: moment});
        })
        .catch((error) => {
            console.log(error);
        });
};

const inputView = (req, res) => {
    res.render("input-car");
};

const editView = (req, res) => {
    axios
        .get("http://localhost:8000/api/v1/Cars/" + req.params.id)
        .then((response) => {
            res.render("edit-car", {cars: response.data});
        })
        .catch((error) => {
            console.log(error);
        });
};

const filterResult = (req, res) => {
    axios
        .get("http://localhost:8000/api/v1/FilterCars/" + req.params.id)
        .then((response) => {
            res.render("index", {cars: response.data, moment: moment});
        })
        .catch((error) => {
            console.log(error);
        });
};

const searchResult = (req, res) => {
    if (req.body.search === "" || req.body.search === null) {
        return res.redirect("/");
    } else {
        axios
            .get("http://localhost:8000/api/v1/SearchCars/" + req.body.search)
            .then((response) => {
                res.render("index", {cars: response.data, moment: moment});
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

const createCar = (req, res, next) => {
    const car = new Cars({
        name_car: req.body.name_car,
        rent_cost: req.body.rent_cost,
        image_car: req.file.filename,
        id_type: req.body.id_type,
    });
    car.save().then((result) => {
        res.send('<script>window.location.href="/";document.getElementById("alert-save").click();</script>');
    });
};

const getCars = async (req, res) => {
    try {
        cars = await Cars.findAll({
            include: [{model: Type_Cars, as: "type_car"}],
        });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const filterAPI = async (req, res) => {
    try {
        cars = await Cars.findAll({
            where: {id_type: req.params.id},
            include: [{model: Type_Cars, as: "type_car"}],
        });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const searchAPI = async (req, res) => {
    try {
        const lookFor = req.params.search.toLowerCase();
        cars = await Cars.findAll({
            where: {
                name_car: sequelize.where(sequelize.fn("LOWER", sequelize.col("name_car")), "LIKE", "%" + lookFor + "%"),
            },
            include: [{model: Type_Cars, as: "type_car"}],
        });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getCar = async (req, res) => {
    try {
        const cars = await Cars.findOne({
            where: {id: req.params.id},
            include: [{model: Type_Cars, as: "type_car"}],
        });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateCar = async (req, res) => {
    try {
        const {name_car, rent_cost, id_type} = req.body;
        const image_car = req.file.filename;
        const cars = await Cars.findOne({
            where: {id: req.params.id},
        });
        fs.unlink(path.join(__dirname, "../uploads/" + cars.image_car), (err) => {
            if (err) {
                console.log(err);
            }
        });
        await Cars.update(
            {
                name_car: name_car,
                rent_cost: rent_cost,
                image_car: image_car,
                id_type: id_type,
            },
            {
                where: {id: req.params.id},
            }
        );
        res.send('<script>window.location.href="/";</script>');
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const deleteCar = async (req, res) => {
    try {
        const cars = await Cars.findOne({where: {id: req.params.id}});
        cars.destroy(req.body);
        fs.unlinkSync(path.join(__dirname, "../uploads/" + cars.image_car));
        res.redirect("/");
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const createTypeCar = async (req, res) => {
    Type_Cars.create(req.body)
        .then((Type_Cars) => {
            res.status(201).json(Type_Cars);
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message,
            });
        });
};

module.exports = {
    homepageView,
    inputView,
    editView,
    filterResult,
    searchResult,
    createCar,
    getCars,
    filterAPI,
    searchAPI,
    getCar,
    updateCar,
    deleteCar,
    createTypeCar,
};

const express = require("express");
const router = express.Router();
const sensorData = require("../services/sensor-data");

/* GET sensor data */
router.get("/", async function (req, res, next) {
  try {
    res.json(await sensorData.getMultiple(req.query.page, req.query.date));
  } catch (err) {
    console.error(`Error while getting sensor data `, err.message);
    next(err);
  }
});

/* POST sensor data */
router.post("/", async function (req, res, next) {
  // console.log(`${JSON.stringify(req.body)}`);
  try {
    res.json(await sensorData.create(req.body));
  } catch (err) {
    console.error(`Error while creating sensor data record`, err.message);
    next(err);
  }
});

/* PUT sensor data */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await sensorData.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating sensor data record`, err.message);
    next(err);
  }
});

/* DELETE sensor data */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await sensorData.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting sensor data record`, err.message);
    next(err);
  }
});

module.exports = router;

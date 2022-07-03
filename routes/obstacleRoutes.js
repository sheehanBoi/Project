var express = require('express');
var router = express.Router();
var obstaclesModel = require("../models/obstaclesModel")

router.get('/:pmMatchId', async function(req, res){
    let pmMatchId = req.params.pmMatchId;
    console.log("Get obstacle info with pmId: " +pmMatchId);
    let result = await obstaclesModel.getObstacles(pmMatchId);
    res.status(result.status).send(result.result);
});

module.exports = router;
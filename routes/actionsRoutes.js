var express = require('express');
var router = express.Router();
var aModel = require("../models/actionsModel")


router.get('/:pmId', async function(req, res, next) {
    let pmId = req.params.pmId;
    console.log("Get actions for player with pmId: "+pmId);
    let result = await aModel.getActions(pmId);
    res.status(result.status).send(result.result);
  });


router.put('/:pmId/actions/:paId', async function(req, res, next) {
    let paId = req.params.paId;
    let pmId = req.params.pmId;
    console.log("Action  with id "+paId+" done by pmId "+ pmId);
    let result = await aModel.makeAction(pmId,paId);
    res.status(result.status).send(result.result);    
  });
  


module.exports = router;

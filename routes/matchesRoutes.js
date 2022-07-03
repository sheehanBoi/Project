var express = require('express');
var router = express.Router();
var pModel = require("../models/matchesModel")

router.put('/:mId', async function(req, res, next) {
  let mId = req.params.mId;
  let action = req.body.action;
  console.log("Action on match nº "+mId+" : "+ action);
  if (action == 'reset') {
    let result = await pModel.resetMatch(mId);
    res.status(result.status).send(result.result);
  } else 
    res.status(400).send({msg: "Action not known."});
});

router.get('/playermatches/:pmId', async function(req, res, next) {
  let pmId = req.params.pmId;
  console.log("Get player info for pmId: "+pmId);
  let result = await pModel.getPlayerMatch(pmId);
  res.status(result.status).send(result.result);
});

module.exports = router;

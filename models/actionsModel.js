var pool = require('./connection')
var mModel = require('./matchesModel')

module.exports.getActions = async function (pmId) {
    try {
        let sql = `select * from playeraction
                        where pa_pm_id = $1 and pa_state = 'Hand'`;
        let res = await pool.query(sql, [pmId]);
        return { status: 200, result: res.rows };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}

module.exports.makeAction = async function (pmId,paId) {
    try {
        let sql = `select * from playeraction
                        where pa_pm_id = $1 and pa_id = $2`;
        let res = await pool.query(sql, [pmId,paId]);
        if (res.rows.length == 0)
            return { status: 400, result: {msg: "That action does not belong to the player"} };    
        let action = res.rows[0];
        if (action.pa_state != "Hand")
            return { status: 400, result: {msg: "That action was already played"} };    
        sql = `select * from playermatch where pm_id = $1`;
        res = await pool.query(sql, [pmId]);
        let player = res.rows[0];
        sql = `update playeraction set pa_state = $1
               where pa_id = $2`;
        await pool.query(sql, [player.pm_state,paId]);

        let pmSql = `update playermatch set pm_state = $1
                where pm_id = $2`
        if (player.pm_state == "FirstPlay") {
            await pool.query(pmSql, ["SecondPlay",pmId]);
        } else {
            let oppRes = await mModel.getOpponent(pmId, player.pm_match_id);
            let opp = oppRes.result;
            if (opp.pm_state != "EndTurn") {
                await pool.query(pmSql, ["EndTurn",pmId]);           
            } else { // both players finished
                // --- QUestion 4 in here, it ended up being to complex :(
                
                // make actions
                await runAction(player,opp,"FirstPlay");
                await runAction(player,opp,"SecondPlay");
                let sqlUp = `update playermatch set pm_x = $1, pm_y = $2, 
                       pm_count = $3, pm_extra = $4, pm_state = 'FirstPlay'
                       where pm_id = $5`;
                console.log([player.pm_x, player.pm_y,
                    player.pm_count, player.pm_extra, player.pm_id]);
                await pool.query(sqlUp, [player.pm_x, player.pm_y,
                    player.pm_count, player.pm_extra, player.pm_id]);           
                await pool.query(sqlUp, [opp.pm_x, opp.pm_y,
                    opp.pm_count, opp.pm_extra, opp.pm_id]);           
                // update actions of players
                sql = `update playeraction set pa_state = 'Hand' 
                        where pa_pm_id = $1 and pa_name = 'Attack'`;
                await pool.query(sql, [player.pm_id]);
                await pool.query(sql, [opp.pm_id]);
                sql = `delete from playeraction where pa_pm_id = $1 and
                        pa_name != 'Attack' and pa_state != 'Hand'`;
                await pool.query(sql, [player.pm_id]);
                await pool.query(sql, [opp.pm_id]);
                // generate 2 new actions each
                await insertRandomAction(player.pm_id);
                await insertRandomAction(player.pm_id);
                await insertRandomAction(opp.pm_id);
                await insertRandomAction(opp.pm_id);
            }
        }

        return { status: 200, result: {msg:"Action done"} };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}

async function  runAction(player,opponent, state) {
    let sqlActions = `select * from playeraction where pa_pm_id = $1
                                  and pa_state = $2`;
    res = await pool.query(sqlActions, [player.pm_id,state]);
    let p1a = res.rows[0];
    res = await pool.query(sqlActions, [opponent.pm_id,state]);
    let o1a = res.rows[0];
    if (p1a.pa_name != "Attack") {
        executeMove(player, p1a.pa_name);                  
    }
    if (o1a.pa_name != "Attack") {
        executeMove(opponent, o1a.pa_name);
    }
    if (p1a.pa_name == "Attack") {
        executeAttack(player, opponent);                  
    }
    if (o1a.pa_name == "Attack") {
        executeAttack( opponent, player);                  
    }
}

function executeAttack(player, opponent) {
    console.log(player, opponent)
    if (player.pm_extra == "N" || player.pm_extra == "S") {
        if (opponent.pm_x <= player.pm_x+3 && opponent.pm_x >= player.pm_x-3 &&
            opponent.pm_y == player.pm_y)
            opponent.pm_count--;
    } else {
        if (opponent.pm_y <= player.pm_y+3 && opponent.pm_y >= player.pm_y-3 &&
            opponent.pm_x == player.pm_x)
            opponent.pm_count--;
    }
}

function executeMove(player, move) {
    switch(move) {
        case "Up": 
            if (player.pm_y != 0) player.pm_y--; 
            player.pm_extra = "N";
            break;
        case "Down": 
            if (player.pm_y != 9) player.pm_y++; 
            player.pm_extra = "S";
            break;
        case "Left":
            if (player.pm_x != 0) player.pm_x--; 
            player.pm_extra = "W";
            break;
        case "Right":
            if (player.pm_x != 9) player.pm_x++; 
            player.pm_extra = "E";
            break;
    }
}


async function insertRandomAction(pmId) {
    let actions =["Left", "Right", "Up", "Down"];
    let randAct = actions[ Math.floor(Math.random()*actions.length)];
    let sql = `Insert into playeraction(pa_pm_id,pa_name,pa_state)
                values ($1,$2,'Hand')`;
    await pool.query(sql, [pmId,randAct]);   
}
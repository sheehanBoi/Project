var pool = require('./connection.js')

let obstaclePosition = [{x:2,y:6},{x:7,y:6},{x:4,y:5},{x:5,y:5},{x:0,y:4},{x:9,y:4},{x:3,y:2},{x:6,y:2},{x:4,y:0},{x:5,y:0}]

module.exports.resetMatch = async function (mId) {
    try {
        let sqlPlayers = `select * from playermatch where pm_match_id = $1 `;
        let resPlayers = await pool.query(sqlPlayers, [mId]);
        if (resPlayers.rows.length != 2)
           return { status: 400, 
                    result: {msg: "Not a match!"} };
        let p1 = resPlayers.rows[0];
        let p2 = resPlayers.rows[1];
        // update player match state back to start
        let upPm = `update playermatch 
                set pm_x = $1, pm_y = $2, 
                 pm_state = 'FirstPlay', pm_count = 3
                 where pm_id =$3`
        await pool.query(upPm, [1, 1, p1.pm_id]);
        await pool.query(upPm, [8, 8, p2.pm_id]);
        // Delete old actions
        let sqlDelAct = `delete from playeraction where pa_pm_id = $1`;
        await pool.query(sqlDelAct, [p1.pm_id]);
        await pool.query(sqlDelAct, [p2.pm_id]);
        // insert 2 actions for each
        let insAct = `insert into playeraction(pa_pm_id,pa_name,pa_state)
                    values($1,$2,$3)`;
        await pool.query(insAct, [p1.pm_id,'Attack','Hand']);
        await pool.query(insAct, [p1.pm_id,'Right','Hand']);
        await pool.query(insAct, [p1.pm_id,'Down','Hand']);
        await pool.query(insAct, [p2.pm_id,'Attack','Hand']);
        await pool.query(insAct, [p2.pm_id,'Left','Hand']);
        await pool.query(insAct, [p2.pm_id,'Up','Hand']);

        let deleteObstacles = `delete from matchobject where mo_match_id = $1 `;
        await pool.query(deleteObstacles, [mId]);
        
        let insertObstacles = `insert into matchobject(mo_match_id,mo_x,mo_y) values($1,$2,$3)`;
        for (let obstacle of obstaclePosition) {
            await pool.query(insertObstacles, [mId,obstacle.x,obstacle.y]);    
        }

        return { status: 200, result: {msg: "Reset successful!"} };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}



module.exports.getPlayerMatch = async function (pmId) {
    try {
        let sql = `select * from player,playermatch
                        where pm_id = $1 and ply_id = pm_player_id`;
        let res = await pool.query(sql, [pmId]);
        if (res.rows.length == 0)
            return { status: 404, result: { msg: "That player is not on a match" } };
        return { status: 200, result: res.rows[0] };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}


module.exports.getOpponent = async function (pmId, matchId) {
    try {
        let sqlCheckOp = `select * from playermatch 
                          where pm_match_id = $1
                          and pm_id != $2`;
        let resCheckOp = await pool.query(sqlCheckOp, [matchId, pmId]);
        if (resCheckOp.rows.length == 0)  
            return { status: 400, result: { msg: "That match is missing an opponent" } };
        return { status:200, result:resCheckOp.rows[0] };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}
var pool = require('./connection');

module.exports.getObstacles = async function (pmMatchId){
    try{
        let sql = `select * from matchobject where mo_match_id = $1`;
        let res = await pool.query(sql,[pmMatchId]);
        return{status: 200, result: res.rows};
    }   catch(err){
        console.log(err);
        return {status: 500, result: err};
    }
}
async function requestObstacles(pmMatchId){
    try{
        const response = await fetch(`/api/obstacles/${pmMatchId}`);
        var result = await response.json();
        return result;
    }   catch(err){
        console.log(err);
    }
    
}
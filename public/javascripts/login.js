function login(pmId,opId) {
    sessionStorage.setItem("pmId",pmId);
    sessionStorage.setItem("opId",opId);
    window.location = "game.html" 
}


async function reset(mId) {
    await requestResetMatch(mId); 
}

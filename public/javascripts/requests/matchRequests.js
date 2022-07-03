
async function requestPlayerMatchInfo(pmId) {
    try {
        const response = await fetch(`/api/matches/playermatches/${pmId}`);
        var result = await response.json();
        return result;
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}


async function requestResetMatch(mId) {
    try {
        const response = await fetch(`/api/matches/${mId}`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "PUT",
          body: JSON.stringify({
            action: "reset",
        })
      });
        var result = await response.json();
        // We are not checking for errors (considering the GUI is only allowing correct choices)
        return result;
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

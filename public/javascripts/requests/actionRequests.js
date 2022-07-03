
async function requestPlayerActions(pmId) {
    try {
        const response = await fetch(`/api/playeractions/${pmId}`);
        var result = await response.json();
        return result;
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}


async function requestMakeAction(pmId,paId,play) {
    try {
        const response = await fetch(`/api/playeractions/${pmId}/actions/${paId}`, 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          method: "PUT"
      });
        var result = await response.json();
        // We are not checking for errors (considering the GUI is only allowing correct choices)
        return result;
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

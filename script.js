
async function getIpData(ip){
    try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_7paJeRBjYAmXJSrsDF3M755NuD3eD&ipAddress=${ip}`);
        const ipData = await response.json();
        console.log(ipData);
    } catch (error) {
        console.error('Error fetching IP data:', error);
    }
}

function validateIP(ip){
    const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(regex.test(ip)){
        getIpData(ip);
    }
}
validateIP("197.33.74.21")
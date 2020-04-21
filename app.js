const axios = require('axios');
var fs = require("fs");
const path = require('path');
const http = require('http');
const url = require('url');
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
 const API_KEY = 'b4642b3321c9e21a4e1efc5ffe1b296c';
 var ENTIRE_API_URL;
 var Full_Path; 
const x = 459.67;
const y = 273.15;
http.createServer(function(req,res){
    const cityName= req.url.replace('/','');
 ENTIRE_API_URL = `${API_URL}${cityName},&appid=${API_KEY}`;
 Full_Path = __dirname+"\\Caching Requests\\" + cityName + ".txt";
const directoryPath = path.join(__dirname, 'Caching Requests');
Cached = CheckCache(directoryPath,cityName);
if(Cached)
{
GetCahedData(res,Full_Path);
}
else
{
 getResponse(res,Full_Path);
}
}).listen(8000);

function CheckCache(Full_Path,cityName)
{
    exist = false
    filename = cityName + ".txt";
    //check if the City is already exists
    fs.readdirSync(Full_Path).forEach(file => {
        if (file == filename) {
            exist = true;
        }
    });
return exist;
}
function GetCahedData(res,Full_Path)
{
    Str_Response = fs.readFileSync(Full_Path);
    json_Response = JSON.parse(Str_Response);
    const message = constructMessageData(json_Response);
       console.log(message);
       res.write(message);
       res.end();
}
function writeNewCacheData(response,Full_Path)
{
    var fs = require('fs');
   response;
   str = JSON.stringify(response.data);
   fs.writeFile(Full_Path, str, function (err) {
    if (err) console.log(err);
     });
}
async function SendREQ()
{
   var result = await axios.get(ENTIRE_API_URL);
   //const directoryPath = path.join(dirname, 'Caching Requests');
   return result;
}
const getResponse = (res,Full_Path)=>{
   
    return SendREQ().then(response =>{
          writeNewCacheData(response,Full_Path);
           const message = constructMessage(response);
           console.log(message);
           res.write(message);
           res.end();
           return message; 
       })
   
       .catch(error => console.log(''));    
        
    }
    function cfahrenheitTemperature(kelvinTemperature){
        var fahrenheitTemperature = (kelvinTemperature * 9/5) - 459.67;
        return  fahrenheitTemperature.toFixed(2);
        //return 1;
    }
    function changeCelciusTemperature(kelvinTemperature)
    {
       var result =  kelvinTemperature - 273.15;
        return result.toFixed(2);
        
    }
    function returnONE(K)
    {
        return 1;
    }
   
function getkelvinData(response)
{
    return response.main.temp;
}
function getcitynameData(response)
{
    return response.name;
}
function getcountrynameData(response)
{
    return response.sys.country;
}
function constructMessageData(response)
{
    const kelvinTemperature = getkelvinData(response);
        const cityName = getcitynameData(response);
        const countryName = getcountrynameData(response);
        // Making K to F and K to C conversions.
        const fahrenheitTemperature = cfahrenheitTemperature(kelvinTemperature);
        const celciusTemperature = changeCelciusTemperature(kelvinTemperature);
 const messageX = `Right now, in \
    ${cityName}, ${countryName} the current temperature is \
    ${fahrenheitTemperature} deg F or \
    ${celciusTemperature} deg C.`.replace(/\s+/g, ' ');
    return messageX;
}
function getkelvin(response)
{
    return response.data.main.temp;
}
function getcityname(response)
{
    return response.data.name;
}
function getcountryname(response)
{
    return response.data.sys.country;
}
function constructMessage(response)
{
    const kelvinTemperature = getkelvin(response);
        const cityName = getcityname(response);
        const countryName = getcountryname(response);
        // Making K to F and K to C conversions.
        const fahrenheitTemperature = cfahrenheitTemperature(kelvinTemperature);
        const celciusTemperature = changeCelciusTemperature(kelvinTemperature);
 const messageX = `Right now, in \
    ${cityName}, ${countryName} the current temperature is \
    ${fahrenheitTemperature} deg F or \
    ${celciusTemperature} deg C.`.replace(/\s+/g, ' ');
    return messageX;
}
exports.getResponse = getResponse;
module.exports={cfahrenheitTemperature,
    changeCelciusTemperature,
returnONE,
constructMessage,
getcityname,
getcountryname,
getResponse,
SendREQ,
GetCahedData,
CheckCache,
writeNewCacheData,
constructMessageData,
getcitynameData,
getcountrynameData,
};
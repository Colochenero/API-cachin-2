const assert = require('assert');
const app = require('./app.js');
http = require('http');

const response= {"data":{"coord":{"lon":31.25,"lat":30.06},"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50n"}],"base":"stations","main":{"temp":290,"feels_like":290.09,"temp_min":289.82,"temp_max":290.15,"pressure":1018,"humidity":88},"visibility":3000,"wind":{"speed":2.1,"deg":80},"clouds":{"all":40},"dt":1584225345,"sys":{"type":1,"id":2514,"country":"EG","sunrise":1584245080,"sunset":1584288188},"timezone":7200,"id":360630,"name":"Cairo","cod":200}}
const responseData= {"coord":{"lon":31.25,"lat":30.06},"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50n"}],"base":"stations","main":{"temp":290,"feels_like":290.09,"temp_min":289.82,"temp_max":290.15,"pressure":1018,"humidity":88},"visibility":3000,"wind":{"speed":2.1,"deg":80},"clouds":{"all":40},"dt":1584225345,"sys":{"type":1,"id":2514,"country":"EG","sunrise":1584245080,"sunset":1584288188},"timezone":7200,"id":360630,"name":"Cairo","cod":200}

    req = {
        url: '/CAIRO',
    }

    res = {
        write: function (message) {
            return true;
        },
        end: function () {
            return true;
        },
        statusCode :"200",
      }
      const Full_Path = __dirname+"\\Caching Requests\\" + "CAIRO" + ".txt";
      const direPath=__dirname+"\\Caching Requests\\";

//test unit 1
it('correctly yhe change from KELVIn to fahrenheitTemperature for CAIRO' , ()=>
{

    assert.equal(app.cfahrenheitTemperature(293.15),68.00);
});
//test unit 2
it('change KELVIN temp to CELCIUS for cairo',()=>
{
    assert.equal(app.changeCelciusTemperature(293.15),20.00);
});


/*it('to test SendREQ with Static object Requires **ONLINE support to do it uncomment the commented code when u become connected to the internet',()=>
{
    app.SendREQ().then(result=>{
        assert.equal(result,response);
    })
    
})*/

//test unit 5
it('to test function that returns the city of the static object RESponse', ()=>
{
   assert.equal(app.getcityname(response),'Cairo')
})
//test integration
/*it(' INTEGRAION test beteween SendREQ() & getcityname() requires ONLINE support*** to do it uncomment the commented code when u connected to the internet', ()=>
{

//the next integeration test requires online
   app.SendREQ().then(result=>{
       assert.equal(app.getcityname(result),'Cairo')
   })
})*/
//unit test
it('to test function that returns the country of the static object RESponse', ()=>
{
    assert.equal(app.getcountryname(response),'EG');
})
//test integration
/*it('INTEGRAION test beteween SendREQ() & getcountryname() requires ONLINE support*** to do it uncomment the commented code when u connected to the internet', ()=>
{
    //the next integeration test requires online
   app.SendREQ().then(result=>{
       assert.equal(app.getcountryname(result),'EG')
   })
})*/
//test integration 1
it('to test to constructmessage (integration testing)',()=>
{
    console.log(Full_Path);
    assert.equal(app.constructMessage(response),'Right now, in Cairo, EG the current temperature is 62.33 deg F or 16.85 deg C.');

}
)
it('to test get cached data', ()=>
{
    //console.log(Full_Path);
    assert.equal(app.GetCahedData(res,Full_Path),undefined);
})
it('to test CheckCache',()=>
{
assert.equal(app.CheckCache(direPath,"CAIRO"),true);
})
it('to test CheckCache2',()=>
{
assert.equal(app.CheckCache(direPath,"mmm"),false);
})
it('to test WriteNecachedata',()=>
{
     assert.equal(app.writeNewCacheData(response,Full_Path),undefined);
})
it('to ConstructMessageData',()=>
{
assert.equal(app.constructMessageData(responseData),'Right now, in Cairo, EG the current temperature is 62.33 deg F or 16.85 deg C.');
})
it('to test GetCitynameData',()=>{
    assert.equal(app.getcitynameData(responseData),'Cairo');
})
it('to test getResponce',async ()=>{
    assert.equal(await app.getResponse(res,Full_Path),undefined);
})
it('to test get countrynamedata',()=>{
    assert.equal(app.getcountrynameData(responseData),'EG')
})
    it('should return 200', ()=> {
      http.get('http://localhost:8000', function (resu) {
        assert.equal(200, resu.statusCode);
      })
    })
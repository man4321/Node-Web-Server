const request = require("request")

const forcast = ({latitude:la,longitude:lb}={},callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=074d68554b2d21e3edb122b43c3b86ca&query='+la+','+lb;
        request({url: url,json:true},(error,response)=>{
            if(error){
                callback('there is an error',undefined);
            }
            else if(response.body.success===false){
                callback("ntohing to show",undefined);
            }
            else{
                callback(undefined,response.body);

            }
        })
   
};

// forcast(0,0,(error,response)=>{
//     console.log('error',error);
//     console.log('response:',response);
// })

module.exports = forcast;
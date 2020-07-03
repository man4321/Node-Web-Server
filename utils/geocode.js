const request = require('request');

const geocode = (address,callback)=>{
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoibWFuMTIzdGFrZW4iLCJhIjoiY2tjMzYzajRmMjQ5bjJzbmF2b204OWtuZiJ9.qp_wCEhts289To2mVgOU8g&limit=1';
   request({url:url, json:true},(error,response)=>{
       if(error){
           callback("this is error for not connected",undefined);

       }
       else if(response.body.features.length===0){
           callback("location is not found");
       }
       else{
           callback(undefined,{
               latitude: response.body.features[0].center[0],
               longitude:response.body.features[0].center[1]
           })
       }
   })
}

// geocode('usa',(error,response)=>{
//     console.log('error',error);
//     console.log('response: ',response);
// })

module.exports = geocode;
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast')
console.log(__dirname)
console.log(path.join(__dirname,'/templets/partials'));
const publicDir = path.join(__dirname,'/public')
const viewDir = path.join(__dirname,'/templets/views')
const partialsDir = path.join(__dirname,'/templets/partials')

const app = express();



app.set('view engine','hbs');
app.set('views',viewDir);
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));
app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Manohar Seervi'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Manohar',
        title:'Help',
        help:'For something your help'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name:'Manohar'
    });
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Must provide address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
    
            return res.send({
                error:'address not found'
            })
        }
        
        else {
            // const l = response.latitude;
            // const long = response.longitude;
            // console.log(l, long)
            forcast(data, (error,response) => {
                if(error){
    
                    return res.send({
                        error: 'No forcast available'
                    })
                }
                else{
    
                    res.send({fullresponse:response,
                        temprature: response.current.temperature+" C",
                    location: req.query.address
                           });
                }
            })
        }
    })
    
    
})
app.get('*',(req,res)=>{
    res.render('404-page',{
        title: '4o4 Page',
        name: 'Manohar',
        error:'this is not found'
    })
})

app.listen(3001,()=>{
    console.log('server 3001 is runing...')
});
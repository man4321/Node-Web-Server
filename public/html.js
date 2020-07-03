

console.log('html file is loded');




const form = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.getElementById('message-2');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    message1.textContent='Loading...';
    message2.textContent="";
    search.value="";
    fetch('http://localhost:3001/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.innerText=data.error;
            }
            else{
                message1.textContent = data.location;
                message2.innerText = `The temprature of ${data.location} is ${data.temprature}`;
                console.log(data.temprature);
                console.log(data.location);
            }
        })
    })
    
})

const axios = require('axios');

const auth_h = `${process.env.zoom_client_id}:${process.env.zoom_client_secret}`;
console.log(auth_h, "auth")
const encoded = Buffer.from(auth_h, 'utf8').toString("base64");
const fs = require('fs');
const get_and_store_token = async() =>{
  axios.post('https://zoom.us/oauth/token?grant_type=account_credentials&account_id=NJH-EzNwQ9KfiOAHsRzJMw',{}, {headers:{
    "Authorization":`Basic ${encoded}`,
    "Content-Type": "application/x-www-form-urlencoded"
  }}).then(res=>{
    
    fs.writeFile('./token.json', JSON.stringify({
        ...res.data
    }), (er)=>{
        if(er){
            console.log("Error storing data")
        }
        else{
            console.log("Data stored in token.json")
        }
    })
    return res.data
  }).catch(e=>{
    return e
  })
}

exports.get_and_store_token = get_and_store_token;
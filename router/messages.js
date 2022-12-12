const router = require('express').Router();
const axios = require('axios');
var fs = require('fs');

const util = require('../util/get-token')
const path = require("path");

router.get('/channels', (req, res)=>{
    try{
        const data = fs.readFileSync(path.join(__dirname, '../token.json'));
        const {access_token} = JSON.parse(data);
        axios.get("https://api.zoom.us/v2/chat/users/me/channels", {
            headers:{
                "Authorization":"Bearer " + access_token
            }
        }).then(resp=>{
            res.json({...resp.data})
        }).catch(e=>{
            if(e.response.data.code === 124){
                util.get_and_store_token();
                res.status(400).json({
                    messsage:e.response.data.message + ", Access token refreshed now. Try again"
                })
            }
            else{
                res.status(400).json({
                    messsage:e.response.data.message
                })
            }
        })
    }
    catch{

    }
})

router.post('/send-message', (req, res)=>{
    const { channel_id, message, format_attr, format_type } = req.body
    try{
        const data = fs.readFileSync(path.join(__dirname, '../token.json'));
        const {access_token} = JSON.parse(data);
        axios.post("https://api.zoom.us/v2/chat/users/me/messages",{
            rich_text: [
            {
                "start_position": 0,
                "end_position": 1,
                "format_type": format_type,
                "format_attr": format_attr
            },
            {
                "start_position": 2,
                "end_position": 3,
                "format_type": format_type,
                "format_attr": format_attr
            }
            ],
            message: message,
            
            to_channel: channel_id,
        }, { headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer " + access_token
        } }).then(response=>{
            res.json({
                message:"Message sent"
            })
        }).catch(e=>{
            if(e.response.data.code === 124){
                util.get_and_store_token();
                res.status(400).json({
                    messsage:e.response.data.message + ", Access token refreshed now. Try again"
                })
            }
            else{
                res.status(400).json({
                    messsage:e.response.data.message
                })
            }
            
        })
    }
    catch{
    }
    
})

module.exports = router;
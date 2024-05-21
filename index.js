/**
 * Written by: Keith Brian
 * Uses-cases: OTP-Verification, Bulk-SMS-API
 * 
 */


const express = require('express');
const AfricasTalking = require('africastalking');


require('dotenv').config() // import .env files here


const app = express();
app.use(express.json());


const apiKey = process.env.API_KEY;
const userName = process.env.API_KEY;
const port = process.env.PORT || 8080;



const africastalking = AfricasTalking({username: userName.toString(), apiKey: apiKey.toString()});


// the root end-point

app.get('/', (req, res) => {

    res.status(200).send("Hey there! Glad you're here");

});


// send-sms endpoint

  app.get('/send/:phone/:message',async(res, req) =>{

    const phone = String(res.params.phone);
    const message = String(res.params.message);

   
    try {
        const result = await africastalking.SMS.send({

            to: phone, 
            message: message
           
        });

        console.log(result);
        return req.status(200).json({
            status: "SEND_OK"
        });
        
    } catch (error) {

        console.error(error);
        return req.status(500).json({
            status: "SEND_ERROR"
        });
        
    }


  });


// listen to the server on PORT: 8080

app.listen({port:port}, () => {

    console.log("Server Is running");
}

)
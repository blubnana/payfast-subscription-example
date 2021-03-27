const express = require('express');

const { respond } = require('./task');
const { generateSignature, generateStringFromData, payfastOnSitePayment } = require('./payfast');

let app = express();

app.get('/', (req, res) =>{
    let resp = {
        "detail": "Everything went well on our side."
    }
    res.status(200).send(respond('GET', '1.0.0', resp, 200));
});

app.post('/test-payment', (req, res) => {
    itemName = "TestDemo";
    let orderObj = {
        "merchant_id": "", 
        "merchant_key": "", 
        "return_url": "https://blu-bnana-network.web.app/payments/payfast/return-url.html", 
        "cancel_url": "https://blu-bnana-network.web.app/payments/payfast/cancel-url.html", 
        "notify_url": "https://blu-bnana-network.web.app/payments/payfast/notify-url.html",
        "email_address": 'khomotsozwanedev@gmail.com',
        "amount": "5.00", 
        "item_name": itemName, 
        "subscription_type": "1",
        "billing_date": "2021-03-27",
        "recurring_amount": "5.00",
        "frequency": "3",
        "cycles": "3"
    }

    let pass_phrase = "";

    let signature = generateSignature(orderObj, pass_phrase);
    orderObj["signature"] = signature;
    let orderData = generateStringFromData(orderObj);
    console.log(`❤️❤️❤️ Order Data as String: ${orderData}`);

    payfastOnSitePayment(orderData)
        .then((uuid) => {
            if(uuid !== null ||uuid !== undefined){
                let resp = {
                    "detail": "Fetched the uuid for the transaction well",
                    "obj": uuid,
                    "link": `?id=${uuid}`
                }
                res.status(201).send(respond('POST', '1.0.0', resp, 201));
            }
        })
        .catch((err) => {
            let resp = {
                "detail": "Failed to fetch the uuid for the transaction",
                "obj": err
            }
            res.status(401).send(respond('POST', '1.0.0', resp, 401));
        });
});


app.listen(8080);
console.log('Listening on 8080:');
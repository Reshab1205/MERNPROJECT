require('dotenv').config({ path: './variables.env' });
'use strict';
const sendMsg = require('aws-sns-sms');
const request = require('request');
const awsConfig = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
    };



exports.sendSMSMessage = async (mobile_number, message) => {
    const msg = {
        "message": message,
        "sender": "skeleton-nodejs-server",
        "phoneNumber": `+91${mobile_number}`
        };
        console.log('----------SNS-SMS-SEND-BODY-----',msg);
        console.log('-----------SNS-SMS-SEND-BODY-------',awsConfig);
    return sendMsg(awsConfig, msg).then(data => {
        console.log("----------SNS-SMS-SEND-SUCCESS----------", data);
    })
    .catch(err => {
        console.log("-----------SNS-SMS-SEND-FAILED----------", err);
    });
}
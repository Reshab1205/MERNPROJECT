require('dotenv').config({ path: './variables.env' });
let aws = require('aws-sdk');
let emailSourceAddress = 'skeleton-nodejs-server@gmail.com';

exports.sendHtmlEmail = function (toAddresses, ccAddresses, subject, htmlContent, bccAddresses){
    return new Promise(function(resolve, reject) {
		let sesConfig = {
		    accessKeyId: process.env.ACCESS_KEY_ID,
		    secretAccessKey: process.env.SECRET_ACCESS_KEY,
		    region: process.env.AWS_REGION
		};
		subject = subject;
		let params = {
		    Destination: {
				ToAddresses: toAddresses,
		        CcAddresses: ccAddresses,
		        BccAddresses: bccAddresses
		    },
		    Message: {
		        Body: {
		            Html: {
		                Charset: 'UTF-8',
		                Data: htmlContent
		            }
		        },
		        Subject: {
		            Charset: 'UTF-8',
		            Data: subject
		        }
		    },
		    Source: emailSourceAddress
		};

		try {
		    let ses = new aws.SES(sesConfig);
		    ses.sendEmail(params, function (error, data) {
		    	if(error){
					console.log(`--HTML:EMAIL--ERROR--TOADDRESS-${toAddresses}--&--ERROR-${error}`);
					resolve("success");
		    	}else{
					console.log('--HTML:EMAIL--SUCCESS--',data);
		    		resolve("success");
		    	}
		    })
		} catch (err) {
			reject(err);
		}
	})
};


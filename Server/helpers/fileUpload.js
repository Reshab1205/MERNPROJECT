var AWS = require('aws-sdk');
require('dotenv').config({ path: './variables.env' });
let publicBucketName = process.env.S3_PUBLIC_BUCKET_NAME
var credentials = {
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey : process.env.SECRET_ACCESS_KEY
};
AWS.config.update({
    credentials: credentials,
    region:process.env.AWS_REGION,
});
var s3 = new AWS.S3();

exports.generatePublicS3FileUrl = async (fileName) => {
    console.log(`-S3-SIGN-URL-STARTS---FILENAME-${fileName}`);
    let file_name = Date.now() + '-skeleton-nodejs-server-' + fileName;
    let inputParams = {
        Bucket: publicBucketName,
        Expires: 300,
        Fields: {
            key: file_name
        },
        conditions: [
            {'ACL': 'public-read'},
            {'bucket': publicBucketName},
            {'success_action_status': "200"},
            ['starts-with', '$key', ''],
            ['content-length-range', 0, 1024 * 1024 * 15],
            {'x-amz-algorithm': 'AWS4-HMAC-SHA256'}
        ]
    }
    return new Promise(function (resolve, reject) {
        s3.createPresignedPost(inputParams, function (err, data) {
          if (err) {
            console.log(`-S3-SIGN-URL-FAILED---DETAILS-${err}`);
            resolve({status:'Failure', data: err});
          } else {
            console.log(`-S3-SIGN-URL-COMPLETE---DETAILS-${data}`);
            resolve({status:'Success', data: data});
          }
      });
    })
};
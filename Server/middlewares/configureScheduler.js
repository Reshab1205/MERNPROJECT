const cron = require('node-cron');
const config = require("config");
const schedulers = require('../schedulers');
let schedulerOne = config.get('SCHEDULER_ONE');
let schedulerTwo = config.get('SCHEDULER_TWO');

exports.schedule = async () => {
    console.log('CONFIGURE SCHEDULERS INIT')
    //schedulerOne
    await cron.schedule('0 */8 * * *', async() => {
            // await schedulers.schedulerOne();
          }, {
            scheduled: schedulerOne,
            timezone: "Asia/Kolkata"
          });

    //schedulerTwo
    await cron.schedule('0 */8 * * *', async() => {
            // await schedulers.schedulerTwo();
          }, {
            scheduled: schedulerTwo,
            timezone: "Asia/Kolkata"
          });
}
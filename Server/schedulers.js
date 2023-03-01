const moment = require('moment');
const mongoose = require('mongoose');
const debug = require('./helpers/debugger');
const allFunctions = require('./helpers/functions');

module.exports.schedulerOne = async () => {
    try {
        console.log('schedulerOne code runnn')
    } catch(err) {
        console.log(`-----------schedulerOne-ERROR--------------------`)
        // await debug.addRouteDebug({route_name: "schedulerOne", debug_details: err.stack });
    }
}
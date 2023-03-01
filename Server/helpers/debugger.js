const Debug = require('../model/Debug');

exports.addRouteDebug = async (data) => {
    let debugData = {
        ...data,
        code: 1,
        type:'ERROR'
    }
    return await Debug.create(debugData);
}

exports.addRouteRequestDetails = async (data) => {
    let debugData = {
        ...data,
        code: 1,
        type:'REQUEST'
    }
    return await Debug.create(debugData);
}

exports.addRouteLog = async (data) => {
    let debugData = {
        ...data,
        code: 1,
        type:'LOG'
    }
    return await Debug.create(debugData);
}






























//DEBUG CODES
//0 - Default
//1 - Route failures




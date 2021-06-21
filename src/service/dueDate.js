const dueDateModel = require('../models/dueDetails');
const moment = require('moment');
const service = {};

service.getDueCost = async (username, date) => {

    const dueDetails = await dueDateModel.findOne({
            username
    }).lean().exec();

    const currentDate = moment(date);
    const dueDateOfTheMonth = moment().day(dueDetails.dueDateOfTheMonth);
    const dateDifference = currentDate.diff(dueDateOfTheMonth,'d');
    if(dateDifference<=0){
        return dueDetails.dueAmount;
    }


    return dueDetails.dueAmount;
}


service.upsertDueDate = (username,dueAmount,dueDateOfTheMonth) => dueDateModel.updateOne({username},{
    $set:{
        username,
        dueAmount,
        dueDateOfTheMonth
    }
},{
    upsert: true
});

service.getDueDetailsByUsername = () => dueDateModel.find({}).lean().exec();

module.exports = service;
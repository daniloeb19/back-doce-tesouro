const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
    number: { type: string, required: true },
});

module.exports = mongoose.model('Dashboard', dashboardSchema);

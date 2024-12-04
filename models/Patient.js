const mongoose = require('mongoose');

const clinicalDataSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    type: { type: String, required: true },
    value: { type: String, required: true },
    condition: { type: String, required: true },
});

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    condition: { type: String, required: true },
    contact: { type: String, required: true },
    age: { type: Number, required: true },
    photo: { type: String, default: '/assets/patient1.png' },
    clinicalData: [clinicalDataSchema],
});

const Patient = mongoose.model('Patient', patientSchema);

console.log('Exporting Patient model:', Patient); // Debug log
module.exports = Patient;
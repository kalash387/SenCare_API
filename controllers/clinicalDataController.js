// controllers/clinicalDataController.js
const { addClinicalData, getPatientById } = require('../models/patientModel');
const responseHelper = require('../utils/responseHelper');

// Get clinical data for a patient
const getClinicalData = (req, res) => {
  const { id } = req.params;
  const patient = getPatientById(Number(id));
  if (patient) {
    responseHelper.sendSuccess(res, 200, patient.clinicalData);
  } else {
    responseHelper.sendError(res, 404, 'Patient not found');
  }
};

// Add clinical data to a patient
const addClinicalDataForPatient = (req, res) => {
  const { id } = req.params;
  const { date, type, value, condition } = req.body;

  if (!date || !type || !value || !condition) {
    return responseHelper.sendError(res, 400, 'Date, type, and value are required');
  }

  const newClinicalData = { date, type, value, condition };
  const updatedPatient = addClinicalData(Number(id), newClinicalData);

  if (updatedPatient) {
    responseHelper.sendSuccess(res, 200, updatedPatient);
  } else {
    responseHelper.sendError(res, 404, 'Patient not found');
  }
};

module.exports = { getClinicalData, addClinicalDataForPatient };
// controllers/clinicalDataController.js
const { addClinicalData, getPatientById } = require('../models/patientModel');
const responseHelper = require('../utils/responseHelper');
const mongoose = require('mongoose');

// Get clinical data for a patient
const getClinicalData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return responseHelper.sendError(res, 400, 'Invalid ID format');
  }

  const patient = await getPatientById(id);
  if (patient) {
    responseHelper.sendSuccess(res, 200, patient.clinicalData);
  } else {
    responseHelper.sendError(res, 404, 'Patient not found');
  }
};

// Add clinical data to a patient
const addClinicalDataForPatient = async (req, res) => {
  const { id } = req.params;
  const { date, type, value, condition } = req.body;

  if (!date || !type || !value || !condition) {
    return responseHelper.sendError(res, 400, 'Date, type, value, and condition are required');
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return responseHelper.sendError(res, 400, 'Invalid ID format');
  }

  try {
    const newClinicalData = { date, type, value, condition };
    const updatedPatient = await addClinicalData(id, newClinicalData);

    if (updatedPatient) {
      responseHelper.sendSuccess(res, 200, newClinicalData); // Return only the new data
    } else {
      responseHelper.sendError(res, 404, 'Patient not found');
    }
  } catch (error) {
    responseHelper.sendError(res, 500, 'Error adding clinical data');
  }
};

module.exports = { getClinicalData, addClinicalDataForPatient };
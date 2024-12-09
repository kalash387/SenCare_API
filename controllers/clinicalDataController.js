// controllers/clinicalDataController.js
const { addClinicalData, getPatientById, updatePatientClinicalData } = require('../models/patientModel');
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

// Update clinical data for a patient
const updateClinicalDataForPatient = async (req, res) => {
  const { id, clinicalDataId } = req.params;
  const { date, type, value, condition } = req.body;

  // Validate IDs
  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(clinicalDataId)) {
    return responseHelper.sendError(res, 400, 'Invalid ID format');
  }

  try {
    // Fetch patient by ID using patientModel
    const patient = await getPatientById(id);
    if (!patient) {
      return responseHelper.sendError(res, 404, 'Patient not found');
    }

    // Find the clinical data entry to update
    const clinicalDataIndex = patient.clinicalData.findIndex(
      (data) => data._id.toString() === clinicalDataId
    );

    if (clinicalDataIndex === -1) {
      return responseHelper.sendError(res, 404, 'Clinical data not found');
    }

    // Update the relevant fields
    if (date) patient.clinicalData[clinicalDataIndex].date = date;
    if (type) patient.clinicalData[clinicalDataIndex].type = type;
    if (value) patient.clinicalData[clinicalDataIndex].value = value;
    if (condition) patient.clinicalData[clinicalDataIndex].condition = condition;

    // Save the updated clinical data using patientModel
    const updatedPatient = await updatePatientClinicalData(id, patient.clinicalData);

    if (updatedPatient) {
      responseHelper.sendSuccess(res, 200, patient.clinicalData[clinicalDataIndex]); // Return updated clinical data
    } else {
      responseHelper.sendError(res, 500, 'Error updating clinical data');
    }
  } catch (error) {
    responseHelper.sendError(res, 500, 'Error updating clinical data');
  }
};

// Delete clinical data for a patient
const deleteClinicalDataForPatient = async (req, res) => {
  const { id, clinicalDataId } = req.params;

  // Validate IDs
  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(clinicalDataId)) {
    return responseHelper.sendError(res, 400, 'Invalid ID format');
  }

  try {
    // Find the patient by ID
    const patient = await getPatientById(id);
    if (!patient) {
      return responseHelper.sendError(res, 404, 'Patient not found');
    }

    // Filter out the clinical data to be deleted
    const updatedClinicalData = patient.clinicalData.filter(
      (data) => data._id.toString() !== clinicalDataId
    );

    if (updatedClinicalData.length === patient.clinicalData.length) {
      return responseHelper.sendError(res, 404, 'Clinical data not found');
    }

    // Update the patient's clinical data
    const updatedPatient = await updatePatientClinicalData(id, updatedClinicalData);
    if (updatedPatient) {
      return responseHelper.sendSuccess(res, 200, 'Clinical data deleted successfully');
    } else {
      responseHelper.sendError(res, 500, 'Error updating clinical data');
    }
  } catch (error) {
    responseHelper.sendError(res, 500, 'Error deleting clinical data');
  }
};

module.exports = { getClinicalData, addClinicalDataForPatient, deleteClinicalDataForPatient, updateClinicalDataForPatient };
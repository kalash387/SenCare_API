const { 
  getAllPatients, 
  getPatientById, 
  addPatient, 
  getCriticalPatients 
} = require('../models/patientModel');
const responseHelper = require('../utils/responseHelper');

// Retrieve all patients
const getPatients = async (req, res) => {
  try {
    console.log("Getting pateints")
    const patients = await getAllPatients();
    responseHelper.sendSuccess(res, 200, patients);
  } catch (error) {
    responseHelper.sendError(res, 500, 'Failed to fetch patients');
  }
};

// Retrieve a specific patient by ID
const getPatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await getPatientById(id);
    if (patient) {
      responseHelper.sendSuccess(res, 200, patient);
    } else {
      responseHelper.sendError(res, 404, 'Patient not found');
    }
  } catch (error) {
    responseHelper.sendError(res, 500, 'Failed to fetch patient');
  }
};

// Add a new patient
const createPatient = async (req, res) => {
  const { name, condition, contact, age, photo, clinicalData } = req.body;

  // Validate input fields
  if (!name || !condition || !contact || !age) {
    return responseHelper.sendError(res, 400, 'All fields are required.');
  }

  try {
    const newPatient = await addPatient({ name, condition, contact, age, photo, clinicalData });
    responseHelper.sendSuccess(res, 201, newPatient);
  } catch (error) {
    console.error('Error in createPatient:', error.message);
    responseHelper.sendError(res, 500, 'Failed to add patient');
  }
};


// Retrieve critical patients
const getCriticalPatientsList = async (req, res) => {
  try {
    const criticalPatients = await getCriticalPatients();
    if (criticalPatients && criticalPatients.length > 0) {
      responseHelper.sendSuccess(res, 200, criticalPatients);
    } else {
      responseHelper.sendError(res, 404, 'No critical patients found');
    }
  } catch (error) {
    responseHelper.sendError(res, 500, 'Failed to fetch critical patients');
  }
};

module.exports = { 
  getPatients, 
  getPatient, 
  createPatient, 
  getCriticalPatientsList 
};
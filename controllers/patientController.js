const { 
  getAllPatients, 
  getPatientById, 
  addPatient, 
  getCriticalPatients,
  updatePatientById,
  deletePatientById
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

// Update patient information by ID
const updatePatient = async (req, res) => {
  const { id } = req.params;
  const { name, condition, contact, age } = req.body;
  console.log(req.body)
  console.log(id)
  // Validate input fields
  if (!name || !condition || !contact || !age) {
    return responseHelper.sendError(res, 400, 'All fields are required.');
  }

  try {
    // Attempt to update the patient using the model function
    const updatedPatient = await updatePatientById(id, { name, condition, contact, age });

    if (updatedPatient) {
      responseHelper.sendSuccess(res, 200, updatedPatient);
    } else {
      responseHelper.sendError(res, 404, 'Patient not found');
    }
  } catch (error) {
    console.error('Error in updatePatient:', error.message);
    responseHelper.sendError(res, 500, 'Failed to update patient. Error - ' + error.message);
  }
};


// Delete a patient by ID
const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPatient = await deletePatientById(id);  // Using the model's delete function

    if (!deletedPatient) {
      return responseHelper.sendError(res, 404, 'Patient not found');
    }

    return responseHelper.sendSuccess(res, 200, { message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error.message);
    return responseHelper.sendError(res, 500, 'Internal server error');
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
  updatePatient,
  deletePatient,
  getCriticalPatientsList 
};
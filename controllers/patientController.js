// controllers/patientController.js
const { getAllPatients, getPatientById, addPatient, getCriticalPatients } = require('../models/patientModel');
const responseHelper = require('../utils/responseHelper');

// Get all patients
const getPatients = (req, res) => {
  const patients = getAllPatients();
  responseHelper.sendSuccess(res, 200, patients);
};

// Get a specific patient
const getPatient = (req, res) => {
  const { id } = req.params;
  const patient = getPatientById(Number(id));
  if (patient) {
    responseHelper.sendSuccess(res, 200, patient);
  } else {
    responseHelper.sendError(res, 404, 'Patient not found');
  }
};

// Add a new patient
const createPatient = (req, res) => {
  const { name, condition, contact, age } = req.body;
  if (!name || !condition || !contact || !age) {
    return responseHelper.sendError(res, 400, 'All fields are required.');
  }

  const newPatient = addPatient({ name, condition, contact, age });
  responseHelper.sendSuccess(res, 201, newPatient);
};

// Get critical patients
const getCriticalPatientsList = (req, res) => {
  const criticalPatients = getCriticalPatients();
  responseHelper.sendSuccess(res, 200, criticalPatients);
};

module.exports = { getPatients, getPatient, createPatient, getCriticalPatientsList };
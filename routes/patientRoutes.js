// routes/patientRoutes.js
const express = require('express');
const patientController = require('../controllers/patientController');
const clinicalDataController = require('../controllers/clinicalDataController');
const router = express.Router();

// Patient Routes
router.get('/patients', patientController.getPatients);               // Get all patients
router.get('/patients/:id', patientController.getPatient);           // Get a specific patient
router.post('/patients', patientController.createPatient);           // Add a new patient
router.get('/patients/critical', patientController.getCriticalPatientsList);  // Get critical patients

// Clinical Data Routes
router.get('/patients/:id/clinical-data', clinicalDataController.getClinicalData);     // Get clinical data
router.post('/patients/:id/clinical-data', clinicalDataController.addClinicalDataForPatient); // Add clinical data

module.exports = router;
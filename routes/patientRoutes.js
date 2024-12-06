const express = require('express');
const patientController = require('../controllers/patientController');
const clinicalDataController = require('../controllers/clinicalDataController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Retrieve a list of all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   condition:
 *                     type: string
 *                   contact:
 *                     type: string
 *                   age:
 *                     type: integer
 */
router.get('/patients', patientController.getPatients);

/**
 * @swagger
 * /patients/critical:
 *   get:
 *     summary: Retrieve a list of critical patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of critical patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   condition:
 *                     type: string
 */
router.get('/patients/critical', patientController.getCriticalPatientsList);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Retrieve a specific patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 condition:
 *                   type: string
 *                 contact:
 *                   type: string
 *                 age:
 *                   type: integer
 *       404:
 *         description: Patient not found
 */
router.get('/patients/:id', patientController.getPatient);

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Add a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               condition:
 *                 type: string
 *               contact:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Patient created
 *       400:
 *         description: Missing required fields
 */
router.post('/patients', patientController.createPatient);


/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update a patient's information
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               condition:
 *                 type: string
 *               contact:
 *                 type: string
 *               age:
 *                 type: integer
 *               photo:
 *                 type: string
 *               clinicalData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 condition:
 *                   type: string
 *                 contact:
 *                   type: string
 *                 age:
 *                   type: integer
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.put('/patients/:id', patientController.updatePatient);

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Delete a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */
router.delete('/patients/:id', patientController.deletePatient);

/**
 * @swagger
 * /patients/{id}/clinical-data:
 *   get:
 *     summary: Retrieve clinical data for a specific patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Clinical data retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   type:
 *                     type: string
 *                   value:
 *                     type: string
 *                   condition:
 *                     type: string
 *       404:
 *         description: Patient not found
 */
router.get('/patients/:id/clinical-data', clinicalDataController.getClinicalData);

/**
 * @swagger
 * /patients/{id}/clinical-data:
 *   post:
 *     summary: Add clinical data to a specific patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               type:
 *                 type: string
 *               value:
 *                 type: string
 *               condition:
 *                 type: string
 *     responses:
 *       200:
 *         description: Clinical data added
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Patient not found
 */
router.post('/patients/:id/clinical-data', clinicalDataController.addClinicalDataForPatient);

module.exports = router;
const Patient = require('./Patient'); // Correct relative path for models in the same folder

// Fetch all patients
const getAllPatients = async () => {
  try {
    return await Patient.find();
  } catch (error) {
    throw new Error("Error fetching all patients");
  }
};

// Fetch patient by ID
const getPatientById = async (id) => {
  try {
    return await Patient.findById(id);
  } catch (error) {
    throw new Error("Error fetching patient by ID");
  }
};

// Add a new patient
const addPatient = async (newPatient) => {
  try {
    console.log('Patient Model:', Patient);
    const patient = new Patient(newPatient);
    return await patient.save();
  } catch (error) {
    console.error('Error adding patient:', error.message);
    throw new Error('Failed to add patient');
  }
};

// Update patient information by ID
const updatePatientById = async (id, updatedData) => {
  try {
    // Find the patient by ID and update the provided fields
    const updatedPatient = await Patient.findByIdAndUpdate(id, updatedData, { new: true });
    return updatedPatient;
  } catch (error) {
    throw new Error('Error updating patient by ID');
  }
};

// Add clinical data for a patient
const addClinicalData = async (patientId, data) => {
  try {
    const patient = await Patient.findById(patientId);
    if (patient) {
      patient.clinicalData.push(data);
      return await patient.save();
    }
    return null;
  } catch (error) {
    throw new Error("Error adding clinical data to patient");
  }
};

// Get critical patients (based on condition or clinical data)
const getCriticalPatients = async () => {
  try {
    return await Patient.find({ condition: "Critical" });
  } catch (error) {
    throw new Error("Error fetching critical patients");
  }
};

module.exports = { 
  getAllPatients, 
  getPatientById, 
  addPatient, 
  updatePatientById,
  addClinicalData, 
  getCriticalPatients 
};
const { connect } = require("../routes/patientRoutes");
const path = require("path");

let patients = [
  {
    id: 1,
    name: "John Doe",
    condition: "Normal",
    contact: "123-456-7890",
    age: 45,
    photo: "/assets/patient1.png",
    clinicalData: [
      { date: "2024-11-01T10:00:00Z", type: "Blood Pressure", value: "120/80", condition: "Normal" }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    condition: "Critical",
    contact: "987-654-3210",
    age: 30,
    photo: "/assets/patient1.png",
    clinicalData: [
      { date: "2024-11-01T09:00:00Z", type: "Blood Pressure", value: "160/100", condition: "Critical" }
    ]
  },
  {
    id: 3,
    name: "Sam Johnson",
    condition: "Critical",
    contact: "987-654-3213",
    age: 30,
    photo: "/assets/patient1.png",
    clinicalData: [
      { date: "2024-11-01T09:00:00Z", type: "Blood Pressure", value: "190/100", condition: "Critical" }
    ]
  }
];

// Fetch all patients
const getAllPatients = () => patients;

// Fetch patient by ID
const getPatientById = (id) => patients.find((patient) => patient.id === id);

// Add a new patient
const addPatient = (newPatient) => {
  const patientId = patients.length + 1;
  const patient = { id: patientId, ...newPatient, clinicalData: [] };
  patients.push(patient);
  return patient;
};

// Add clinical data for a patient
const addClinicalData = (patientId, data) => {
  const patient = getPatientById(patientId);
  if (patient) {
    patient.clinicalData.push(data);
    return patient;
  }
  return null;
};

// Get critical patients (based on condition or clinical data)
const getCriticalPatients = () => {
  const criticalPatients = patients.filter((patient) => patient.condition === "Critical");
  return criticalPatients;
};

module.exports = { getAllPatients, getPatientById, addPatient, addClinicalData, getCriticalPatients };

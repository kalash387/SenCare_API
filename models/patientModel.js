// models/patientModel.js

let patients = [
    {
      id: 1,
      name: "John Doe",
      condition: "Stable",
      contact: "123-456-7890",
      age: 45,
      clinicalData: [
        { date: "2024-11-01T10:00:00Z", type: "Blood Pressure", value: "120/80" }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      condition: "Critical",
      contact: "987-654-3210",
      age: 30,
      clinicalData: [
        { date: "2024-11-01T09:00:00Z", type: "Blood Pressure", value: "160/100" }
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
    return patients.filter((patient) => patient.condition === "Critical");
  };
  
  module.exports = { getAllPatients, getPatientById, addPatient, addClinicalData, getCriticalPatients };
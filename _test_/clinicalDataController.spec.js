const mongoose = require('mongoose');
const { getClinicalData, addClinicalDataForPatient } = require('../controllers/clinicalDataController');
const responseHelper = require('../utils/responseHelper');
const { addClinicalData, getPatientById } = require('../models/patientModel');

jest.mock('../utils/responseHelper');
jest.mock('../models/patientModel');

describe('Clinical Data Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getClinicalData', () => {
    it('should return clinical data for a valid patient ID', async () => {
      const req = { params: { id: '64b18a7f4c1d2b4d1c8c5123' } };
      const res = {};

      const patientMock = { clinicalData: [{ date: '2023-12-01', type: 'Blood Pressure', value: '120/80', condition: 'Normal' }] };
      getPatientById.mockResolvedValue(patientMock);

      await getClinicalData(req, res);

      expect(getPatientById).toHaveBeenCalledWith(req.params.id);
      expect(responseHelper.sendSuccess).toHaveBeenCalledWith(res, 200, patientMock.clinicalData);
    });

    it('should return error for invalid patient ID format', async () => {
      const req = { params: { id: 'invalid-id' } };
      const res = {};

      await getClinicalData(req, res);

      expect(responseHelper.sendError).toHaveBeenCalledWith(res, 400, 'Invalid ID format');
    });

    it('should return error if patient not found', async () => {
      const req = { params: { id: '64b18a7f4c1d2b4d1c8c5123' } };
      const res = {};

      getPatientById.mockResolvedValue(null);

      await getClinicalData(req, res);

      expect(responseHelper.sendError).toHaveBeenCalledWith(res, 404, 'Patient not found');
    });
  });

  describe('addClinicalDataForPatient', () => {
    it('should add clinical data for a valid patient ID', async () => {
      const req = { 
        params: { id: '64b18a7f4c1d2b4d1c8c5123' },
        body: { date: '2023-12-01', type: 'Blood Pressure', value: '120/80', condition: 'Normal' },
      };
      const res = {};

      addClinicalData.mockResolvedValue(true);

      await addClinicalDataForPatient(req, res);

      expect(addClinicalData).toHaveBeenCalledWith(req.params.id, req.body);
      expect(responseHelper.sendSuccess).toHaveBeenCalledWith(res, 200, req.body);
    });

    it('should return error if required fields are missing', async () => {
      const req = { 
        params: { id: '64b18a7f4c1d2b4d1c8c5123' },
        body: { date: '', type: '', value: '', condition: '' },
      };
      const res = {};

      await addClinicalDataForPatient(req, res);

      expect(responseHelper.sendError).toHaveBeenCalledWith(res, 400, 'Date, type, value, and condition are required');
    });

    it('should return error for invalid patient ID format', async () => {
      const req = { 
        params: { id: 'invalid-id' },
        body: { date: '2023-12-01', type: 'Blood Pressure', value: '120/80', condition: 'Normal' },
      };
      const res = {};

      await addClinicalDataForPatient(req, res);

      expect(responseHelper.sendError).toHaveBeenCalledWith(res, 400, 'Invalid ID format');
    });
  });
});
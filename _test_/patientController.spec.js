// tests/patientController.test.js

const { 
    getPatients, 
    getPatient, 
    createPatient, 
    updatePatient, 
    deletePatient, 
    getCriticalPatientsList 
  } = require('../controllers/patientController');
  
  const patientModel = require('../models/patientModel');
  const responseHelper = require('../utils/responseHelper');
  
  jest.mock('../models/patientModel');
  jest.mock('../utils/responseHelper');
  
  describe('patientController', () => {
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    beforeEach(() => {
      jest.clearAllMocks();
      
    });
  
    describe('getPatients', () => {
      it('should return all patients', async () => {
        const mockPatients = [{ name: 'John Doe', age: 30 }];
        patientModel.getAllPatients.mockResolvedValue(mockPatients);
  
        await getPatients({}, mockRes);
  
        expect(patientModel.getAllPatients).toHaveBeenCalled();
        expect(responseHelper.sendSuccess).toHaveBeenCalledWith(mockRes, 200, mockPatients);
      });
  
      it('should handle errors when fetching patients', async () => {
        patientModel.getAllPatients.mockRejectedValue(new Error('Database error'));
  
        await getPatients({}, mockRes);
  
        expect(responseHelper.sendError).toHaveBeenCalledWith(mockRes, 500, 'Failed to fetch patients');
      });
    });
  
    describe('getPatient', () => {
      it('should return a specific patient by ID', async () => {
        const mockPatient = { name: 'Jane Doe', age: 25 };
        const req = { params: { id: '123' } };
        patientModel.getPatientById.mockResolvedValue(mockPatient);
  
        await getPatient(req, mockRes);
  
        expect(patientModel.getPatientById).toHaveBeenCalledWith('123');
        expect(responseHelper.sendSuccess).toHaveBeenCalledWith(mockRes, 200, mockPatient);
      });
  
      it('should return 404 if patient not found', async () => {
        const req = { params: { id: '123' } };
        patientModel.getPatientById.mockResolvedValue(null);
  
        await getPatient(req, mockRes);
  
        expect(responseHelper.sendError).toHaveBeenCalledWith(mockRes, 404, 'Patient not found');
      });
  
      it('should handle errors when fetching a patient', async () => {
        const req = { params: { id: '123' } };
        patientModel.getPatientById.mockRejectedValue(new Error('Database error'));
  
        await getPatient(req, mockRes);
  
        expect(responseHelper.sendError).toHaveBeenCalledWith(mockRes, 500, 'Failed to fetch patient');
      });
    });
  
    describe('createPatient', () => {
      it('should create a new patient', async () => {
        const req = { body: { name: 'John Doe', condition: 'Healthy', contact: '123456789', age: 30 } };
        const mockPatient = { id: '123', ...req.body };
        patientModel.addPatient.mockResolvedValue(mockPatient);
  
        await createPatient(req, mockRes);
  
        expect(patientModel.addPatient).toHaveBeenCalledWith(req.body);
        expect(responseHelper.sendSuccess).toHaveBeenCalledWith(mockRes, 201, mockPatient);
      });
  
      it('should return 400 if required fields are missing', async () => {
        const req = { body: { name: 'John Doe', contact: '123456789', age: 30 } };
  
        await createPatient(req, mockRes);
  
        expect(responseHelper.sendError).toHaveBeenCalledWith(mockRes, 400, 'All fields are required.');
      });
  
      it('should handle errors when creating a patient', async () => {
        const req = { body: { name: 'John Doe', condition: 'Healthy', contact: '123456789', age: 30 } };
        patientModel.addPatient.mockRejectedValue(new Error('Database error'));
  
        await createPatient(req, mockRes);
  
        expect(responseHelper.sendError).toHaveBeenCalledWith(mockRes, 500, 'Failed to add patient');
      });
    });
  
    describe('updatePatient', () => {
      it('should update patient information', async () => {
        const req = { 
          params: { id: '123' }, 
          body: { name: 'John Doe', condition: 'Recovered', contact: '987654321', age: 31 } 
        };
        const updatedPatient = { id: '123', ...req.body };
        patientModel.updatePatientById.mockResolvedValue(updatedPatient);
  
        await updatePatient(req, mockRes);
  
        expect(patientModel.updatePatientById).toHaveBeenCalledWith('123', req.body);
        expect(responseHelper.sendSuccess).toHaveBeenCalledWith(mockRes, 200, updatedPatient);
      });
  
      it('should return 404 if patient not found', async () => {
        const req = { params: { id: '123' }, body: { name: 'John Doe', condition: 'Recovered', contact: '987654321', age: 31 } };
        patientModel.updatePatientById.mockResolvedValue(null);
  
        await updatePatient(req, mockRes);
  
        expect(responseHelper.sendError).toHaveBeenCalledWith(mockRes, 404, 'Patient not found');
      });
  
      it('should handle errors when updating a patient', async () => {
        const req = { params: { id: '123' }, body: { name: 'John Doe', condition: 'Recovered', contact: '987654321', age: 31 } };
        patientModel.updatePatientById.mockRejectedValue(new Error('Database error'));
  
        await updatePatient(req, mockRes);
  
        expect(responseHelper.sendError).toHaveBeenCalledWith(mockRes, 500, 'Failed to update patient');
      });
    });
  
    describe('deletePatient', () => {
      it('should delete a patient', async () => {
        const req = { params: { id: '123' } };
        const deletedPatient = { id: '123', name: 'John Doe' };
        patientModel.deletePatientById.mockResolvedValue(deletedPatient);
  
        await deletePatient(req, mockRes);
  
        expect(patientModel.deletePatientById).toHaveBeenCalledWith('123');
        expect(responseHelper.sendSuccess).toHaveBeenCalledWith(mockRes, 200, { message: 'Patient deleted successfully' });
      });
  
      it('should return 404 if patient not found', async () => {
        const req = { params: { id: '123' } };
        patientModel.deletePatientById.mockResolvedValue(null);
  
        await deletePatient(req, mockRes);
  
        expect(responseHelper.sendError).toHaveBeenCalledWith(mockRes, 404, 'Patient not found');
      });
  
      it('should handle errors when deleting a patient', async () => {
        const req = { params: { id: '123' } };
        patientModel.deletePatientById.mockRejectedValue(new Error('Database error'));
  
        await deletePatient(req, mockRes);
  
        expect(responseHelper.sendError).toHaveBeenCalledWith(mockRes, 500, 'Internal server error');
      });
    });
  
    describe('getCriticalPatientsList', () => {
      it('should return critical patients', async () => {
        const criticalPatients = [{ name: 'Jane Doe', condition: 'Critical' }];
        patientModel.getCriticalPatients.mockResolvedValue(criticalPatients);
  
        await getCriticalPatientsList({}, mockRes);
  
        expect(patientModel.getCriticalPatients).toHaveBeenCalled();
        expect(responseHelper.sendSuccess).toHaveBeenCalledWith(mockRes, 200, criticalPatients);
      });
  
      it('should return 404 if no critical patients found', async () => {
        patientModel.getCriticalPatients.mockResolvedValue([]);
  
        await getCriticalPatientsList({}, mockRes);
  
        expect(responseHelper.sendError).toHaveBeenCalledWith(mockRes, 404, 'No critical patients found');
      });
  
      it('should handle errors when fetching critical patients', async () => {
        patientModel.getCriticalPatients.mockRejectedValue(new Error('Database error'));
  
        await getCriticalPatientsList({}, mockRes);
  
        expect(responseHelper.sendError).toHaveBeenCalledWith(mockRes, 500, 'Failed to fetch critical patients');
      });
    });
  });
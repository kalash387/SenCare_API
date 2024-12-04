const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://kalashrami387:TPURw67AOAWvkNpW@sencare.imaj8.mongodb.net/?retryWrites=true&w=majority&appName=SenCare', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit on failure
  }
};


module.exports = connectDB;
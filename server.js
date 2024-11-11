const express = require('express');
const patientRoutes = require('./routes/patientRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', patientRoutes);

app.listen(port, () => {
  console.log(`Server running at https://localhost:${port}`);
});
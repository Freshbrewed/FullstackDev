import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);
  //const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedPatient = patientService.addPatient(newPatient
  /*  {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  }*/
  );
  res.json(addedPatient);
});

export default router;
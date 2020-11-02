import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  try {
    const searchedPatient =  patientService.findPatient(req.params.id);
    if (searchedPatient) {
      res.json(searchedPatient);
    } else res.status(404).json({error: "Incorrect Person ID or person does not exist!"});
  } catch(exception) {
    res.send(exception);
  }
  
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
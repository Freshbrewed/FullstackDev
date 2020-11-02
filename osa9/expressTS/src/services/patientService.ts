import patients from '../../data/patients';
import { NewPatient, Patient, NonSensitivePatient } from '../types';
import { v4 as uuidv4 } from 'uuid';



const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => (
    {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    }
  ));
};

/*
const addPatient = (
name: string, dateOfBirth: string, ssn: string, gender: Sex, occupation: string
): Patient => {

const newPatient = {
  id: uuidv4(),
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}

patients.push(newPatient);
return newPatient;
}; */

const findPatient = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  if (patient) return patient;
  return undefined;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findPatient
};
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Patient } from './types';


const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseDateOfBirth = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth: ' + date);
    }
    return date;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect gender or missing value: ' + gender);
    }
    return gender;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};


const toNewPatient = (object: Patient): NewPatient => {
    
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseName(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseName(object.occupation),
    entries: []
  };
};

export default toNewPatient;
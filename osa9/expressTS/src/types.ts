export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
  }

  export enum Sex  {
    Male = 'male',
    Female =  'female'
  }
  

  export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Sex;
    occupation: string;
  }

  export type NonSensitivePatient = Omit<Patient, 'ssn'>;

  export type NewPatient = Omit<Patient, 'id'>;
export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
  }

  export enum Sex {
    Male = 'male',
    Female = 'female'
  }
  

  export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Sex | string;
    occupation: string;
  }

  export type NonSensitivePatient = Omit<Patient, 'ssn'>;

  export type NewPatient = Omit<Patient, 'id'>;
 /* export interface NewPatient extends Omit<Patient, 'id' | 'gender'> {
    gender: string;
  }*/
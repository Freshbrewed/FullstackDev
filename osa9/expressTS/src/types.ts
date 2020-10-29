export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
  }

  export type Sex = 'male' | 'female';

  export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Sex;
    occupation: string;
  }
import { NewPatientSchema } from "./utils";
import z from 'zod';

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = z.infer<typeof NewPatientSchema>;
import { NewPatientSchema, FullPatientSchema, EntrySchema, NewEntrySchema } from "./schemas";
import z from 'zod';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type Discharge = {
  date: string;
  criteria: string;
};

export type SickLeave = {
  startDate: string;
  endDate: string;
};

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type NewPatient = z.infer<typeof NewPatientSchema>;
export type Patient = z.infer<typeof FullPatientSchema>;
export type Entry = z.infer<typeof EntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
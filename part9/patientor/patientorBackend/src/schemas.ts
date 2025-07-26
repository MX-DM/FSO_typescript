import { z } from 'zod';
import { Gender, HealthCheckRating } from './types';


const BaseEntrySchema = z.object({
  id: z.string(),
  date: z.string().min(1, { message: 'Date is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  specialist: z.string().min(1, { message: 'Specialist is required' }),
  diagnosisCodes: z.array(z.string()).optional()
});

// FULL entry types (with id)
const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating)
});
const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().min(1, { message: 'Date of discharge is required' }),
    criteria: z.string().min(1, { message: 'Criteria is required' })
  })
});
const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1, { message: 'Employer name is required' }),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional()
});

// NEW entry types (no id)
const NewHealthCheckEntrySchema = HealthCheckEntrySchema.omit({ id: true });

const NewHospitalEntrySchema = HospitalEntrySchema.omit({ id: true });

const NewOccupationalHealthcareEntrySchema = OccupationalHealthcareEntrySchema.omit({ id: true });

// Discriminated unions
export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema
]);

export const NewEntrySchema = z.discriminatedUnion("type", [
  NewHealthCheckEntrySchema,
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntrySchema
]);

export const FullPatientSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  gender: z.enum(Gender),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  occupation: z.string().min(1, { message: 'Occupation is required' }),
  ssn: z.string().min(1, { message: 'SSN is required' }),
  entries: z.array(EntrySchema)
});

export const NewPatientSchema = FullPatientSchema.omit({ id: true, entries: true });
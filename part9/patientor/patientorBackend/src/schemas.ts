import { z } from 'zod';
import { Gender, HealthCheckRating } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  gender: z.enum(Gender),
  dateOfBirth: z.string(),
  occupation: z.string(),
  ssn: z.string()
});

const BaseEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const BaseNewEntrySchema = BaseEntrySchema.omit({ id: true });

// FULL entry types (with id)
const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating)
});
const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
});
const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional()
});

// NEW entry types (no id)
const NewHealthCheckEntrySchema = BaseNewEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating)
});
const NewHospitalEntrySchema = BaseNewEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
});
const NewOccupationalHealthcareEntrySchema = BaseNewEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional()
});

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
  name: z.string(),
  gender: z.enum(Gender),
  dateOfBirth: z.string(),
  occupation: z.string(),
  ssn: z.string(),
  entries: z.array(EntrySchema)
});

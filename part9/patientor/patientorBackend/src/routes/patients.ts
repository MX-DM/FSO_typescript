import express from 'express';
import patientsService from '../services/patientsService';
import { NewEntrySchema, NewPatientSchema } from '../schemas';
import z from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientsService.getPatients();
    res.status(200).json(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);
  
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    const addedPatient = patientsService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = NewEntrySchema.parse(req.body);
    const addedEntry = patientsService.addEntry(newEntry, req.params.id);
    console.log(newEntry);
    res.json(addedEntry);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;
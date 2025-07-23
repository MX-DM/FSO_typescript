import rawPatients from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v4 as uuid } from 'uuid';
import { FullPatientSchema } from "../schemas";

const patientsData: Patient [] = rawPatients.map(obj => {
  const object = FullPatientSchema.parse(obj);
  return object;
});

const getPatients = () : Patient[] => {
    console.log(rawPatients);
    return patientsData;
};

const getNonSensitivePatients = () : NonSensitivePatient[]=> {
  const patients : NonSensitivePatient[] = patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const entry = patientsData.find(p => p.id === id);
  return entry;
};

const addPatient = (patientEntry : NewPatient): Patient => {
  const newPatient : Patient = {
    id: uuid(),
    ...patientEntry,
    entries: []
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  getPatients,
  findById,
  addPatient
};
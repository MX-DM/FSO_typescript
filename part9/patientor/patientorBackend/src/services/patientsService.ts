import patientsData from '../data/patients';
import { Patient, NonSensitivePatient } from '../types';

const getPatients = () : Patient[] => {
    return patientsData;
};

const getNonSensitivePatients = () : NonSensitivePatient[]=> {
  const patients = patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
  return patients;
};


export default {
  getNonSensitivePatients,
  getPatients
};
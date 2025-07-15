import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
    const diagnoses = diagnosesService.getDiagnoses();
    res.status(200).json(diagnoses);
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
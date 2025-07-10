import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.get('/bmi', (_req, res) => {
    if(Object.keys(_req.query).length === 0){
        return res.send("Welcome to BMI calculator. Send your height and weight as query params!");
    }
    const { height, weight } = _req.query;
    const heightNum = Number(height);
    const weightNum = Number(weight);

    if(isNaN(heightNum) || isNaN(weightNum) || !height || !weight) {
        res.status(400).json({ error: "malformated parameters" });
    }

    const result = calculateBmi(heightNum, weightNum);
    return res.status(200).json( {
        weight: weightNum,
        height: heightNum,
        bmi: result
    });
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (Object.keys(_req.body).length < 2) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = _req.body;
  const targetNum = Number(target);
  const daily_exercisesAr = daily_exercises as number[];

  if((isNaN(targetNum)) || (target <= 0) ||
  (!Array.isArray(daily_exercisesAr) || !daily_exercisesAr.every(n => typeof n === 'number'))) {
    throw new Error('malformated parameters');
  }

  const result = calculateExercises(daily_exercisesAr, targetNum);
  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
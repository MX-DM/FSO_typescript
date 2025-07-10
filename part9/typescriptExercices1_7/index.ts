import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/bmi', (_req, res) => {
    if(Object.keys(_req.query).length === 0){
        return res.send("Welcome to BMI calculator. Send your height and weight as query params!")
    }
    const { height, weight } = _req.query
    const heightNum = Number(height)
    const weightNum = Number(weight)

    if(isNaN(heightNum) || isNaN(weightNum) || !height || !weight) {
        res.status(400).json({ error: "malformated parameters" })
    }

    const result = calculateBmi(heightNum, weightNum)
    return res.status(200).json( {
        weight: weightNum,
        height: heightNum,
        bmi: result
    })
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
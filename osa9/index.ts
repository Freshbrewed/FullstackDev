import express from 'express';
import { calculateBmi } from './bmiCalculator'

//const express = require('express');
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log('Request.query: ', req.query);

  const height: number = +req.query.height!;
  const weight: number = +req.query.weight!;

  if (height > 0 && weight > 0) {
    try {
      const bmi = calculateBmi(height, weight)

      res.json((
        {
          weight,
          height,
          bmi
        }
      ))
    }
    catch (exception) {
      res.json((exception))
    }
  }
  return res.json(
    {
      error: "malformatted params"
    }
  )
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
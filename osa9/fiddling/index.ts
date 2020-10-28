import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
import bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

interface Body {
  daily_exercises: Array<number>;
  target: number;
}


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/exercises', (_req, res) => {
  res.json(
    {
      info: 'Use this endpoint with POST. Example of correctly formatted data below.',
      example: {
        "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
        "target": 2.5
      }
    }
  );
});

app.get('/bmi', (req, res) => {
  console.log('Request.query: ', req.query);

  if (req.query.weight && req.query.height) {
    const weight = req.query.weight as unknown as number;
    const height = req.query.height as unknown as number;
    //! is a promise that req.query.height is indeed known variable, + is forcing coming string into number type.
    //const height: number = +req.query.height!;
    //const weight: number = +req.query.weight!;
    if (height > 0 && weight > 0) {
      try {
        const bmi = calculateBmi(height, weight);
        return res.json({
          weight,
          height,
          bmi
        });
      }
      catch (exception) {
        return res.json(exception);
      }
    } return res.status(400).json({ error: "Malformatted params" });
  } return res.status(400).json({ error: "Missing query parameters!" });
});

app.post('/exercises', (req, res) => {
  const body: Body = req.body as Body;
  const { daily_exercises, target } = body;

  if (!daily_exercises || !target) return res.status(400).json({ error: 'missing parameters' });

  if (daily_exercises.length > 0 && target > 0) {
    try {
      const result = exerciseCalculator(target, daily_exercises);
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  } return res.status(400).json({ error: 'malformatted params' });

});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
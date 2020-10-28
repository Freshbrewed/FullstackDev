import express from 'express';
import { calculateBmi } from './bmiCalculator';
import bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());




app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log('Request.query: ', req.query);

  if (req.query.weight && req.query.height) {
    const weight = req.query.weight as unknown as number;
    const height = req.query.height as unknown as number;
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
    //! is a promise that req.query.height is indeed known variable, + is forcing coming string into number type.
    //const height: number = +req.query.height!;
    //const weight: number = +req.query.weight!;
  } return res.status(400).json({ error: "Missing query parameters!" });
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
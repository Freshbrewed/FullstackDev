

type Result = string;

const calculateBmi = (a: number, b: number): Result  => {

    const bmi = b / ( (a / 100) * (a / 100) );
    if ( bmi <= 18.5) return 'Underweight';
    if ( bmi <= 25 ) return 'Normal (healthy weight)';
    if ( bmi <= 30 ) return 'Overweight';
    return 'Obese';
   
}


  console.log(calculateBmi(180, 74));
  console.log(calculateBmi(180, 95));



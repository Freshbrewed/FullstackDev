
interface ParsedArguments {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): ParsedArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else throw new Error('Provided values were not numbers!');
};

export const calculateBmi = (a: number, b: number): string => {

  const bmi = b / ((a / 100) * (a / 100));
  if (bmi <= 18.5) return 'Underweight';
  if (bmi <= 25) return 'Normal (healthy weight)';
  if (bmi <= 30) return 'Overweight';
  return 'Obese';
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));

} catch (e) {
  console.log('Ooooops, this is my only clue: ', e);
}

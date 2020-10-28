interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface parseExerciseArgs {
    hours: Array<number>;
    target: number;
}

const parsedArguments = (args: Array<string>): parseExerciseArgs => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const hoursInArray = [];
    for (let i = 3; i < args.length; i++) {
        if (isNaN(Number(args[i]))) throw new Error('Your argument had a wrong value! Only numbers allowed.');
        hoursInArray.push(args[i]);
    }
    //+e changes string type of element into an int
    const castToIntArray = hoursInArray.map(e => +e);

    if (!isNaN(Number(args[2]))) {
        return {
            hours: castToIntArray,
            target: Number(args[2])
        };
    } else throw new Error('Provided values were not numbers!');
};

const exerciseCalculator = (target: number, days: Array<number>): ExerciseResult => {

    // const daysCount = days.length;
    // const trainingDays = days.filter(c => c !== 0).length;

    const training = days.reduce((acc, current) => {
        if (current !== 0) {
            acc.days++;
            acc.hours += current;
        }
        return acc;
    }, { days: 0, hours: 0 });

    const average = training.hours / days.length;

    if (average < 1.5) return {
        periodLength: days.length,
        trainingDays: training.days,
        success: false,
        rating: 1,
        ratingDescription: 'did you honestly try?',
        target: target,
        average: average
    };

    if (average < 2.5) return {
        periodLength: days.length,
        trainingDays: training.days,
        success: false,
        rating: 2,
        ratingDescription: 'not too bad but could be better',
        target: target,
        average: average
    };

    return {
        periodLength: days.length,
        trainingDays: training.days,
        success: true,
        rating: 3,
        ratingDescription: 'well done champ!',
        target: target,
        average: average
    };
};

try {
    const { hours, target } = parsedArguments(process.argv);
    console.log(exerciseCalculator(target, hours));
} catch (e) {
    console.log('Whoopsiee, this is all I can get for you this time: ', e);
}


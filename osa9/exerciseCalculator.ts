interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const exercisecalculator = (days: Array<number>, target: number): ExerciseResult => {

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
}




console.log(exercisecalculator([3, 0, 2, 4.5, 0, 3, 1], 2));

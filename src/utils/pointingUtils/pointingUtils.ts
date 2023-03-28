export const isUsernameInSelectedStory = (selectedStoryData: any, loggedInUsername: string | null): boolean => {
    for (const member of selectedStoryData?.members) {
        console.log('mem: ', member?.pointName, ' | usr: ', loggedInUsername);
        if(member?.pointName === loggedInUsername) {
            return true;
        }
    }
    return false;
};

export const calcAveragePoints = (selectedStoryData: any): string | number => {
    let runningTotal: number = 0;
    let numOfIterations = 0;
    for (const data of selectedStoryData?.members) {
        if (data?.pointValue !== -1) {
            runningTotal += data?.pointValue;
            numOfIterations++;
        }
    }
    if (numOfIterations !== 0) {
        return (runningTotal / numOfIterations).toFixed(1);
    }
    return '???';
};
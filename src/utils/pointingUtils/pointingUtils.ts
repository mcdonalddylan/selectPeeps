export const isUsernameInSelectedStory = (selectedStoryData: any, loggedInUsername: string | null): boolean => {
    if (selectedStoryData?.members) {
        for (const member of selectedStoryData?.members) {
            if(member?.pointName === loggedInUsername) {
                return true;
            }
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

export const sortDataByDate = (dataList: any[]) => {
    return dataList?.sort((x, y) => {
        return new Date(y?.timeStamp).getTime() - new Date(x?.timeStamp).getTime();
    });
};
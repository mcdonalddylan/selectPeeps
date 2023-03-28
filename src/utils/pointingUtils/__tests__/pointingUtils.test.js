import { isUsernameInSelectedStory } from '../pointingUtils';
import storyData from '../../../testSetup/pointingDataExample.json';

describe('pointingUtils.ts', () => {

    test('should be true if the story data ', () => {
        expect(isUsernameInSelectedStory(storyData[0], 'Steve')).toBe(true);
    });
});
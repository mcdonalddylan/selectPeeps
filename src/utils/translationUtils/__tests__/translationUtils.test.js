import { formatMessage } from "../translationUtils";

describe('translationUtils.ts', () => {

    test('should render alien language for techtro button if al is passed in', () => {
        expect(formatMessage('Site.Techtro.Button', 'al')).toBe('^($*^#$$!!?');
    });
});
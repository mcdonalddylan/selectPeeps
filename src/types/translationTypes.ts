export type TSupportLanguages = (
    'en' |
    'hi' |
    'es' |
    'cn' |
    'al'
);

interface ITranslation {
    en: string;
    hi: string;
    es: string;
    cn: string;
    al: string;
};

export type Translations<T extends string> = {
    [key in T]: ITranslation;
}

export type TPageTranslationKeys = (
    'Site.Common.Submit' |
    'Site.Common.Cancel' |
    'Site.Common.Date' |
    'Site.Common.View' |
    'Site.Techtro.Button' |
    'Site.Retro.Button' |
    'Site.Pointing.Button' |
    'Site.Pointing.StoryName' |
    'Site.Pointing.ChosenPoints' |
    'Site.Pointing.RevealPoints' |
    'Site.Pointing.HidePoints' |
    'Site.Pointing.AvgPoints' |
    'Site.Language.Button' |
    'Site.Login.Welcome' |
    'Site.Login.Button' |
    'Site.Login.Placeholder' |
    'Site.Login.Join' |
    'Site.Logout.Button' |
    'Site.Randomize.Button' |
    'Site.NextPerson.Button' |
    'Site.AddNewPerson.Title' |
    'Site.AddNewPerson.Placeholder' |
    'Site.AddNewStory.Placeholder' |
    'Site.TeamSelect.Team' |
    'Site.TeamSelect.Get Support' |
    'Site.TeamSelect.CSR'
);
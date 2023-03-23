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
    'Site.Techtro.Button' |
    'Site.Retro.Button' |
    'Site.Pointing.Button' |
    'Site.Pointing.AvgPoints' |
    'Site.Language.Button' |
    'Site.Randomize.Button' |
    'Site.NextPerson.Button' |
    'Site.AddNewPerson.Title' |
    'Site.AddNewPerson.Placeholder' |
    'Site.TeamSelect.Team' |
    'Site.TeamSelect.Get Support' |
    'Site.TeamSelect.CSR'
);
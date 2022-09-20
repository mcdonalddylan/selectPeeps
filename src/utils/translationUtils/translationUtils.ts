import { pageTranslations } from "../../pageTranslations";
import { TPageTranslationKeys, TSupportLanguages } from "../../types/translationTypes";

export const formatMessage = (textKey: TPageTranslationKeys, language: TSupportLanguages): string => {
    return pageTranslations[textKey][language];
}
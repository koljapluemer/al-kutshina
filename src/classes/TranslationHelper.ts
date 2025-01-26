import translations from "../data/translations.json";

export class TranslationHelper {
    public static getTranslationForKey(language: string, key: string): string | undefined {
        if (language === 'de') {
            return translations.find(translation => translation.key === key)?.de
        } else if (language === 'ar') {
            return translations.find(translation => translation.key === key)?.ar
        } else if (language === 'es') {
            return translations.find(translation => translation.key === key)?.es
        }

    }

    public static getAudioPathForKey(language: string, key: string): string {
        return '/assets/speech/' + language + '/' + key + '.mp3'
    }
}
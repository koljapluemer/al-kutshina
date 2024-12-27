import translations from "../data/translations.json";

export class TranslationHelper {
    public static getTranslationForKey(key:string):string | undefined {
        return translations.find(translation => translation.key === key)?.ar
    }

    public static getAudioPathForKey(key:string): string  {
        return '/assets/speech/' + key + '.mp3'
    }
}
import { translations } from "../data/translations";

export class TranslationHelper {
    public static getTranslationForKey(key:string):string | undefined {
        return translations.find(translation => translation.key === key)?.arz
    }

    public static getAudioPathForKey(key:string): string  {
        return '/assets/speech/' + key + '.mp3'
    }
}
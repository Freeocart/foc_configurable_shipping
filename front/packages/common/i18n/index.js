export const LANGUAGE_CODES = [
  'en-gb',
  'ru-ru'
]

export const isLanguageSupported = (languageCode) => LANGUAGE_CODES.includes(languageCode)

export async function loadCommonLanguageData (languageCode) {
  if (languageCode && isLanguageSupported(languageCode)) {
    const languageCommonData = await import(`./${languageCode}.json`)
    return languageCommonData
  }

  throw new Error('Cannot find requested language code')
}
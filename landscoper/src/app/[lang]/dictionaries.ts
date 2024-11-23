import 'server-only'

const dictionaries: any = {
    am: () => import('./dictionaries/am.json').then((module) => module.default),
    en: () => import('./dictionaries/en.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => dictionaries[locale]()
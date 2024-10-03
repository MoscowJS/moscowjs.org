export * from './speaker.h'
export * from './talk.h'
export * from './config.h'
export * from './meetup.h'
export * from './page.h'
export * from './paper.h'
export * from './navigation.h'
export * from './question.h'
export * from './partners.h'

export type WrappedWithDirectus<TDirectusType, TDirectusSystemType = never> = {
  directus: TDirectusType
  directus_system: TDirectusSystemType
}

export * from './speaker.h'
export * from './talk.h'
export * from './config.h'
export * from './meetup.h'
export * from './page.h'
export * from './navigation.h'

export type WrappedWithDirectus<TDataType> = {
  directus: TDataType
}

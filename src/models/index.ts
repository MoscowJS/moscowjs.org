export * from './speaker.h'
export * from './talk.h'
export * from './config.h'
export * from './meetup.h'

export type WrappedWithDirectus<TDataType> = {
  directus: TDataType
}

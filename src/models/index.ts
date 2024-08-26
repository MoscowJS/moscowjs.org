export * from './speaker.h'
export * from './talk.h'

export type WrappedWithDirectus<TName extends string, TDataType> = {
  directus: { [key in TName]: TDataType }
}

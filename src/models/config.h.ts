type ConfigType = 'meta' | 'config' | 'qna'

export type Config = {
  name: string
  value: string
  type: ConfigType
}

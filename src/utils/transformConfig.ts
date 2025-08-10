import type { Config } from '../models'

export const transformConfig = (
  records: Array<Pick<Config, 'name' | 'value'>>
) => {
  return records.reduce<{ [k in string]: Pick<Config, 'name' | 'value'> }>(
    (result, record) => {
      result[record.name] = record
      return result
    },
    {}
  )
}

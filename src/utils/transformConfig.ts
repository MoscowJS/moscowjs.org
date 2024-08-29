import type { ConfigData } from 'models'

export const transformConfig = (records: Array<{ data: ConfigData }>) => {
  return records.reduce<{ [k in string]: ConfigData }>((result, record) => {
    result[record.data.name] = record.data
    return result
  }, {})
}

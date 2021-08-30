export const airtableDateFix = (date: Date) => {
  const newDate = new Date(date)
  newDate.setHours(newDate.getHours() - 3)

  return newDate
}

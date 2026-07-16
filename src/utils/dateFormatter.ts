function dateFormatter(date: string | null): string {
  if (date === null) {
    return ''
  }
  const dateComponents: string[] = date.split('-')
  let era, year, month, day
  if (dateComponents[0].length === 0) {
    era = 'BC'
    year = Number.parseInt(dateComponents[1])
    month = Number.parseInt(dateComponents[2])
    day = Number.parseInt(dateComponents[3])
  } else {
    era = 'AD'
    year = Number.parseInt(dateComponents[0])
    month = Number.parseInt(dateComponents[1])
    day = Number.parseInt(dateComponents[2])
  }

  const dateObject = new Date()
  dateObject.setFullYear(year)
  dateObject.setMonth(month)
  dateObject.setDate(day)
  return `${dateObject.toLocaleDateString(navigator.language, { year: 'numeric', month: 'long', day: 'numeric' })} ${era}`
}

export { dateFormatter }

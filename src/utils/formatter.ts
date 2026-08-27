import { TEXT_REPLACEMENTS } from '@/constants/constants'
import { HistoricalEvent, NestedPosition, Position } from '@/types'

const coordinatesFormatter = (coordinates: NestedPosition): NestedPosition => {
  const cloned: NestedPosition = JSON.parse(JSON.stringify(coordinates))

  let anchorLong: number | null = null
  const findAnchor = (node: NestedPosition): void => {
    if (typeof node[0] === 'number') {
      anchorLong = node[0] as number
      return
    }
    if (Array.isArray(node) && node.length > 0) {
      findAnchor(node[0] as NestedPosition)
    }
  }
  findAnchor(cloned)
  if (anchorLong === null) return cloned

  const unwrapPoint = (pos: Position): void => {
    let long = pos[0]
    while (long - anchorLong! > 180) long -= 360
    while (long - anchorLong! < -180) long += 360
    pos[0] = long
  }

  const processNode = (node: NestedPosition): void => {
    if (!Array.isArray(node)) return

    if (typeof node[0] === 'number') {
      unwrapPoint(node as Position)
      return
    }

    for (let i = 0; i < node.length; i++) {
      processNode(node[i] as NestedPosition)
    }
  }
  processNode(cloned)

  return cloned
}

const eventDateTimeFormatter = (event: HistoricalEvent): string => {
  if (event.eventDate === null) {
    return ''
  }
  const dateComponents: string[] = event.eventDate.split('-')
  let era, year, month, day
  if (dateComponents[0].length === 0) {
    era = 'BC'
    year = Number.parseInt(dateComponents[1])
    month = Number.parseInt(dateComponents[2])
    day = Number.parseInt(dateComponents[3])
  } else {
    year = Number.parseInt(dateComponents[0])
    month = Number.parseInt(dateComponents[1])
    day = Number.parseInt(dateComponents[2])
  }

  const dateObject = new Date()
  dateObject.setFullYear(year)
  dateObject.setMonth(month - 1)
  dateObject.setDate(day)

  const outputDate: string = dateObject.toLocaleString(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  let outputTime: string = ''
  if (event.eventTime !== null) {
    const timeComponents: string[] = event.eventTime.split(':')
    dateObject.setHours(Number.parseInt(timeComponents[0]))
    dateObject.setMinutes(Number.parseInt(timeComponents[1]))
    outputTime = `${dateObject.toLocaleTimeString(navigator.language, { hour: 'numeric', minute: 'numeric' })}`
  }
  let outputDateTime = `${outputDate} ${outputTime}`
  if (era === 'BC') {
    outputDateTime += ` ${era}`
  }

  return outputDateTime
}

const escapedKeys = Array.from(TEXT_REPLACEMENTS.keys()).map((key) =>
  key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
)
const replacementRegex = new RegExp(escapedKeys.join('|'), 'gi')
const locationSearchFormatter = (locationName: string): string => {
  return locationName.replaceAll(replacementRegex, (matched) => {
    const replacement = TEXT_REPLACEMENTS.get(matched.toLowerCase())
    return replacement !== undefined ? replacement : matched
  })
}

export { coordinatesFormatter, eventDateTimeFormatter, locationSearchFormatter }

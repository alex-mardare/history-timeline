type Position = [number, number]
type NestedPosition = Position | NestedPosition[]

interface Coordinate {
  lat: number
  long: number
}

interface MapCenter extends Coordinate {
  zoom: number
}

export type { MapCenter, NestedPosition, Position }

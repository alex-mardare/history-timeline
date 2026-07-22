type Position = [number, number]
type NestedPosition = Position | NestedPosition[]

interface MapCenter extends Position {
  zoom: number
}

export type { MapCenter, NestedPosition, Position }

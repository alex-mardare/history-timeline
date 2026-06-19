interface Coordinates {
  lat: number
  lng: number
}

interface MapCenter extends Coordinates {
  zoom: number
}

export type { MapCenter }

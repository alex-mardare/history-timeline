import L from 'leaflet'

const clusterIcon = (className: string, count: number) =>
  L.divIcon({
    className: className,
    html: `<div><span>${count}</span></div>`,
    iconSize: L.point(40, 40)
  })

export { clusterIcon }

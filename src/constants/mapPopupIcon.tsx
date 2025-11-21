import L from 'leaflet'

const mapPopupIcon = new L.Icon({
  iconUrl: 'assets/markerIcon.png',
  shadowUrl: 'assets/markerShadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export { mapPopupIcon }

import Map, { FullscreenControl, NavigationControl, MapProvider } from 'react-map-gl/maplibre'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Protocol } from 'pmtiles'
import { useCallback, useEffect, useState } from 'react'
import { IconMapPin } from '@tabler/icons-react'

export default function MapComponent() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Add the PMTiles protocol to maplibre-gl
  useEffect(() => {
    let protocol = new Protocol()
    maplibregl.addProtocol('pmtiles', protocol.tile)
    return () => {
      maplibregl.removeProtocol('pmtiles')
    }
  }, [])

  const handleLoad = useCallback(() => setIsLoaded(true), [])

  return (
    <MapProvider>
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-desert-sand">
          <IconMapPin className="size-12 text-desert-green animate-pulse" />
          <p className="mt-3 text-text-secondary text-sm font-medium">Loading map...</p>
        </div>
      )}
      <Map
        reuseMaps
        onLoad={handleLoad}
        style={{
          width: '100%',
          height: '100vh',
        }}
        mapStyle={`${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/maps/styles`}
        mapLib={maplibregl}
        initialViewState={{
          longitude: -101,
          latitude: 40,
          zoom: 3.5,
        }}
      >
        <NavigationControl style={{ marginTop: '110px', marginRight: '36px' }} />
        <FullscreenControl style={{ marginTop: '30px', marginRight: '36px' }} />
      </Map>
    </MapProvider>
  )
}

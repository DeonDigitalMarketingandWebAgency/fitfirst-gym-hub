
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapToken, setMapToken] = useState<string | null>(localStorage.getItem('mapbox-token'));
  const [showTokenInput, setShowTokenInput] = useState<boolean>(!mapToken);

  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.006, 40.7128], // Example location (NYC)
      zoom: 14
    });

    const marker = new mapboxgl.Marker({ color: "#FF6B35" })
      .setLngLat([-74.006, 40.7128])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Fitness First Gym</h3><p>123 Fitness Avenue<br>Cityville, State 12345</p>"))
      .addTo(map.current);
      
    marker.togglePopup(); // Show popup by default

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapToken]);

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tokenInput = (e.currentTarget.elements.namedItem('mapbox-token') as HTMLInputElement).value;
    
    if (tokenInput) {
      localStorage.setItem('mapbox-token', tokenInput);
      setMapToken(tokenInput);
      setShowTokenInput(false);
    }
  };

  return (
    <div className="relative w-full h-full">
      {showTokenInput ? (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center p-4 z-10">
          <div className="max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Enter Mapbox Access Token</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please enter your Mapbox public token to display the map. 
              You can get one for free at <a href="https://www.mapbox.com" target="_blank" rel="noreferrer" className="text-gym-orange hover:underline">mapbox.com</a>
            </p>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <input 
                type="text" 
                name="mapbox-token" 
                placeholder="pk.eyJ1Ijoie3VzZXJuYW1lfSIsImEiOiJ..."
                className="w-full p-2 border rounded"
                required
              />
              <Button type="submit" className="bg-gym-orange hover:bg-gym-orange/90">
                Load Map
              </Button>
            </form>
          </div>
        </div>
      ) : null}
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default MapComponent;

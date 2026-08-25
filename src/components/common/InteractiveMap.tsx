import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationPoint, VehicleCategory, DemandHeatmapZone } from '../../types';
import { Layers, Compass, Plus, Minus, Sparkles, Navigation, MapPin, Flame } from 'lucide-react';

interface InteractiveMapProps {
  pickup?: LocationPoint;
  dropoff?: LocationPoint;
  routeProgress?: number; // 0 to 100
  showNearbyDrivers?: boolean;
  vehicleType?: VehicleCategory;
  driverName?: string;
  driverPlate?: string;
  height?: string;
  className?: string;
  interactive?: boolean;
  onSelectLocation?: (location: LocationPoint) => void;
  // Demand Heatmap props
  showHeatmap?: boolean;
  heatmapZones?: DemandHeatmapZone[];
  selectedHeatmapZoneId?: string | null;
  onSelectHeatmapZone?: (zone: DemandHeatmapZone) => void;
  showHeatmapLegend?: boolean;
}

// Free Tile Layer Options (100% Free, zero API key required)
const TILE_LAYERS = {
  dark: {
    name: 'CartoDB Dark Matter',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  },
  light: {
    name: 'CartoDB Positron',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  },
  voyager: {
    name: 'CartoDB Voyager',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  },
  osm: {
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abc',
    maxZoom: 19
  }
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  pickup,
  dropoff,
  routeProgress = 0,
  showNearbyDrivers = true,
  vehicleType = 'sedan',
  driverName = 'Juan Dela Cruz',
  driverPlate = 'NDA 1234',
  height = 'h-64',
  className = '',
  interactive = true,
  onSelectLocation,
  showHeatmap = false,
  heatmapZones = [],
  selectedHeatmapZoneId = null,
  onSelectHeatmapZone,
  showHeatmapLegend = true
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const pickupMarkerRef = useRef<L.Marker | null>(null);
  const dropoffMarkerRef = useRef<L.Marker | null>(null);
  const driverMarkerRef = useRef<L.Marker | null>(null);
  const nearbyDriversGroupRef = useRef<L.LayerGroup | null>(null);
  const heatmapGroupRef = useRef<L.LayerGroup | null>(null);
  const routePolylineGlowRef = useRef<L.Polyline | null>(null);
  const routePolylineCoreRef = useRef<L.Polyline | null>(null);
  const zoneLayersMapRef = useRef<Map<string, {
    outerCircle: L.Circle;
    midCircle: L.Circle;
    coreCircle: L.Circle;
    badgeMarker: L.Marker;
  }>>(new Map());

  const [currentTileStyle, setCurrentTileStyle] = useState<keyof typeof TILE_LAYERS>('dark');
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [isHeatmapEnabled, setIsHeatmapEnabled] = useState<boolean>(showHeatmap);

  // Sync internal state when showHeatmap prop changes
  useEffect(() => {
    setIsHeatmapEnabled(showHeatmap);
  }, [showHeatmap]);

  // Default coordinate center (Metro Manila hub / Quezon City)
  const defaultCenter = useMemo<[number, number]>(() => {
    if (pickup) return [pickup.lat, pickup.lng];
    if (dropoff) return [dropoff.lat, dropoff.lng];
    if (heatmapZones.length > 0 && selectedHeatmapZoneId) {
      const selected = heatmapZones.find(z => z.id === selectedHeatmapZoneId);
      if (selected) return [selected.lat, selected.lng];
    }
    return [14.5650, 121.0250]; // Centered around Metro Manila CBDs
  }, [pickup, dropoff, heatmapZones, selectedHeatmapZoneId]);

  // Route path coordinates calculation
  const routePoints = useMemo<[number, number][]>(() => {
    if (!pickup || !dropoff) return [];

    const points: [number, number][] = [];
    const midLat = (pickup.lat + dropoff.lat) / 2 + 0.0035;
    const midLng = (pickup.lng + dropoff.lng) / 2 - 0.0035;

    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const lat = Math.pow(1 - t, 2) * pickup.lat + 2 * (1 - t) * t * midLat + Math.pow(t, 2) * dropoff.lat;
      const lng = Math.pow(1 - t, 2) * pickup.lng + 2 * (1 - t) * t * midLng + Math.pow(t, 2) * dropoff.lng;
      points.push([lat, lng]);
    }
    return points;
  }, [pickup, dropoff]);

  // Moving driver interpolated location
  const driverCoords = useMemo<[number, number] | null>(() => {
    if (!pickup || !dropoff) return null;
    const t = Math.min(Math.max(routeProgress / 100, 0), 1);
    const midLat = (pickup.lat + dropoff.lat) / 2 + 0.0035;
    const midLng = (pickup.lng + dropoff.lng) / 2 - 0.0035;

    const lat = Math.pow(1 - t, 2) * pickup.lat + 2 * (1 - t) * t * midLat + Math.pow(t, 2) * dropoff.lat;
    const lng = Math.pow(1 - t, 2) * pickup.lng + 2 * (1 - t) * t * midLng + Math.pow(t, 2) * dropoff.lng;

    return [lat, lng];
  }, [pickup, dropoff, routeProgress]);

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create map instance
    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 12,
      zoomControl: false,
      attributionControl: false
    });

    const activeTile = TILE_LAYERS[currentTileStyle];
    const tileLayer = L.tileLayer(activeTile.url, {
      attribution: activeTile.attribution,
      subdomains: activeTile.subdomains,
      maxZoom: activeTile.maxZoom
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Create LayerGroups
    const nearbyGroup = L.layerGroup().addTo(map);
    nearbyDriversGroupRef.current = nearbyGroup;

    const heatGroup = L.layerGroup().addTo(map);
    heatmapGroupRef.current = heatGroup;

    // Click handler for pin placement
    if (interactive && onSelectLocation) {
      map.on('click', (e: L.LeafletMouseEvent) => {
        onSelectLocation({
          name: 'Selected Pin on Map',
          address: `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`,
          lat: e.latlng.lat,
          lng: e.latlng.lng
        });
      });
    }

    mapInstanceRef.current = map;
    setMapReady(true);

    // Invalidate size once container mounts for crisp tiles
    setTimeout(() => {
      map.invalidateSize();
    }, 150);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      setMapReady(false);
    };
  }, []);

  // 2. Switch Tile Layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const activeTile = TILE_LAYERS[currentTileStyle];
    const newTileLayer = L.tileLayer(activeTile.url, {
      attribution: activeTile.attribution,
      subdomains: activeTile.subdomains,
      maxZoom: activeTile.maxZoom
    }).addTo(map);

    tileLayerRef.current = newTileLayer;
  }, [currentTileStyle]);

  // 3. Render Route Polylines
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady) return;

    // Clean up existing polylines
    if (routePolylineGlowRef.current) {
      map.removeLayer(routePolylineGlowRef.current);
      routePolylineGlowRef.current = null;
    }
    if (routePolylineCoreRef.current) {
      map.removeLayer(routePolylineCoreRef.current);
      routePolylineCoreRef.current = null;
    }

    if (routePoints.length > 0) {
      // Glow underlay polyline
      const glow = L.polyline(routePoints, {
        color: '#f59e0b',
        weight: 8,
        opacity: 0.35,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);
      routePolylineGlowRef.current = glow;

      // Core crisp polyline
      const core = L.polyline(routePoints, {
        color: '#fbbf24',
        weight: 4,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);
      routePolylineCoreRef.current = core;

      // Auto fit bounds
      if (pickup && dropoff) {
        const bounds = L.latLngBounds([
          [pickup.lat, pickup.lng],
          [dropoff.lat, dropoff.lng]
        ]);
        map.fitBounds(bounds, {
          padding: [45, 45],
          maxZoom: 15,
          animate: true
        });
      }
    }
  }, [mapReady, routePoints, pickup, dropoff]);

  // 4. Render Pickup Pin (Custom DivIcon)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady) return;

    if (pickup) {
      const pickupHtml = `
        <div class="flex flex-col items-center select-none" style="transform: translate(-50%, -100%);">
          <div style="background:#0f172a; color:#34d399; padding:2px 6px; border-radius:6px; font-size:9px; font-weight:800; border:1px solid rgba(52,211,153,0.5); box-shadow:0 4px 6px -1px rgba(0,0,0,0.5); white-space:nowrap; margin-bottom:2px; display:flex; align-items:center; gap:3px;">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#34d399;"></span>
            PICKUP
          </div>
          <div style="width:28px; height:28px; border-radius:50%; background:#10b981; border:2px solid #ffffff; box-shadow:0 10px 15px -3px rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; color:#ffffff;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: pickupHtml,
        iconSize: [0, 0]
      });

      if (!pickupMarkerRef.current) {
        pickupMarkerRef.current = L.marker([pickup.lat, pickup.lng], { icon: customIcon }).addTo(map);
      } else {
        pickupMarkerRef.current.setLatLng([pickup.lat, pickup.lng]);
        pickupMarkerRef.current.setIcon(customIcon);
      }
    } else if (pickupMarkerRef.current) {
      map.removeLayer(pickupMarkerRef.current);
      pickupMarkerRef.current = null;
    }
  }, [pickup, mapReady]);

  // 5. Render Dropoff Pin (Custom DivIcon)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady) return;

    if (dropoff) {
      const dropoffHtml = `
        <div class="flex flex-col items-center select-none" style="transform: translate(-50%, -100%);">
          <div style="background:#450a0a; color:#fca5a5; padding:2px 6px; border-radius:6px; font-size:9px; font-weight:800; border:1px solid rgba(239,68,68,0.5); box-shadow:0 4px 6px -1px rgba(0,0,0,0.5); white-space:nowrap; margin-bottom:2px; display:flex; align-items:center; gap:3px;">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#ef4444;"></span>
            DESTINATION
          </div>
          <div style="width:28px; height:28px; border-radius:50%; background:#ef4444; border:2px solid #ffffff; box-shadow:0 10px 15px -3px rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; color:#ffffff;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: dropoffHtml,
        iconSize: [0, 0]
      });

      if (!dropoffMarkerRef.current) {
        dropoffMarkerRef.current = L.marker([dropoff.lat, dropoff.lng], { icon: customIcon }).addTo(map);
      } else {
        dropoffMarkerRef.current.setLatLng([dropoff.lat, dropoff.lng]);
        dropoffMarkerRef.current.setIcon(customIcon);
      }
    } else if (dropoffMarkerRef.current) {
      map.removeLayer(dropoffMarkerRef.current);
      dropoffMarkerRef.current = null;
    }
  }, [dropoff, mapReady]);

  // 6. Moving Driver Marker (Custom DivIcon with active vehicle details)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady) return;

    if (driverCoords && pickup && dropoff && routeProgress > 0) {
      const driverHtml = `
        <div class="flex flex-col items-center select-none" style="transform: translate(-50%, -50%);">
          <div style="background:#0f172a; color:#fbbf24; padding:2px 6px; border-radius:6px; font-size:9px; font-weight:800; border:1px solid rgba(251,191,36,0.6); box-shadow:0 4px 6px -1px rgba(0,0,0,0.5); white-space:nowrap; margin-bottom:2px;">
            🚗 ${driverPlate}
          </div>
          <div style="width:34px; height:34px; border-radius:12px; background:#fbbf24; border:2px solid #0f172a; box-shadow:0 10px 20px -3px rgba(245,158,11,0.6); display:flex; align-items:center; justify-content:center; color:#0f172a;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
          </div>
        </div>
      `;

      const customDriverIcon = L.divIcon({
        className: 'custom-driver-pin',
        html: driverHtml,
        iconSize: [0, 0]
      });

      if (!driverMarkerRef.current) {
        driverMarkerRef.current = L.marker(driverCoords, { icon: customDriverIcon, zIndexOffset: 1000 }).addTo(map);
      } else {
        driverMarkerRef.current.setLatLng(driverCoords);
        driverMarkerRef.current.setIcon(customDriverIcon);
      }
    } else if (driverMarkerRef.current) {
      map.removeLayer(driverMarkerRef.current);
      driverMarkerRef.current = null;
    }
  }, [driverCoords, routeProgress, driverPlate, pickup, dropoff, mapReady]);

  // 7. Nearby Available Drivers
  useEffect(() => {
    const group = nearbyDriversGroupRef.current;
    if (!group || !mapReady) return;

    group.clearLayers();

    if (showNearbyDrivers && (!pickup || !dropoff || routeProgress === 0)) {
      const baseLat = pickup?.lat || 14.5650;
      const baseLng = pickup?.lng || 121.0250;

      const nearbyPositions = [
        { lat: baseLat + 0.0035, lng: baseLng + 0.003 },
        { lat: baseLat - 0.003, lng: baseLng + 0.0045 },
        { lat: baseLat + 0.0055, lng: baseLng - 0.0035 },
        { lat: baseLat - 0.0045, lng: baseLng - 0.0025 }
      ];

      nearbyPositions.forEach((pos) => {
        const iconHtml = `
          <div style="transform: translate(-50%, -50%); width:28px; height:28px; border-radius:10px; background:#0f172a; border:1px solid #fbbf24; box-shadow:0 4px 10px rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; color:#fbbf24;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
          </div>
        `;
        const icon = L.divIcon({
          className: 'nearby-driver-pin',
          html: iconHtml,
          iconSize: [0, 0]
        });
        L.marker([pos.lat, pos.lng], { icon }).addTo(group);
      });
    }
  }, [showNearbyDrivers, pickup, dropoff, routeProgress, mapReady]);

  // 8. Demand Heatmap Overlay Layer Rendering with Smooth Transitions
  useEffect(() => {
    const heatGroup = heatmapGroupRef.current;
    const map = mapInstanceRef.current;
    if (!heatGroup || !map || !mapReady) return;

    if (!isHeatmapEnabled || heatmapZones.length === 0) {
      heatGroup.clearLayers();
      zoneLayersMapRef.current.clear();
      return;
    }

    const currentZoneIds = new Set(heatmapZones.map(z => z.id));

    // Remove any zones that no longer exist
    zoneLayersMapRef.current.forEach((layers, zoneId) => {
      if (!currentZoneIds.has(zoneId)) {
        heatGroup.removeLayer(layers.outerCircle);
        heatGroup.removeLayer(layers.midCircle);
        heatGroup.removeLayer(layers.coreCircle);
        heatGroup.removeLayer(layers.badgeMarker);
        zoneLayersMapRef.current.delete(zoneId);
      }
    });

    // Update or create layers for each zone
    heatmapZones.forEach(zone => {
      const isSelected = selectedHeatmapZoneId === zone.id;

      // Color coding based on surge multiplier & intensity
      let primaryColor = '#10b981'; // normal (green)
      let strokeColor = '#059669';
      let badgeBg = '#064e3b';
      let badgeText = '#6ee7b7';

      if (zone.surgeMultiplier >= 2.2 || zone.intensity >= 0.9) {
        primaryColor = '#ef4444'; // extreme red
        strokeColor = '#dc2626';
        badgeBg = '#7f1d1d';
        badgeText = '#fca5a5';
      } else if (zone.surgeMultiplier >= 1.7 || zone.intensity >= 0.75) {
        primaryColor = '#f97316'; // high orange
        strokeColor = '#ea580c';
        badgeBg = '#7c2d12';
        badgeText = '#fdba74';
      } else if (zone.surgeMultiplier >= 1.3 || zone.intensity >= 0.55) {
        primaryColor = '#f59e0b'; // moderate amber
        strokeColor = '#d97706';
        badgeBg = '#78350f';
        badgeText = '#fde68a';
      }

      const outerRadius = zone.radiusMeters * (isSelected ? 1.25 : 1.0);
      const outerOpacity = isSelected ? 0.28 : 0.18;
      const midRadius = zone.radiusMeters * 0.6;
      const midOpacity = isSelected ? 0.45 : 0.32;
      const coreRadius = zone.radiusMeters * 0.22;

      // Badge HTML with smooth CSS transitions
      const badgeHtml = `
        <div class="cursor-pointer select-none group transition-all duration-500 ease-out heatmap-zone-badge" style="transform: translate(-50%, -50%);">
          <div style="background:${badgeBg}; color:${badgeText}; padding:4px 8px; border-radius:9999px; font-size:10px; font-weight:900; font-family:monospace; border:1.5px solid ${strokeColor}; box-shadow:0 8px 16px -2px rgba(0,0,0,0.6); display:flex; align-items:center; gap:4px; white-space:nowrap; transition:all 0.5s ease; ${isSelected ? 'outline: 2px solid #ffffff; transform: scale(1.1);' : ''}">
            <span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:${primaryColor}; box-shadow:0 0 8px ${primaryColor}; transition:background 0.5s ease;"></span>
            <span>⚡ ${zone.surgeMultiplier.toFixed(1)}x</span>
            <span style="opacity:0.75; font-size:9px;">• ${zone.activeRequests} req/m</span>
          </div>
          <div style="background:rgba(9,9,11,0.92); color:#ffffff; font-size:9px; font-weight:700; padding:2px 6px; border-radius:6px; margin-top:2px; text-align:center; border:1px solid rgba(255,255,255,0.12); white-space:nowrap; transition:all 0.4s ease;">
            ${zone.name}
          </div>
        </div>
      `;

      const badgeIcon = L.divIcon({
        className: 'heatmap-zone-badge-wrapper',
        html: badgeHtml,
        iconSize: [0, 0]
      });

      const existing = zoneLayersMapRef.current.get(zone.id);

      if (existing) {
        // Smoothly update existing SVG paths without recreating elements
        existing.outerCircle.setLatLng([zone.lat, zone.lng]);
        existing.outerCircle.setRadius(outerRadius);
        existing.outerCircle.setStyle({
          fillColor: primaryColor,
          fillOpacity: outerOpacity
        });

        existing.midCircle.setLatLng([zone.lat, zone.lng]);
        existing.midCircle.setRadius(midRadius);
        existing.midCircle.setStyle({
          fillColor: primaryColor,
          fillOpacity: midOpacity,
          color: strokeColor,
          weight: isSelected ? 2.5 : 1.5,
          dashArray: isSelected ? '6, 6' : '4, 4'
        });

        existing.coreCircle.setLatLng([zone.lat, zone.lng]);
        existing.coreCircle.setRadius(coreRadius);
        existing.coreCircle.setStyle({
          fillColor: primaryColor,
          fillOpacity: 0.85,
          color: '#ffffff'
        });

        existing.badgeMarker.setLatLng([zone.lat, zone.lng]);
        existing.badgeMarker.setIcon(badgeIcon);
        existing.badgeMarker.setZIndexOffset(isSelected ? 1200 : 500);
      } else {
        // Create new layers with animation classes
        const outerCircle = L.circle([zone.lat, zone.lng], {
          radius: outerRadius,
          fillColor: primaryColor,
          fillOpacity: outerOpacity,
          stroke: false,
          interactive: false,
          className: 'leaflet-heatmap-circle'
        }).addTo(heatGroup);

        const midCircle = L.circle([zone.lat, zone.lng], {
          radius: midRadius,
          fillColor: primaryColor,
          fillOpacity: midOpacity,
          color: strokeColor,
          weight: isSelected ? 2.5 : 1.5,
          dashArray: isSelected ? '6, 6' : '4, 4',
          interactive: true,
          className: 'leaflet-heatmap-circle'
        }).addTo(heatGroup);

        const coreCircle = L.circle([zone.lat, zone.lng], {
          radius: coreRadius,
          fillColor: primaryColor,
          fillOpacity: 0.85,
          color: '#ffffff',
          weight: 2,
          interactive: true,
          className: 'leaflet-heatmap-circle'
        }).addTo(heatGroup);

        const badgeMarker = L.marker([zone.lat, zone.lng], {
          icon: badgeIcon,
          zIndexOffset: isSelected ? 1200 : 500
        }).addTo(heatGroup);

        const handleZoneClick = () => {
          if (onSelectHeatmapZone) {
            onSelectHeatmapZone(zone);
          }
        };

        midCircle.on('click', handleZoneClick);
        coreCircle.on('click', handleZoneClick);
        badgeMarker.on('click', handleZoneClick);

        zoneLayersMapRef.current.set(zone.id, {
          outerCircle,
          midCircle,
          coreCircle,
          badgeMarker
        });
      }
    });
  }, [isHeatmapEnabled, heatmapZones, selectedHeatmapZoneId, mapReady, onSelectHeatmapZone]);

  // Zoom and navigation handlers
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleRecenter = () => {
    if (pickup && dropoff) {
      const bounds = L.latLngBounds([
        [pickup.lat, pickup.lng],
        [dropoff.lat, dropoff.lng]
      ]);
      mapInstanceRef.current?.fitBounds(bounds, { padding: [45, 45] });
    } else {
      mapInstanceRef.current?.setView(defaultCenter, 12);
    }
  };

  const handleNextTileStyle = () => {
    const keys: (keyof typeof TILE_LAYERS)[] = ['dark', 'voyager', 'light', 'osm'];
    const nextIdx = (keys.indexOf(currentTileStyle) + 1) % keys.length;
    setCurrentTileStyle(keys[nextIdx]);
  };

  const toggleHeatmap = () => {
    setIsHeatmapEnabled(prev => !prev);
  };

  return (
    <div className={`relative w-full ${height} overflow-hidden rounded-2xl bg-slate-950 border border-slate-700/60 shadow-inner select-none ${className}`}>
      {/* Leaflet Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Map Controls */}
      {interactive && (
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
          {/* Heatmap Layer Toggle */}
          <button
            id="btn-leaflet-toggle-heatmap"
            onClick={toggleHeatmap}
            className={`w-8 h-8 rounded-lg border shadow-md flex items-center justify-center transition-all cursor-pointer ${
              isHeatmapEnabled
                ? 'bg-amber-500 text-black border-amber-400 font-bold ring-2 ring-amber-500/40 shadow-amber-500/30'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-400 border-slate-700/80'
            }`}
            title={`Demand Heatmap: ${isHeatmapEnabled ? 'Active (Click to Hide)' : 'Inactive (Click to Show)'}`}
          >
            <Flame className={`w-4 h-4 ${isHeatmapEnabled ? 'text-black fill-black' : 'text-slate-400'}`} />
          </button>

          <button
            id="btn-leaflet-zoom-in"
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-md flex items-center justify-center transition-colors cursor-pointer"
            title="Zoom in"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            id="btn-leaflet-zoom-out"
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-md flex items-center justify-center transition-colors cursor-pointer"
            title="Zoom out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            id="btn-leaflet-layer"
            onClick={handleNextTileStyle}
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 shadow-md flex items-center justify-center transition-colors cursor-pointer"
            title={`Tile Style: ${TILE_LAYERS[currentTileStyle].name} (Click to switch)`}
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            id="btn-leaflet-recenter"
            onClick={handleRecenter}
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 shadow-md flex items-center justify-center transition-colors cursor-pointer"
            title="Recenter Map"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Live Badge & Heatmap Indicator */}
      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 z-20">
        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 shadow-lg text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-slate-300 font-medium flex items-center gap-1.5 font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            {TILE_LAYERS[currentTileStyle].name}
          </span>
        </div>

        {isHeatmapEnabled && (
          <div className="flex items-center gap-1.5 bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/40 shadow-lg text-xs font-mono text-amber-300 font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Demand Heatmap Active</span>
          </div>
        )}
      </div>

      {/* Heatmap Spectrum Legend */}
      {isHeatmapEnabled && showHeatmapLegend && (
        <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-2 rounded-xl border border-zinc-800 shadow-xl z-20 text-[10px] font-mono text-slate-300 max-w-[280px]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-200 uppercase text-[9px] tracking-wider flex items-center gap-1">
              <Flame className="w-3 h-3 text-slate-400" />
              Surge & Demand Density
            </span>
            <span className="text-[9px] text-slate-400">Live Feed</span>
          </div>
          {/* Gradient Bar */}
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 via-orange-500 to-rose-600 mb-1.5 shadow-inner"></div>
          <div className="flex justify-between text-[9px] text-slate-400 font-medium">
            <span>Normal (1.0x)</span>
            <span>Moderate (1.4x)</span>
            <span>High (1.8x)</span>
            <span className="text-rose-400 font-bold">Surge (2.5x+)</span>
          </div>
        </div>
      )}

      {/* Driver telemetry on active trip */}
      {pickup && dropoff && routeProgress > 0 && routeProgress < 100 && (
        <div className="absolute bottom-3 left-3 right-3 bg-slate-950/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-zinc-800 shadow-xl flex items-center justify-between z-20 text-xs text-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold">
              <Navigation className="w-4 h-4 text-zinc-300" />
            </div>
            <div>
              <p className="font-bold text-slate-100">{driverName} • {driverPlate}</p>
              <p className="text-[10px] text-amber-400 font-medium">
                {routeProgress < 30 ? 'Driver en route to pickup point' : routeProgress < 90 ? 'Trip active on Metro Manila route' : 'Arriving at destination'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-black text-amber-400">{Math.round(routeProgress)}%</span>
            <p className="text-[9px] text-slate-400">Live GPS</p>
          </div>
        </div>
      )}
    </div>
  );
};

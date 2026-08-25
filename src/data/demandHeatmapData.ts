import { DemandHeatmapZone } from '../types';

export const INITIAL_DEMAND_ZONES: DemandHeatmapZone[] = [
  {
    id: 'zone-makati-cbd',
    name: 'Makati Central Business District',
    city: 'Makati City',
    lat: 14.5547,
    lng: 121.0244,
    radiusMeters: 1800,
    activeRequests: 285,
    availableDrivers: 32,
    surgeMultiplier: 2.2,
    intensity: 0.95,
    trend: 'up',
    category: 'commercial',
    avgWaitTimeMin: 8.5,
    recommendedIncentive: 60
  },
  {
    id: 'zone-bgc-taguig',
    name: 'Bonifacio Global City (BGC)',
    city: 'Taguig City',
    lat: 14.5503,
    lng: 121.0494,
    radiusMeters: 1900,
    activeRequests: 260,
    availableDrivers: 36,
    surgeMultiplier: 2.0,
    intensity: 0.92,
    trend: 'up',
    category: 'commercial',
    avgWaitTimeMin: 7.2,
    recommendedIncentive: 50
  },
  {
    id: 'zone-naia-t3',
    name: 'NAIA Terminal 3 Airport Arrivals',
    city: 'Pasay City',
    lat: 14.5204,
    lng: 121.0144,
    radiusMeters: 2200,
    activeRequests: 320,
    availableDrivers: 24,
    surgeMultiplier: 2.5,
    intensity: 0.98,
    trend: 'up',
    category: 'airport',
    avgWaitTimeMin: 11.0,
    recommendedIncentive: 80
  },
  {
    id: 'zone-ortigas-center',
    name: 'Ortigas Center & SM Megamall',
    city: 'Pasig / Mandaluyong',
    lat: 14.5847,
    lng: 121.0594,
    radiusMeters: 1600,
    activeRequests: 195,
    availableDrivers: 28,
    surgeMultiplier: 1.7,
    intensity: 0.82,
    trend: 'stable',
    category: 'commercial',
    avgWaitTimeMin: 6.0,
    recommendedIncentive: 40
  },
  {
    id: 'zone-moa-pasay',
    name: 'SM Mall of Asia & Bay Area',
    city: 'Pasay City',
    lat: 14.5352,
    lng: 120.9822,
    radiusMeters: 2000,
    activeRequests: 210,
    availableDrivers: 30,
    surgeMultiplier: 1.8,
    intensity: 0.86,
    trend: 'up',
    category: 'entertainment',
    avgWaitTimeMin: 6.8,
    recommendedIncentive: 45
  },
  {
    id: 'zone-cubao-transit',
    name: 'Araneta City Cubao Transit Terminal',
    city: 'Quezon City',
    lat: 14.6200,
    lng: 121.0530,
    radiusMeters: 1500,
    activeRequests: 175,
    availableDrivers: 25,
    surgeMultiplier: 1.6,
    intensity: 0.78,
    trend: 'stable',
    category: 'transit',
    avgWaitTimeMin: 5.5,
    recommendedIncentive: 35
  },
  {
    id: 'zone-qc-circle',
    name: 'QC Circle & North EDSA Vertis',
    city: 'Quezon City',
    lat: 14.6507,
    lng: 121.0350,
    radiusMeters: 1800,
    activeRequests: 160,
    availableDrivers: 34,
    surgeMultiplier: 1.4,
    intensity: 0.72,
    trend: 'down',
    category: 'commercial',
    avgWaitTimeMin: 4.8,
    recommendedIncentive: 30
  },
  {
    id: 'zone-eastwood-city',
    name: 'Eastwood Cyberpark & Libis',
    city: 'Quezon City',
    lat: 14.6105,
    lng: 121.0805,
    radiusMeters: 1400,
    activeRequests: 120,
    availableDrivers: 22,
    surgeMultiplier: 1.3,
    intensity: 0.65,
    trend: 'stable',
    category: 'commercial',
    avgWaitTimeMin: 4.2,
    recommendedIncentive: 25
  },
  {
    id: 'zone-alabang-filinvest',
    name: 'Filinvest City & Alabang Town',
    city: 'Muntinlupa City',
    lat: 14.4230,
    lng: 121.0420,
    radiusMeters: 2100,
    activeRequests: 105,
    availableDrivers: 20,
    surgeMultiplier: 1.2,
    intensity: 0.58,
    trend: 'down',
    category: 'commercial',
    avgWaitTimeMin: 4.0,
    recommendedIncentive: 20
  },
  {
    id: 'zone-ust-manila',
    name: 'Manila University Belt & Espana',
    city: 'City of Manila',
    lat: 14.6091,
    lng: 120.9897,
    radiusMeters: 1500,
    activeRequests: 145,
    availableDrivers: 29,
    surgeMultiplier: 1.5,
    intensity: 0.74,
    trend: 'up',
    category: 'residential',
    avgWaitTimeMin: 5.0,
    recommendedIncentive: 30
  }
];

export type TimeOfDayPreset = 'morning_rush' | 'afternoon_steady' | 'evening_peak' | 'late_night';

export const TIME_PRESETS: { id: TimeOfDayPreset; label: string; timeRange: string; multiplierFactor: number; desc: string }[] = [
  {
    id: 'evening_peak',
    label: 'Evening Rush Peak',
    timeRange: '17:30 - 21:00',
    multiplierFactor: 1.25,
    desc: 'Heavy outgoing business and dining commute across BGC, Makati, Ortigas & MOA.'
  },
  {
    id: 'morning_rush',
    label: 'Morning Inbound Rush',
    timeRange: '07:00 - 09:30',
    multiplierFactor: 1.15,
    desc: 'Dense suburban and transit inbound flow entering financial districts.'
  },
  {
    id: 'afternoon_steady',
    label: 'Midday Commercial',
    timeRange: '12:00 - 15:30',
    multiplierFactor: 0.9,
    desc: 'Evenly distributed intra-city retail, meeting, and restaurant demand.'
  },
  {
    id: 'late_night',
    label: 'Nightlife & Airport',
    timeRange: '22:30 - 04:00',
    multiplierFactor: 1.1,
    desc: 'Concentrated demand at NAIA terminals, entertainment strips & 24/7 BPOs.'
  }
];

// Helper to step real-time mock data fluctuation
export function simulateHeatmapTick(zones: DemandHeatmapZone[], timePreset: TimeOfDayPreset): DemandHeatmapZone[] {
  const preset = TIME_PRESETS.find(p => p.id === timePreset) || TIME_PRESETS[0];

  return zones.map(zone => {
    // Generate micro fluctuation between -4% and +4%
    const deltaPercent = (Math.random() * 8 - 4) / 100;
    const baseMultiplier = preset.multiplierFactor;
    
    let newRequests = Math.round(zone.activeRequests * (1 + deltaPercent));
    if (newRequests < 40) newRequests = 40;
    if (newRequests > 480) newRequests = 480;

    // Driver availability fluctuates based on natural dispatch
    const driverDelta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
    let newDrivers = zone.availableDrivers + driverDelta;
    if (newDrivers < 8) newDrivers = 8;
    if (newDrivers > 60) newDrivers = 60;

    // Compute surge multiplier based on demand-to-driver ratio
    const ratio = newRequests / (newDrivers * 3.5);
    let calculatedSurge = Math.round((1.0 + Math.max(0, ratio - 1) * 0.8 * baseMultiplier) * 10) / 10;
    calculatedSurge = Math.min(Math.max(calculatedSurge, 1.0), 3.0);

    const calculatedIntensity = Math.min(Math.max((calculatedSurge - 1.0) / 1.6 + (newRequests / 450) * 0.4, 0.2), 0.99);

    const trend: 'up' | 'down' | 'stable' = deltaPercent > 0.015 ? 'up' : deltaPercent < -0.015 ? 'down' : 'stable';

    const avgWait = Math.round((3.0 + (newRequests / newDrivers) * 0.6) * 10) / 10;

    return {
      ...zone,
      activeRequests: newRequests,
      availableDrivers: newDrivers,
      surgeMultiplier: calculatedSurge,
      intensity: Number(calculatedIntensity.toFixed(2)),
      trend,
      avgWaitTimeMin: avgWait
    };
  });
}

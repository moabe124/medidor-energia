export interface WireGauge {
  id: string;
  mm2: number;
  maxAmps: number;
  label: string;
  strokeWidth: number; // for visual representation
}

export const STANDARD_WIRES: WireGauge[] = [
  { id: '1.5', mm2: 1.5, maxAmps: 15.5, label: '1,5 mm²', strokeWidth: 4 },
  { id: '2.5', mm2: 2.5, maxAmps: 21, label: '2,5 mm²', strokeWidth: 8 },
  { id: '4.0', mm2: 4.0, maxAmps: 28, label: '4,0 mm²', strokeWidth: 12 },
  { id: '6.0', mm2: 6.0, maxAmps: 36, label: '6,0 mm²', strokeWidth: 18 },
  { id: '10.0', mm2: 10.0, maxAmps: 50, label: '10,0 mm²', strokeWidth: 26 },
  { id: '12.0', mm2: 12.0, maxAmps: 60, label: '12,0 mm²', strokeWidth: 32 },
  { id: '16.0', mm2: 16.0, maxAmps: 68, label: '16,0 mm²', strokeWidth: 40 },
];

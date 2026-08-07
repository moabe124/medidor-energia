import { Injectable, signal, computed, effect } from '@angular/core';
import { Appliance } from '../models/appliance.model';
import { environment } from '../../environments/environment';
import { VOLTAGE } from '../constants/electrical.constants';
import { STANDARD_WIRES, WireGauge } from '../models/wire.model';

const STORAGE_KEY = 'medidor-energia-appliances';
const WIRE_STORAGE_KEY = 'medidor-energia-wire';

@Injectable({
  providedIn: 'root',
})
export class ApplianceService {
  // Signal privado (fonte da verdade)
  private _appliances = signal<Appliance[]>(this.loadFromStorage());
  private _selectedWireId = signal<string>(this.loadWireFromStorage());
  private _globalVoltageFilter = signal<110 | 220>(220);

  // Signals públicos (read-only)
  readonly appliances = this._appliances.asReadonly();
  readonly globalVoltageFilter = this._globalVoltageFilter.asReadonly();
  
  readonly selectedWire = computed<WireGauge>(() => {
    return STANDARD_WIRES.find(w => w.id === this._selectedWireId()) || STANDARD_WIRES[3];
  });
  
  readonly maxAmps = computed(() => this.selectedWire().maxAmps);

  readonly sortedAppliances = computed(() => {
    const globalV = this._globalVoltageFilter();
    const list = this._appliances().map(a => {
      let status: 'normal' | 'burned' | 'weak' = 'normal';
      let currentAmps = 0;

      if (a.voltage === 'BIVOLT' || a.voltage === globalV) {
        status = 'normal';
        currentAmps = a.powerWatts / globalV;
      } else if (globalV === 220 && a.voltage === 110) {
        status = 'burned';
        currentAmps = 0; // Se queimou, não puxa mais corrente (ou desarmou)
      } else if (globalV === 110 && a.voltage === 220) {
        status = 'weak';
        currentAmps = (a.powerWatts / 4) / 110; // Potência cai pra 1/4
      }

      return { ...a, status, currentAmps };
    });
    return list.sort((a, b) => b.powerWatts - a.powerWatts);
  });

  readonly totalCurrentAmps = computed(() =>
    this.sortedAppliances()
      .filter(a => a.isOn)
      .reduce((sum, a) => sum + a.currentAmps, 0)
  );

  readonly totalPowerWatts = computed(() =>
    this.sortedAppliances()
      .filter(a => a.isOn)
      .reduce((sum, a) => sum + a.powerWatts, 0)
  );

  readonly loadStatus = computed((): 'safe' | 'warning' | 'overload' => {
    const total = this.totalCurrentAmps();
    const limit = this.maxAmps();
    const safeLimit = limit * 0.8;
    
    if (total <= safeLimit) return 'safe';
    if (total <= limit) return 'warning';
    return 'overload';
  });

  readonly usagePercent = computed(() =>
    Math.min((this.totalCurrentAmps() / this.maxAmps()) * 100, 100)
  );

  constructor() {
    // Auto-persist ao localStorage
    effect(() => {
      const data = this._appliances();
      const wireId = this._selectedWireId();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        localStorage.setItem(WIRE_STORAGE_KEY, wireId);
      } catch (e) {
        console.error('Erro ao salvar no localStorage:', e);
      }
    });
  }

  private loadFromStorage(): Appliance[] {
    if (typeof localStorage === 'undefined') return environment.seedAppliances;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        /* fall through */
      }
    }
    return environment.seedAppliances;
  }

  private loadWireFromStorage(): string {
    if (typeof localStorage === 'undefined') return '6.0';
    const stored = localStorage.getItem(WIRE_STORAGE_KEY);
    if (stored && STANDARD_WIRES.some(w => w.id === stored)) {
      return stored;
    }
    return '6.0'; // Default
  }

  setGlobalVoltageFilter(val: 110 | 220): void {
    this._globalVoltageFilter.set(val);
  }

  setWire(id: string): void {
    if (STANDARD_WIRES.some(w => w.id === id)) {
      this._selectedWireId.set(id);
    }
  }

  addAppliance(name: string, powerWatts: number, voltage: 110 | 220 | 'BIVOLT'): void {
    const newAppliance: Appliance = {
      id: crypto.randomUUID(),
      name: name.trim(),
      powerWatts,
      voltage,
      currentAmps: voltage === 'BIVOLT' ? 0 : powerWatts / voltage,
      isOn: false,
    };
    this._appliances.update(list => [...list, newAppliance]);
  }

  removeAppliance(id: string): void {
    this._appliances.update(list => list.filter(a => a.id !== id));
  }

  updateAppliance(id: string, name: string, powerWatts: number, voltage: 110 | 220 | 'BIVOLT'): void {
    this._appliances.update(list =>
      list.map(a =>
        a.id === id
          ? { ...a, name: name.trim(), powerWatts, voltage, currentAmps: voltage === 'BIVOLT' ? 0 : powerWatts / voltage }
          : a
      )
    );
  }

  toggleAppliance(id: string): void {
    this._appliances.update(list =>
      list.map(a => (a.id === id ? { ...a, isOn: !a.isOn } : a))
    );
  }
}

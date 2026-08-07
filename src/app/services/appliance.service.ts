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
  private _globalVoltageFilter = signal<'ALL' | 110 | 220>('ALL');

  // Signals públicos (read-only)
  readonly appliances = this._appliances.asReadonly();
  readonly globalVoltageFilter = this._globalVoltageFilter.asReadonly();
  
  readonly selectedWire = computed<WireGauge>(() => {
    return STANDARD_WIRES.find(w => w.id === this._selectedWireId()) || STANDARD_WIRES[3];
  });
  
  readonly maxAmps = computed(() => this.selectedWire().maxAmps);

  readonly sortedAppliances = computed(() => {
    const filter = this._globalVoltageFilter();
    const list = this._appliances().map(a => {
      if (filter === 'ALL') return a;
      return {
        ...a,
        voltage: filter,
        currentAmps: a.powerWatts / filter
      };
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

  setGlobalVoltageFilter(val: 'ALL' | 110 | 220): void {
    this._globalVoltageFilter.set(val);
  }

  setWire(id: string): void {
    if (STANDARD_WIRES.some(w => w.id === id)) {
      this._selectedWireId.set(id);
    }
  }

  addAppliance(name: string, powerWatts: number, voltage: 110 | 220): void {
    const newAppliance: Appliance = {
      id: crypto.randomUUID(),
      name: name.trim(),
      powerWatts,
      voltage,
      currentAmps: powerWatts / voltage,
      isOn: false,
    };
    this._appliances.update(list => [...list, newAppliance]);
  }

  removeAppliance(id: string): void {
    this._appliances.update(list => list.filter(a => a.id !== id));
  }

  updateAppliance(id: string, name: string, powerWatts: number, voltage: 110 | 220): void {
    this._appliances.update(list =>
      list.map(a =>
        a.id === id
          ? { ...a, name: name.trim(), powerWatts, voltage, currentAmps: powerWatts / voltage }
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

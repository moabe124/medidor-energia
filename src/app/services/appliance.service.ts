import { Injectable, signal, computed, effect } from '@angular/core';
import { Appliance } from '../models/appliance.model';
import { SEED_APPLIANCES } from '../data/seed-appliances';
import { VOLTAGE, SAFE_THRESHOLD, MAX_AMPS } from '../constants/electrical.constants';

const STORAGE_KEY = 'medidor-energia-appliances';

@Injectable({
  providedIn: 'root',
})
export class ApplianceService {
  // Signal privado (fonte da verdade)
  private _appliances = signal<Appliance[]>(this.loadFromStorage());

  // Signals públicos (read-only)
  readonly appliances = this._appliances.asReadonly();

  readonly sortedAppliances = computed(() => {
    return [...this._appliances()].sort((a, b) => b.powerWatts - a.powerWatts);
  });

  readonly totalCurrentAmps = computed(() =>
    this._appliances()
      .filter(a => a.isOn)
      .reduce((sum, a) => sum + a.currentAmps, 0)
  );

  readonly totalPowerWatts = computed(() =>
    this._appliances()
      .filter(a => a.isOn)
      .reduce((sum, a) => sum + a.powerWatts, 0)
  );

  readonly loadStatus = computed((): 'safe' | 'warning' | 'overload' => {
    const total = this.totalCurrentAmps();
    if (total <= SAFE_THRESHOLD) return 'safe';
    if (total <= MAX_AMPS) return 'warning';
    return 'overload';
  });

  readonly usagePercent = computed(() =>
    Math.min((this.totalCurrentAmps() / MAX_AMPS) * 100, 100)
  );

  constructor() {
    // Auto-persist ao localStorage
    effect(() => {
      const data = this._appliances();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error('Erro ao salvar no localStorage:', e);
      }
    });
  }

  private loadFromStorage(): Appliance[] {
    if (typeof localStorage === 'undefined') return SEED_APPLIANCES;
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
    return SEED_APPLIANCES;
  }

  addAppliance(name: string, powerWatts: number): void {
    const newAppliance: Appliance = {
      id: crypto.randomUUID(),
      name: name.trim(),
      powerWatts,
      currentAmps: powerWatts / VOLTAGE,
      isOn: false,
    };
    this._appliances.update(list => [...list, newAppliance]);
  }

  removeAppliance(id: string): void {
    this._appliances.update(list => list.filter(a => a.id !== id));
  }

  updateAppliance(id: string, name: string, powerWatts: number): void {
    this._appliances.update(list =>
      list.map(a =>
        a.id === id
          ? { ...a, name: name.trim(), powerWatts, currentAmps: powerWatts / VOLTAGE }
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

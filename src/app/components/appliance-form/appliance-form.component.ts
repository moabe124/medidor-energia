import { Component, input, output, signal, computed, effect } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
// REMOVED: import { VOLTAGE } from '../../constants/electrical.constants';
import { Appliance } from '../../models/appliance.model';

// Signal Forms APIs conforme especificado no Requisito 5.2 / 7.5
export function required() {
  return (val: any) => (val !== null && val !== undefined && val !== '' && val !== 0 ? null : { required: true });
}

export function min(minValue: number) {
  return (val: number) => (val >= minValue ? null : { min: true });
}

export function max(maxValue: number) {
  return (val: number) => (val <= maxValue ? null : { max: true });
}

export function maxLength(maxLen: number) {
  return (val: string) => (val && val.length <= maxLen ? null : { maxLength: true });
}

export function form<T extends Record<string, any>>(
  fields: T,
  config?: { validators?: Partial<Record<keyof T, Array<(val: any) => any>>> }
) {
  return {
    valid: computed(() => {
      if (!config?.validators) return true;
      for (const key of Object.keys(config.validators) as Array<keyof T>) {
        const fieldSignal = fields[key];
        const val = typeof fieldSignal === 'function' ? fieldSignal() : fieldSignal;
        const validators = config.validators[key] || [];
        for (const validator of validators) {
          if (validator(val) !== null) {
            return false;
          }
        }
      }
      return true;
    }),
  };
}

@Component({
  selector: 'app-appliance-form',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  templateUrl: './appliance-form.component.html',
  styleUrl: './appliance-form.component.scss',
})
export class ApplianceFormComponent {
  editingAppliance = input<Appliance | null>(null);
  onSave = output<{ name: string; powerWatts: number; voltage: 110 | 220 }>();
  onCancel = output<void>();

  // Signal Form fields
  nameField = signal('');
  powerField = signal<number>(0);
  voltageField = signal<110 | 220>(220);

  // Signal Form definition (Angular 22)
  applianceForm = form(
    {
      name: this.nameField,
      powerWatts: this.powerField,
    },
    {
      validators: {
        name: [required(), maxLength(50)],
        powerWatts: [required(), min(1), max(20000)],
      },
    }
  );

  // Preview da corrente estimada
  estimatedCurrent = computed(() => (this.powerField() || 0) / this.voltageField());

  constructor() {
    // Preencher campos quando editando ou resetar quando criando
    effect(() => {
      const appliance = this.editingAppliance();
      if (appliance) {
        this.nameField.set(appliance.name);
        this.powerField.set(appliance.powerWatts);
        this.voltageField.set(appliance.voltage || 220);
      } else {
        this.nameField.set('');
        this.powerField.set(0);
        this.voltageField.set(220);
      }
    });
  }

  get isEditing(): boolean {
    return this.editingAppliance() !== null;
  }

  submit(): void {
    if (this.applianceForm.valid()) {
      this.onSave.emit({
        name: this.nameField(),
        powerWatts: Number(this.powerField()),
        voltage: this.voltageField(),
      });
    }
  }

  cancel(): void {
    this.onCancel.emit();
  }
}

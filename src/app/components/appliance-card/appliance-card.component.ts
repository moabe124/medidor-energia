import { Component, input, output, computed } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Appliance } from '../../models/appliance.model';

@Component({
  selector: 'app-appliance-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './appliance-card.component.html',
  styleUrl: './appliance-card.component.scss',
})
export class ApplianceCardComponent {
  // Signal inputs & outputs (Angular 22)
  appliance = input.required<Appliance>();

  onToggle = output<string>();
  onDelete = output<string>();
  onEdit = output<Appliance>();

  usageCategory = computed(() => {
    const w = this.appliance().powerWatts;
    if (w > 1500) return { label: 'Alto Risco', class: 'high' };
    if (w > 800) return { label: 'Risco Médio', class: 'medium' };
    if (w > 100) return { label: 'Baixo Consumo', class: 'low' };
    return { label: 'Irrisório', class: 'negligible' };
  });

  toggle(): void {
    this.onToggle.emit(this.appliance().id);
  }

  edit(): void {
    this.onEdit.emit(this.appliance());
  }

  delete(): void {
    this.onDelete.emit(this.appliance().id);
  }
}

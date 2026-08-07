import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplianceService } from '../../services/appliance.service';
import { ApplianceCardComponent } from '../appliance-card/appliance-card.component';
import { ApplianceFormComponent } from '../appliance-form/appliance-form.component';
import { Appliance } from '../../models/appliance.model';

@Component({
  selector: 'app-appliance-list',
  standalone: true,
  imports: [CommonModule, ApplianceCardComponent, ApplianceFormComponent],
  templateUrl: './appliance-list.component.html',
  styleUrl: './appliance-list.component.scss',
})
export class ApplianceListComponent {
  readonly service = inject(ApplianceService);

  // Local UI signals
  readonly showForm = signal(false);
  readonly editingAppliance = signal<Appliance | null>(null);

  openAddModal(): void {
    this.editingAppliance.set(null);
    this.showForm.set(true);
  }

  openEditModal(appliance: Appliance): void {
    this.editingAppliance.set(appliance);
    this.showForm.set(true);
  }

  closeModal(): void {
    this.showForm.set(false);
    this.editingAppliance.set(null);
  }

  handleToggle(id: string): void {
    this.service.toggleAppliance(id);
  }

  handleDelete(id: string): void {
    const appliance = this.service.appliances().find(a => a.id === id);
    const name = appliance ? appliance.name : 'este aparelho';
    if (confirm(`Tem certeza que deseja remover "${name}"?`)) {
      this.service.removeAppliance(id);
    }
  }

  handleSave(data: { name: string; powerWatts: number }): void {
    const currentEditing = this.editingAppliance();
    if (currentEditing) {
      this.service.updateAppliance(currentEditing.id, data.name, data.powerWatts);
    } else {
      this.service.addAppliance(data.name, data.powerWatts);
    }
    this.closeModal();
  }
}

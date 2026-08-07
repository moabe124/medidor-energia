import { Component, input, output } from '@angular/core';
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

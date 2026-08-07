import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplianceService } from '../../services/appliance.service';
import { STANDARD_WIRES } from '../../models/wire.model';

@Component({
  selector: 'app-wire-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wire-selector.component.html',
  styleUrls: ['./wire-selector.component.scss']
})
export class WireSelectorComponent {
  public service = inject(ApplianceService);
  public wires = STANDARD_WIRES;

  selectWire(id: string) {
    this.service.setWire(id);
  }
}

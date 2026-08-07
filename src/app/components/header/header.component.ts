import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ApplianceService } from '../../services/appliance.service';
import { MAX_AMPS } from '../../constants/electrical.constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly service = inject(ApplianceService);
  readonly maxAmps = MAX_AMPS;
}

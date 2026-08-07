import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ApplianceListComponent } from '../../components/appliance-list/appliance-list.component';
import { ApplianceService } from '../../services/appliance.service';

@Component({
  selector: 'app-medidor',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, ApplianceListComponent],
  templateUrl: './medidor.component.html',
  styleUrl: './medidor.component.scss',
})
export class MedidorComponent {
  readonly service = inject(ApplianceService);
}

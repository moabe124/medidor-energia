import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ApplianceListComponent } from './components/appliance-list/appliance-list.component';
import { ApplianceService } from './services/appliance.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ApplianceListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly service = inject(ApplianceService);
}

import { Component, inject, computed } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ApplianceService } from '../../services/appliance.service';
import { VOLTAGE } from '../../constants/electrical.constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public applianceService = inject(ApplianceService);
  public readonly VOLTAGE = VOLTAGE;

  public activeAppliancesCount = computed(() => 
    this.applianceService.appliances().filter(a => a.isOn).length
  );

  public totalAppliancesCount = computed(() => 
    this.applianceService.appliances().length
  );

  public freeCapacity = computed(() => 
    Math.max(0, this.applianceService.maxAmps() - this.applianceService.totalCurrentAmps())
  );

  public statusLabel = computed(() => {
    switch (this.applianceService.loadStatus()) {
      case 'safe': return 'SEGURO';
      case 'warning': return 'ATENÇÃO';
      case 'overload': return 'SOBRECARGA';
      default: return 'SEGURO';
    }
  });

  // Gauge calculations
  public readonly radius = 62;
  public readonly circumference = 2 * Math.PI * this.radius;
  public readonly arcLength = this.circumference * 0.75; // 270 degrees
  
  public dashoffset = computed(() => {
    // Limit usage to 100% for visual calculation
    const usage = Math.min(100, Math.max(0, this.applianceService.usagePercent()));
    return this.arcLength * (1 - usage / 100);
  });
}

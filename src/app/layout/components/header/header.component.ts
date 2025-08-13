import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ContainerComponent } from '@shared/components/container/container.component';

import { LogoComponent } from '../logo';

@Component({
  selector: 'app-header',
  imports: [
    ContainerComponent,
    LogoComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}

import { Component, OnInit } from '@angular/core';
import { faCog, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { PreferenceService } from 'src/app/services/preference.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  listCheck = faListCheck;
  cog = faCog;

  public get darkmode(): boolean {
    return this.preferences.darkmode;
  }

  constructor(private preferences: PreferenceService) {}

  ngOnInit(): void {}
}

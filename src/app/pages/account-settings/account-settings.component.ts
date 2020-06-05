import { Component, OnInit } from '@angular/core';
import { SettingsService} from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor( public settingsService:SettingsService) { }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor(theme_color:string, link: any){

    this.applyCheck(link);

    this.settingsService.applyTheme(theme_color);

  }

  applyCheck(link:any){
    let selectors:any = document.getElementsByClassName('selector');
    
    for(let ref of selectors){
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck(){
    let selectors:any = document.getElementsByClassName('selector');
    let theme = this.settingsService.settings.theme;

    for(let ref of selectors){
      if(ref.getAttribute('data-theme') === theme){
        ref.classList.add('working');
        break;
      }
    }
  }
}

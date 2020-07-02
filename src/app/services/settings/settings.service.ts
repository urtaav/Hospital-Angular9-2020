import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  settings:Settings ={
    themeUrl:'assets/css/colors/dark.css',
    theme:'default'
  }

  constructor(@Inject(DOCUMENT) private _document) { 
    this.loadSettings();
  }

  saveSettings(){
    localStorage.setItem('settings',JSON.stringify(this.settings));
  }

  loadSettings(){
    if(localStorage.getItem('settings')){
      this.settings = JSON.parse(localStorage.getItem('settings'));
      this.applyTheme(this.settings.theme);
    }else{
      this.applyTheme(this.settings.theme);
    }
  }

  applyTheme(theme_color:string){
    
    let url = 'assets/css/colors/' + theme_color + '.css'
    this._document.getElementById('theme-app').setAttribute('href',url);

    this.settings.theme = theme_color;
    this.settings.themeUrl = url;

    this.saveSettings();
  }
}

interface Settings{
  themeUrl:string;
  theme:string;
}
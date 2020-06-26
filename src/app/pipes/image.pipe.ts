import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string,type: string = 'users'): any {

    let url = URL_SERVICES + '/images';

    if(!image){
      return url + '/users/unknown'
    }

    if(image.indexOf('https') >= 0){
      return image;
    }

    switch (type) {
      case 'users':
         url += '/users/' + image;
        break;
      case 'doctors':
         url += '/doctors/' + image;
          break;
      case 'hospitals':
         url += '/hospitals/' + image;
          break;
    
      default:
         url += '/users/unknown';
        break;
    }
    return url;
  }

}

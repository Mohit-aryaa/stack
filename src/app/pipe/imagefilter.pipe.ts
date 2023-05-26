import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagefilter'
})
export class ImagefilterPipe implements PipeTransform {
  imagePrefixUrl = `${environment.apiUrl}/uploads/`;
  url:any;
  transform(value: any) {
    console.log(value)
    if(value) {
      this.url = this.imagePrefixUrl+value;
    } else{
      this.url = 'assets/images/default-user-icon.jpg'
    }
    return this.url;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonePipe'
})
export class PhonePipe implements PipeTransform {

  transform(value: string|undefined): any {
    let lsValue: String;
    if (value != null){
      if (value!.length > 3 && value!.indexOf('.') < 1){
        lsValue = value!.substring(0,3);
        lsValue = lsValue + ".";
        lsValue = lsValue + value!.substring(3);
      }
      else{
        lsValue = value!;    
      }
    }
    else{
      lsValue = value!;    
    }
    
    return lsValue;
  }



}

import { environment } from '../../environments/environent';
import { Location } from '@angular/common';

export class Util {
  public static apiPublicUrl(path: string) {
    const url1 = Location.joinWithSlash(environment.api_url, 'api');
    return Location.joinWithSlash(url1, path);
  }
}

import { environment } from '../';
import { Location } from '@angular/common';

export class Util {
  public static apiAuthUrl(path) {
    const url1 = Location.joinWithSlash(environment.api_url, 'api/auth');
    return Location.joinWithSlash(url1, path);
  }

  public static apiPublicUrl(path) {
    const url1 = Location.joinWithSlash(environment.api_url, 'api/public');
    return Location.joinWithSlash(url1, path);
  }
  public static apiPublicFile() {
    const url1 = Location.joinWithSlash(
      environment.api_url,
      'api/public/file/'
    );
    return url1;
  }
}

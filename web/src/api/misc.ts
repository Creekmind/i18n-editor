import { BaseApiService } from '@/api/base';

namespace Misc {

  class MiscApiService extends BaseApiService<any> {
    baseURL = '/api/misc';
  }

  export const misc = new MiscApiService();

}



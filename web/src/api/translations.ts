import { BaseApiService } from '@/api/base';
import { Translations } from '@/classes/translations';
import { Params } from '@/api/interfaces/params';
import { Observable } from 'rxjs';

class TranslationsApiService extends BaseApiService<Translations> {
  protected cls = Translations

  create(data: Translations, params?: Params): Observable<Translations> {
    return super.create(data, params, `/api/projects/${data.projectID}/keys/${data.id}`);
  }

  findKeys(projectID: string, params?: Params): Observable<Translations[]> {
    return super.find(params, `/api/projects/${projectID}/keys/`);
  }

  save(data: Translations, params?: Params): Observable<Translations> {
    return this.create(data, params);
  }
}

export const translationsAPI = new TranslationsApiService();

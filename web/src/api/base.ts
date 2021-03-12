import { Observable } from 'rxjs';
import Axios from 'axios-observable';
import { Params } from '@/api/interfaces/params';
import { map } from 'rxjs/operators';
import { box, unbox } from '@cmind/class-mapper';
import { DataObject } from '@/classes/base/data-object';

export class BaseApiService<T extends DataObject> {
  protected baseURL = '';
  // eslint-disable-next-line
  protected cls!: new(..._: any[]) => T

  find(params?: Params, url = this.baseURL): Observable<T[]> {
    return Axios.get<unknown[]>(url, { params }).pipe(
      map((response) => {
        return response.data.map((item: unknown) => unbox<T>(item, this.cls));
      })
    );
  }

  findOne(id: string, params?: Params): Observable<T> {
    return Axios.get(`${this.baseURL}/${id}`, { params }).pipe(
      map((response) => {
        return unbox<T>(response.data, this.cls);
      })
    );
  }

  save(data: T, params?: Params, url?: string): Observable<T> {
    if (data.id) {
      return this.update(data, params, url);
    } else {
      return this.create(data, params, url);
    }
  }

  create(data: T, params?: Params, url = this.baseURL): Observable<T> {
    return Axios.post(url, box<T>(data), { params }).pipe(
      map((response) => {
        return unbox<T>(response.data, this.cls);
      })
    );
  }

  update(data: T, params?: Params, url = `${this.baseURL}/${data.id}`): Observable<T> {
    return Axios.put(url, box<T>(data), { params }).pipe(
      map(response => {
        return unbox<T>(response.data, this.cls);
      })
    )
  }

  delete(data: T, params?: Params): Observable<unknown> {
    return Axios.delete<unknown>(`${this.baseURL}/${data.id}`, { params });
  }
}

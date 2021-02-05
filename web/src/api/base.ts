import { Observable } from 'rxjs';
import Axios from 'axios-observable';
import { Params } from '@/api/interfaces/params';
import { map } from 'rxjs/operators';
import { box, unbox } from '@cmind/class-mapper';
import { DataObject } from '@/classes/base/data-object';

export class BaseApiService<T extends DataObject> {
  protected baseURL = '';
  protected cls!: new() => T

  find(params?: Params): Observable<T[]> {
    return Axios.get<unknown[]>(this.baseURL, { params }).pipe(
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

  save(data: T, params?: Params): Observable<T> {
    if (data.id) {
      return this.update(data, params);
    } else {
      return this.create(data, params);
    }
  }

  create(data: T, params?: Params): Observable<T> {
    return Axios.post(this.baseURL, box<T>(data), { params }).pipe(
      map((response) => {
        return unbox<T>(response.data, this.cls);
      })
    );
  }

  update(data: T, params?: Params): Observable<T> {
    return Axios.put(`${this.baseURL}/${data.id}`, box<T>(data), { params }).pipe(
      map(response => {
        return unbox<T>(response.data, this.cls);
      })
    )
  }

  delete(data: T, params?: Params): Observable<unknown> {
    return Axios.delete<unknown>(`${this.baseURL}/${data.id}`, { params });
  }
}

import { Observable, of } from 'rxjs';
import Axios from 'axios-observable';
import { Params } from '@/api/interfaces/params';
import { map } from 'rxjs/operators';
import { unbox } from '@cmind/class-mapper';

export class BaseApiService<T> {

  protected baseURL = '';

  constructor(
    protected cls: new() => T
  ) {}

  find(params?: Params): Observable<T[]> {
    return Axios.get<any[]>(this.baseURL, { params }).pipe(
      map((response) => {
        return response.data.map((item: any) => unbox<T>(item, this.cls));
      })
    );
  }

  findOne(id: string, params?: Params): Observable<T> {
    return Axios.get(`${this.baseURL}/${id}`, { params }).pipe(
      map((response) => {
        return unbox<T>(response.data, this.cls)
      })
    )
  }

  create(data: T, params?: Params): Observable<T> {
    return Axios.post(this.baseURL, { params }).pipe(
      map((response) => {
        return unbox<T>(response.data, this.cls)
      })
    )
  }

}

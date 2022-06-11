import http from './http';

interface Options{
  [option: string]: string | number
}

export default class <T> {
  readonly path: string;

  constructor(path: string) {
    this.path = `/${path}`;
  }

  get(options?: Options) {
    const optionStr = options ? `?${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('&')}` : '';
    return http.get(`${this.path}${optionStr}`);
  }

  getOne(id: number) {
    return http.get(`${this.path}/${id}`);
  }

  post(item: T) {
    return http.post(this.path, item);
  }

  put(id: number, item: object) {
    return http.put(`${this.path}/${id}`, item);
  }

  patch(id: number, item: object) {
    return http.patch(`${this.path}/${id}`, item);
  }

  delete(id: number) {
    return http.delete(`${this.path}/${id}`);
  }
}

import { BASE_URL } from './constants';
export class HttpClient {
  static requestInterceptor = [];
  static responseInterceptor = [];

  static async httpFetch(url, request) {
    var _request = request;
    this.requestInterceptor.forEach(function(element) {
      _request = element(_request);
    }, this);
    let response = await fetch(BASE_URL + url, _request);
    return response;
  }
}

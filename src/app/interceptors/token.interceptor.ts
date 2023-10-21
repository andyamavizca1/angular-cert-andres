import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'x-rapidapi-key': 'b330a9297772ce7b5e2f8e1effbe1a92',
      }
    })
    return next.handle(modifiedRequest)
  }
}

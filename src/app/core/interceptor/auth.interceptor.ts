
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const isAuthEndpoint = req.url.endsWith('/auth/signin');   // ajuste como precisar

  if (isAuthEndpoint) {
    return next(req);  
  }
  
  const token = sessionStorage.getItem('accessToken');

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req; 

  return next(authReq);
}
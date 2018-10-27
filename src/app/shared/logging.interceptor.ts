import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { tap } from '../../../node_modules/rxjs/operators';

export class LoggingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(event => {
                console.log('logging interceptor', event)
            })
        )
    }
}

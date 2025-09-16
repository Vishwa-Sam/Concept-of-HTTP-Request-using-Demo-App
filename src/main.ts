import { bootstrapApplication } from '@angular/platform-browser';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app/app.component';


// HTTP Interceptors

// function loggingInterceptor (request:HttpRequest<unknown> , next:HttpHandlerFn) {
//     const req = request.clone({
//         headers: request.headers.set('X-DEBUG', 'TESTING')
//     });
//     console.log('[Outgoing Request]');
//     console.log(request);
//     return next(req);
// }

// bootstrapApplication(AppComponent, {
//     providers: [provideHttpClient(withInterceptors([loggingInterceptor]))]
// }).catch((err) => console.error(err));


bootstrapApplication(AppComponent, {
    providers: [provideHttpClient()]
}).catch((err) => console.error(err));

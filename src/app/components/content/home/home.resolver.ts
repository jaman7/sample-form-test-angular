import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';

export const fetchHomeResolver: ResolveFn<Observable<any>> = () => of([4444, 777]);

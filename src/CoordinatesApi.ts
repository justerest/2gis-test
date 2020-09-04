import { Observable } from 'rxjs';
import { Coordinates } from './Coordinates';

export interface CoordinatesApi {
	search(term: string): Observable<Coordinates[]>;
}

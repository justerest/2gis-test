import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { Coordinates } from './Coordinates';
import { CoordinatesApi } from './CoordinatesApi';

export class CoordinatesApi2Gis implements CoordinatesApi {
	constructor() {}

	search(term: string): Observable<Coordinates[]> {
		return fromFetch(
			`https://catalog.api.2gis.ru/3.0/markers?q=${term}&page_size=1000&region_id=32&key=ruhebf8058`,
		).pipe(
			switchMap((response) => response.json()),
			map((response) => response.result?.items.map((item: any) => [item.lon, item.lat]) ?? []),
		);
	}
}

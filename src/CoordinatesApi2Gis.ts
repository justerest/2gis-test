import { EMPTY, Observable, of } from 'rxjs';
import { expand, map, scan, switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { Coordinates } from './Coordinates';
import { CoordinatesApi } from './CoordinatesApi';

interface Response {
	total: number;
	items: Coordinates[];
	page: number;
}

export class CoordinatesApi2Gis implements CoordinatesApi {
	private pageSize = 3000;

	constructor() {}

	search(term: string): Observable<Coordinates[]> {
		if (!term) {
			return of([]);
		}
		return this.scanFetch(term);
	}

	private scanFetch(term: string): Observable<Coordinates[]> {
		return this.fetch(term).pipe(
			expand((response) => {
				const loadedItemsLength = response.page * this.pageSize;
				return response.total > loadedItemsLength ? this.fetch(term, response.page + 1) : EMPTY;
			}),
			scan((acc, response) => [...acc, ...response.items], [] as Coordinates[]),
		);
	}

	private fetch(term: string, page: number = 1): Observable<Response> {
		return fromFetch(
			`https://catalog.api.2gis.ru/3.0/markers?q=${term}&page_size=${this.pageSize}&page=${page}&region_id=32&key=ruhebf8058`,
		).pipe(
			switchMap((response) => response.json()),
			map(({ result }) => ({
				total: result.total,
				items: result.items.map((item: any) => [item.lon, item.lat]),
				page,
			})),
		);
	}
}

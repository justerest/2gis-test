import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PointsFilter } from './filters/PointsFilter';
import { CoordinatesApi } from './CoordinatesApi';
import { Coordinates } from './Coordinates';
import { Point } from './filters/Point';

export class FilteredCoordinatesApi implements CoordinatesApi {
	constructor(
		private coordinatesApi: CoordinatesApi,
		private pointsFilter$: Observable<PointsFilter>,
	) {}

	search(term: string): Observable<Coordinates[]> {
		return this.coordinatesApi.search(term).pipe(
			map((coordinates) => coordinates.map((c) => new Point(c))),
			switchMap((points) => this.pointsFilter$.pipe(map((pf) => pf.filter(points)))),
			map((points) => points.map((point) => point.getCoordinates())),
		);
	}
}

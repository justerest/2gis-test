import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { CoordinatesApi } from './CoordinatesApi';
import { Marker } from './Marker';
import { MarkerFactory } from './MarkerFactory';

export class MarkersState {
	private subject = new BehaviorSubject<string>('');

	markers: Observable<Marker[]> = this.subject.pipe(
		debounceTime(500),
		distinctUntilChanged(),
		switchMap((term) => this.coordinatesApi.search(term)),
		map((coordinatesList) => coordinatesList.map((c) => this.markerFactory.create(c))),
	);

	constructor(private coordinatesApi: CoordinatesApi, private markerFactory: MarkerFactory) {}

	search(term: string): void {
		this.subject.next(term);
	}
}

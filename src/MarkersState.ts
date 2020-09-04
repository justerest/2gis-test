import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Marker } from './Marker';
import { MarkersApi } from './MarkersApi';

export class MarkersState {
	private subject = new BehaviorSubject<string>('');

	markers: Observable<Marker[]> = this.subject.pipe(
		debounceTime(500),
		distinctUntilChanged(),
		switchMap((term) => this.markersApi.search(term)),
	);

	constructor(private markersApi: MarkersApi) {}

	search(term: string): void {
		this.subject.next(term);
	}
}

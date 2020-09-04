import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { Marker as Marker2Gis } from '@2gis/mapgl/types';
import { Marker } from './Marker';

export type Coordinates = [lon: number, lat: number];

export class MarkersApi {
	constructor(private markerFactory: MarkerFactory) {}

	search(term: string): Observable<Marker[]> {
		return fromFetch(
			`https://catalog.api.2gis.ru/3.0/markers?q=${term}&page_size=100&region_id=32&key=ruhebf8058`,
		).pipe(
			switchMap((response) => response.json()),
			map(
				(response) =>
					response.result?.items.map((item: any) =>
						this.markerFactory.create([item.lon, item.lat]),
					) ?? [],
			),
		);
	}
}

export class MarkerFactory {
	constructor(private createMarker2Gis: (coordinates: Coordinates) => Marker2Gis) {}

	create(coordinates: Coordinates): Marker {
		return new Marker(() => this.createMarker2Gis(coordinates));
	}
}

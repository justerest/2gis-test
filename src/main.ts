import { load } from '@2gis/mapgl';
import { fromEvent, Observable } from 'rxjs';
import { map, pairwise, startWith } from 'rxjs/operators';
import { MarkerFactory } from './MarkerFactory';
import { MarkersState } from './MarkersState';
import { CoordinatesApi2Gis } from './CoordinatesApi2Gis';
import { Marker } from './Marker';
import { OptimizedCoordinatesApi } from './OptimizedCoordinatesApi';
import { PointsFilter } from './PointsFilter';
import { CellMap } from './CellMap';

main();

async function main() {
	const mapglAPI = await load();

	const mapgl = new mapglAPI.Map('container', {
		center: [37.583064, 55.747282],
		zoom: 13,
		key: '6aa7363e-cb3a-11ea-b2e4-f71ddc0b6dcb',
	});

	const zoom$ = new Observable<number>((subscriber) => {
		subscriber.next(mapgl.getZoom());
		mapgl.on('zoomend', () => subscriber.next(mapgl.getZoom()));
	});

	const markersState = new MarkersState(
		new OptimizedCoordinatesApi(
			new CoordinatesApi2Gis(),
			zoom$.pipe(map((zoom) => new PointsFilter(new CellMap(75 / 2 ** zoom)))),
		),
		new MarkerFactory((coordinates) => new mapglAPI.Marker(mapgl, { coordinates })),
	);

	renderMarkersOnChanges(markersState.markers);
	searchMarkersOnInput(document.getElementById('search-input') as HTMLInputElement, markersState);
}

function renderMarkersOnChanges(markers: Observable<Marker[]>) {
	markers.pipe(startWith([]), pairwise()).subscribe(([oldMarkers, actualMarkers]) => {
		// TODO: обновлять только изменившиеся маркеры
		oldMarkers.forEach((marker) => marker.destroy());
		actualMarkers.forEach((marker) => marker.show());
	});
}

function searchMarkersOnInput(searchInput: HTMLInputElement, markersState: MarkersState) {
	fromEvent(searchInput, 'input')
		.pipe(startWith(0))
		.subscribe(() => markersState.search(searchInput.value.trim()));
}

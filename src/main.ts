import { load } from '@2gis/mapgl';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MarkerFactory } from './MarkerFactory';
import { MarkersState } from './MarkersState';
import { CoordinatesApi2Gis } from './CoordinatesApi2Gis';
import { Marker } from './Marker';
import { OptimizedCoordinatesApi } from './OptimizedCoordinatesApi';
import { DensityPointsFilter } from './DensityPointsFilter';
import { CellMap } from './CellMap';
import { Rectangle } from './Rectangle';
import { Point } from './Point';
import { Coordinates } from './Coordinates';
import { CombinedPointsFilter } from './CombinedPointsFilter';
import { BoundsPointsFilter } from './BoundsPointsFilter';
import { MarkersRenderer } from './MarkersRenderer';

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

	const bounds$ = new Observable<Rectangle>((subscriber) => {
		const getRect = () => {
			const bounds = mapgl.getBounds();
			return new Rectangle(
				new Point(bounds.southWest as Coordinates),
				new Point(bounds.northEast as Coordinates),
			);
		};
		subscriber.next(getRect());
		mapgl.on('moveend', () => subscriber.next(getRect()));
	});

	const markersState = new MarkersState(
		new OptimizedCoordinatesApi(
			new CoordinatesApi2Gis(),
			combineLatest([bounds$, zoom$]).pipe(
				map(([bound, zoom]) => {
					const k = 75 / 2 ** zoom;
					return new CombinedPointsFilter([
						new BoundsPointsFilter(bound),
						new DensityPointsFilter(new CellMap(k, 1.2 * k)),
					]);
				}),
			),
		),
		new MarkerFactory((coordinates) => new mapglAPI.Marker(mapgl, { coordinates })),
	);

	renderMarkersOnChanges(markersState.markers);
	searchMarkersOnInput(document.getElementById('search-input') as HTMLInputElement, markersState);
}

function renderMarkersOnChanges(markers: Observable<Marker[]>) {
	const renderer = new MarkersRenderer();
	markers.subscribe((markers) => renderer.render(markers));
}

function searchMarkersOnInput(searchInput: HTMLInputElement, markersState: MarkersState) {
	fromEvent(searchInput, 'input')
		.pipe(startWith(0))
		.subscribe(() => markersState.search(searchInput.value.trim()));
}

import { load } from '@2gis/mapgl';
import { combineLatest, fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MarkerFactory } from './MarkerFactory';
import { MarkersState } from './MarkersState';
import { CoordinatesApi2Gis } from './CoordinatesApi2Gis';
import { Marker } from './Marker';
import { FilteredCoordinatesApi } from './FilteredCoordinatesApi';
import { DensityPointsFilter } from './filters/DensityPointsFilter';
import { CellMap } from './filters/CellMap';
import { Rectangle } from './filters/Rectangle';
import { Point } from './filters/Point';
import { Coordinates } from './Coordinates';
import { CombinedPointsFilter } from './filters/CombinedPointsFilter';
import { BoundsPointsFilter } from './filters/BoundsPointsFilter';
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
		new FilteredCoordinatesApi(
			new CoordinatesApi2Gis(),
			combineLatest([bounds$, zoom$]).pipe(
				map(([bound, zoom]) => {
					const stepX = 70 / 2 ** zoom;
					const stepY = 1.5 * stepX;
					return new CombinedPointsFilter([
						new BoundsPointsFilter(bound),
						new DensityPointsFilter(new CellMap(stepX, stepY)),
						new DensityPointsFilter(new CellMap(stepX, stepY, 0.5 * stepX, 0.5 * stepY)),
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

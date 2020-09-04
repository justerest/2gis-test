import { load } from '@2gis/mapgl';
import { fromEvent } from 'rxjs';
import {
	debounceTime,
	distinctUntilChanged,
	map,
	pairwise,
	startWith,
	switchMap,
} from 'rxjs/operators';
import { MarkersApi, MarkerFactory } from './MarkersApi';

async function main() {
	const mapglAPI = await load();

	const mapgl = new mapglAPI.Map('container', {
		center: [37.583064, 55.747282],
		zoom: 13,
		key: '6aa7363e-cb3a-11ea-b2e4-f71ddc0b6dcb',
	});

	const searchApi = new MarkersApi(
		new MarkerFactory((coordinates) => new mapglAPI.Marker(mapgl, { coordinates })),
	);

	const searchInput = document.getElementById('search-input') as HTMLInputElement;
	fromEvent(searchInput, 'input')
		.pipe(
			startWith(0),
			map(() => searchInput.value.trim()),
			debounceTime(500),
			distinctUntilChanged(),
			switchMap((term) => searchApi.search(term)),
			startWith([]),
			pairwise(),
		)
		.subscribe(([oldMarkers, markers]) => {
			// TODO: обновлять только изменившиеся маркеры
			oldMarkers.forEach((marker) => marker.destroy());
			markers.forEach((marker) => marker.show());
		});
}

main();

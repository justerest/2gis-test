import { Marker as Marker2Gis } from '@2gis/mapgl/types';
import { Marker } from './Marker';
import { Coordinates } from './Coordinates';

export class MarkerFactory {
	constructor(private createMarker2Gis: (coordinates: Coordinates) => Marker2Gis) {}

	create(coordinates: Coordinates): Marker {
		return new Marker(() => this.createMarker2Gis(coordinates));
	}
}

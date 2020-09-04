import { assert } from './utils/assert';
import { Marker as Marker2Gis } from '@2gis/mapgl/types';
import { Coordinates } from './Coordinates';

export class Marker {
	private marker2Gis?: Marker2Gis;

	constructor(
		private coordinates: Coordinates,
		private createMarker2Gis: (coordinates: Coordinates) => Marker2Gis,
	) {}

	show(): void {
		assert(!this.marker2Gis, 'Marker already initialized');
		this.marker2Gis = this.createMarker2Gis(this.coordinates);
	}

	destroy(): void {
		assert(this.marker2Gis, 'Marker not initialized');
		this.marker2Gis.destroy();
	}

	hash(): string {
		return this.coordinates.join(';');
	}
}

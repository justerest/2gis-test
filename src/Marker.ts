import { assert } from './utils/assert';
import { Marker as Marker2Gis } from '@2gis/mapgl/types';

export class Marker {
	private marker2Gis?: Marker2Gis;

	constructor(private createMarker2Gis: () => Marker2Gis) {}

	show(): void {
		assert(!this.marker2Gis, 'Marker already initialized');
		this.marker2Gis = this.createMarker2Gis();
	}

	destroy(): void {
		assert(this.marker2Gis, 'Marker not initialized');
		this.marker2Gis.destroy();
	}
}

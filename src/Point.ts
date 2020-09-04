import { Coordinates } from './Coordinates';
import { Hashable } from './utils/Hashable';

export class Point implements Hashable {
	constructor(private coordinates: Coordinates) {}

	hash(): string {
		return this.coordinates.join(';');
	}

	getDistance(point: Point): number {
		const dx = this.coordinates[0] - point.getCoordinates()[0];
		const dy = this.coordinates[1] - point.getCoordinates()[1];
		return Math.sqrt(dx ** 2 + dy ** 2);
	}

	getCoordinates(): Coordinates {
		return this.coordinates;
	}
}

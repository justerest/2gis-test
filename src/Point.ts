import { Coordinates } from './Coordinates';

export class Point {
	constructor(private coordinates: Coordinates) {}

	getDistance(point: Point): number {
		const dx = this.coordinates[0] - point.getCoordinates()[0];
		const dy = this.coordinates[1] - point.getCoordinates()[1];
		return Math.sqrt(dx ** 2 + dy ** 2);
	}

	getCoordinates(): Coordinates {
		return this.coordinates;
	}

	hash(): string {
		return this.coordinates.join(';');
	}
}

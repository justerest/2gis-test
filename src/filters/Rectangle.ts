import { Point } from './Point';

export class Rectangle {
	constructor(private start: Point, private end: Point) {}

	has(point: Point): boolean {
		const [xMin, yMin] = this.start.getCoordinates();
		const [xMax, yMax] = this.end.getCoordinates();
		const [x, y] = point.getCoordinates();
		return xMin <= x && x <= xMax && yMin <= y && y <= yMax;
	}
}

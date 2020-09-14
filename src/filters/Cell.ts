import { Point } from './Point';

export class Cell {
	constructor(private center: Point) {}

	getCenter(): Point {
		return this.center;
	}

	hash(): string {
		return this.center.hash();
	}
}

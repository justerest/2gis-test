import { Point } from './Point';

export class Cell {
	constructor(private center: Point) {}

	getClosestToCenter(...points: [Point, ...Point[]]): Point {
		return points.sort((a, b) => this.center.getDistance(a) - this.center.getDistance(b))[0];
	}

	hash(): string {
		return this.center.hash();
	}
}

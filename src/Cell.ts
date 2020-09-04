import { Point } from './Point';
import { Hashable } from './utils/Hashable';

export class Cell implements Hashable {
	constructor(private center: Point) {}

	getClosestToCenter(...points: [Point, ...Point[]]): Point {
		return points.sort((a, b) => this.center.getDistance(a) - this.center.getDistance(b))[0];
	}

	hash(): string {
		return this.center.hash();
	}
}

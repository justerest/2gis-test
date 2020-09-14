import { Point } from './Point';
import { CellMap } from './CellMap';

export class Grid {
	private pointMap = new Map<string, Point>();

	constructor(private cellMap: CellMap) {}

	addPoint(point: Point): void {
		const cell = this.cellMap.get(point);
		if (!this.pointMap.has(cell.hash())) {
			this.pointMap.set(cell.hash(), point);
		}
	}

	getCenterPoints(): Point[] {
		return Array.from(this.pointMap.values());
	}
}

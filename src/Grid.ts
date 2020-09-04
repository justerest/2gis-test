import { Point } from './Point';
import { HashMap } from './utils/HashMap';
import { Cell } from './Cell';
import { CellMap } from './CellMap';

export class Grid {
	private pointMap = new HashMap<Cell, Point>();

	constructor(private cellMap: CellMap) {}

	addPoint(point: Point): void {
		const cell = this.cellMap.get(point);
		const existingPoint = this.pointMap.get(cell);
		this.pointMap.set(cell, existingPoint ? cell.getClosestToCenter(existingPoint, point) : point);
	}

	getFilteredPoints(): Point[] {
		return Array.from(this.pointMap.values());
	}
}

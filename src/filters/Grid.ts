import { Point } from './Point';
import { CellMap } from './CellMap';

export class Grid {
	private pointMap = new Map<string, Point>();

	constructor(private cellMap: CellMap) {}

	addPoint(point: Point): void {
		const cell = this.cellMap.get(point);
		const existingPoint = this.pointMap.get(cell.hash());
		this.pointMap.set(
			cell.hash(),
			existingPoint ? cell.getClosestToCenter(existingPoint, point) : point,
		);
	}

	getFilteredPoints(): Point[] {
		return Array.from(this.pointMap.values());
	}
}

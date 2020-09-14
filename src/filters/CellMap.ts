import { Point } from './Point';
import { Cell } from './Cell';

export class CellMap {
	constructor(
		private stepX: number,
		private stepY: number = stepX,
		private xOffset: number = 0,
		private yOffset: number = 0,
	) {}

	get(point: Point): Cell {
		return new Cell(this.getCellCenter(point));
	}

	private getCellCenter(point: Point): Point {
		const [x, y] = point.getCoordinates();
		return new Point([
			this.getCellCenterCoordinate(x - this.xOffset, this.stepX) + this.xOffset,
			this.getCellCenterCoordinate(y - this.yOffset, this.stepY) + this.yOffset,
		]);
	}

	private getCellCenterCoordinate(coordinate: number, step: number): number {
		return coordinate - (coordinate % step) + step / 2;
	}
}

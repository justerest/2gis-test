import { Point } from './Point';
import { Cell } from './Cell';

export class CellMap {
	constructor(private stepX: number, private stepY: number = stepX) {}

	get(point: Point): Cell {
		return new Cell(this.getCellCenter(point));
	}

	private getCellCenter(point: Point): Point {
		const [x, y] = point.getCoordinates();
		return new Point([
			this.getCellCenterCoordinate(x, this.stepX),
			this.getCellCenterCoordinate(y, this.stepY),
		]);
	}

	private getCellCenterCoordinate(coordinate: number, step: number): number {
		return coordinate - (coordinate % step) + step / 2;
	}
}

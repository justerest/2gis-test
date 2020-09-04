import { Point } from './Point';
import { Grid } from './Grid';
import { CellMap } from './CellMap';

export class PointsFilter {
	constructor(private cellMap: CellMap) {}

	filter(points: Point[]): Point[] {
		const grid = new Grid(this.cellMap);
		points.forEach((point) => grid.addPoint(point));
		return grid.getFilteredPoints();
	}
}

import { Point } from './Point';
import { Grid } from './Grid';
import { CellMap } from './CellMap';

/**
		Фильтрует точки по сетке. В одной клетке не больше одной точки.
		Выбирается ближайшая к центру клетки точка.
		Не срабатывает для двух близких друг к другу точек, которые оказались в разных клетках.
		Работает за линейное время O(n).
*/
export class DensityPointsFilter {
	constructor(private cellMap: CellMap) {}

	filter(points: Point[]): Point[] {
		const grid = new Grid(this.cellMap);
		points.forEach((point) => grid.addPoint(point));
		return grid.getFilteredPoints();
	}
}

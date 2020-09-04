import { PointsFilter } from './PointsFilter';
import { Point } from './Point';

export class CombinedPointsFilter implements PointsFilter {
	constructor(private filters: PointsFilter[]) {}

	filter(points: Point[]): Point[] {
		return this.filters.reduce((term, filter) => filter.filter(term), points);
	}
}

import { PointsFilter } from './PointsFilter';
import { Rectangle } from './Rectangle';
import { Point } from './Point';

export class BoundsPointsFilter implements PointsFilter {
	constructor(private bound: Rectangle) {}

	filter(points: Point[]): Point[] {
		return points.filter((point) => this.bound.has(point));
	}
}

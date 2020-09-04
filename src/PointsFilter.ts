import { Point } from './Point';

export interface PointsFilter {
	filter(points: Point[]): Point[];
}

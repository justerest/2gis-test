import { Point } from './Point';
import { PointsFilter } from './PointsFilter';
import { CellMap } from './CellMap';

describe(PointsFilter.name, () => {
	describe(PointsFilter.prototype.filter.name, () => {
		it('should returns sended points', () => {
			const pointsFilter = new PointsFilter(new CellMap(1));
			const points = [new Point([0, 0]), new Point([1, 1])];
			expect(pointsFilter.filter(points)).toEqual(points);
		});

		it('should returns middle point', () => {
			const pointsFilter = new PointsFilter(new CellMap(3));
			const points = [new Point([0, 0]), new Point([1, 0]), new Point([2, 0])];
			expect(pointsFilter.filter(points)).toEqual([new Point([1, 0])]);
		});

		it('should skip middle point', () => {
			const pointsFilter = new PointsFilter(new CellMap(1.7));
			const points = [new Point([0, 0]), new Point([2, 0]), new Point([3, 0])];
			expect(pointsFilter.filter(points)).toEqual([new Point([0, 0]), new Point([3, 0])]);
		});
	});
});

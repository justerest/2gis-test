import { Point } from './Point';
import { DensityPointsFilter } from './DensityPointsFilter';
import { CellMap } from './CellMap';

describe(DensityPointsFilter.name, () => {
	describe(DensityPointsFilter.prototype.filter.name, () => {
		it('should returns sended points', () => {
			const densityPointsFilter = new DensityPointsFilter(new CellMap(1));
			const points = [new Point([0, 0]), new Point([1, 1])];
			expect(densityPointsFilter.filter(points)).toEqual(points);
		});

		it('should returns middle point', () => {
			const densityPointsFilter = new DensityPointsFilter(new CellMap(3));
			const points = [new Point([0, 0]), new Point([1, 0]), new Point([2, 0])];
			expect(densityPointsFilter.filter(points)).toEqual([new Point([1, 0])]);
		});

		it('should skip middle point', () => {
			const densityPointsFilter = new DensityPointsFilter(new CellMap(1.7));
			const points = [new Point([0, 0]), new Point([2, 0]), new Point([3, 0])];
			expect(densityPointsFilter.filter(points)).toEqual([new Point([0, 0]), new Point([3, 0])]);
		});
	});
});

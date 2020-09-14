import { CellMap } from './CellMap';
import { Point } from './Point';

describe(CellMap.name, () => {
	it('should returns one cell for [0-1) points', () => {
		const cellMap = new CellMap(1);
		expect(cellMap.get(new Point([0, 0])).getCenter()).toEqual(new Point([0.5, 0.5]));
		expect(cellMap.get(new Point([0.5, 0])).getCenter()).toEqual(new Point([0.5, 0.5]));
		expect(cellMap.get(new Point([0.99, 0])).getCenter()).toEqual(new Point([0.5, 0.5]));
	});

	it('should returns one cell for [0.5-1.5) points', () => {
		const cellMap = new CellMap(1, 1, 0.5);
		expect(cellMap.get(new Point([0.5, 0])).getCenter()).toEqual(new Point([1, 0.5]));
		expect(cellMap.get(new Point([1, 0])).getCenter()).toEqual(new Point([1, 0.5]));
		expect(cellMap.get(new Point([1.45, 0])).getCenter()).toEqual(new Point([1, 0.5]));
	});
});

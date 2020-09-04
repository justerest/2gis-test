import { Hashable } from './Hashable';

export class HashMap<T extends Hashable, V> {
	private valueMap = new Map<string, V>();

	get(key: T): V | undefined {
		return this.valueMap.get(key.hash());
	}

	set(key: T, value: V): void {
		this.valueMap.set(key.hash(), value);
	}

	values(): IterableIterator<V> {
		return this.valueMap.values();
	}
}

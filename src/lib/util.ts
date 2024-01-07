export function mustIndexObj<T extends Record<string | number | symbol, V>, V>(
	obj: T,
	key: keyof T,
): V;
export function mustIndexObj<
	T extends Record<string | number | symbol, unknown>,
>(obj: T, key: keyof T) {
	if (obj[key] === undefined) {
		throw new Error(`Index ${key.toString()} not found in object ${obj}`);
	}
	return obj[key];
}

export function mustIndexArray(arr: Float32Array, index: number): number;
export function mustIndexArray<T>(arr: Array<T>, index: number): T;

export function mustIndexArray(arr: unknown[] | Float32Array, index: number) {
	if (arr[index] === undefined) {
		throw new Error(`Index ${index} not found in array ${arr}`);
	}

	if (Array.isArray(arr)) {
		return arr[index];
	}

	return arr.at(index);
}

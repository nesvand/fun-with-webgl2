export function mustIndexObj<
	T extends Record<string | number | symbol, unknown>,
>(obj: T, key: keyof T) {
	if (obj[key] === undefined) {
		throw new Error(`Index ${key.toString()} not found in object ${obj}`);
	}
	return obj[key];
}

export function mustIndexArray<U, T extends Array<U>>(arr: T, index: number) {
	if (arr[index] === undefined) {
		throw new Error(`Index ${index} not found in array ${arr}`);
	}

	// biome-ignore lint/style/noNonNullAssertion: index is checked above
	return arr[index]!;
}

import type { ExtendedWebGLContext } from "./webgl2-types";

export const ObjLoader = {
	stringToMesh(
		gl: ExtendedWebGLContext,
		meshName: string,
		objString: string,
		flipYUV: boolean,
	) {
		const obj = this.parseObjText(objString, flipYUV);

		// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
		return gl.fCreateMeshVAO(meshName, obj[0]!, obj[1]!, obj[2]!, obj[3]!, 3);
	},

	parseObjText(inputText: string, flipYUV: boolean) {
		const txt = `${inputText.trim()}\n`;

		let line: string;
		let items: string[];
		let itemArray: string[];
		let i: number;
		let index: number;
		let isQuad = false;
		const aCache: number[] = [];
		const cVert: number[] = [];
		const cUV: number[] = [];
		const cNorm: number[] = [];
		const fVert: number[] = [];
		const fUV: number[] = [];
		const fNorm: number[] = [];
		const fIndex: number[] = [];
		let fIndexCount = 0;
		let posA = 0;
		let posB = txt.indexOf("\n", 0);

		while (posB > posA) {
			line = txt.substring(posA, posB).trim();

			switch (line.charAt(0)) {
				case "v":
					items = line.split(" ");
					items.shift();

					switch (line.charAt(1)) {
						case " ":
							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							cVert.push(parseFloat(items[0]!));
							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							cVert.push(parseFloat(items[1]!));
							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							cVert.push(parseFloat(items[2]!));
							break;
						case "t":
							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							cUV.push(parseFloat(items[0]!));
							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							cUV.push(parseFloat(items[1]!));
							break;
						case "n":
							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							cNorm.push(parseFloat(items[0]!));
							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							cNorm.push(parseFloat(items[1]!));
							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							cNorm.push(parseFloat(items[2]!));
							break;
					}
					break;
				case "f":
					items = line.split(" ");
					items.shift();

					isQuad = false;

					for (i = 0; i < items.length; i++) {
						if (i === 3 && !isQuad) {
							i = 2;
							isQuad = true;
						}

						// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
						if (items[i]! in aCache) {
							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							fIndex.push(aCache[parseInt(items[i]!)]!);
						} else {
							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							itemArray = items[i]!.split("/");

							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							index = (parseInt(itemArray[0]!) - 1) * 3;
							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							fVert.push(cVert[index]!, cVert[index + 1]!, cVert[index + 2]!);

							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							index = (parseInt(itemArray[2]!) - 1) * 3;
							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							fNorm.push(cNorm[index]!, cNorm[index + 1]!, cNorm[index + 2]!);

							if (itemArray[1] !== "") {
								// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
								index = (parseInt(itemArray[1]!) - 1) * 2;
								fUV.push(
									// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
									cUV[index]!,
									// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
									!flipYUV ? cUV[index + 1]! : 1 - cUV[index + 1]!,
								);
							}

							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							aCache[parseInt(items[i]!)] = fIndexCount;
							fIndex.push(fIndexCount);
							fIndexCount++;
						}

						if (i === 3 && isQuad) {
							// biome-ignore lint/style/noNonNullAssertion: UNSAFE - we assume the values are not null
							fIndex.push(aCache[parseInt(items[0]!)]!);
						}
					}
					break;
			}

			posA = posB + 1;
			posB = txt.indexOf("\n", posA);
		}

		return [fIndex, fVert, fNorm, fUV];
	},
};

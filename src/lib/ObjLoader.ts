import type { ExtendedWebGLContext } from "./webgl2-types";

// biome-ignore lint/complexity/noStaticOnlyClass: TODO: Refactor to not be static
export class ObjLoader {
	static stringToMesh(
		gl: ExtendedWebGLContext,
		meshName: string,
		objString: string,
		flipYUV: boolean,
	) {
		const obj = this.parseObjText(objString, flipYUV);

		return gl.fCreateMeshVAO(meshName, obj[0], obj[1], obj[2], obj[3], 3);
	}

	static parseObjText(inputText: string, flipYUV: boolean) {
		const txt = inputText.trim() + "\n";

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
							cVert.push(parseFloat(items[0]));
							cVert.push(parseFloat(items[1]));
							cVert.push(parseFloat(items[2]));
							break;
						case "t":
							cUV.push(parseFloat(items[0]));
							cUV.push(parseFloat(items[1]));
							break;
						case "n":
							cNorm.push(parseFloat(items[0]));
							cNorm.push(parseFloat(items[1]));
							cNorm.push(parseFloat(items[2]));
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

						if (items[i] in aCache) {
							fIndex.push(aCache[parseInt(items[i])]);
						} else {
							itemArray = items[i].split("/");

							index = (parseInt(itemArray[0]) - 1) * 3;
							fVert.push(cVert[index], cVert[index + 1], cVert[index + 2]);

							index = (parseInt(itemArray[2]) - 1) * 3;
							fNorm.push(cNorm[index], cNorm[index + 1], cNorm[index + 2]);

							if (itemArray[1] !== "") {
								index = (parseInt(itemArray[1]) - 1) * 2;
								fUV.push(
									cUV[index],
									!flipYUV ? cUV[index + 1] : 1 - cUV[index + 1],
								);
							}

							aCache[parseInt(items[i])] = fIndexCount;
							fIndex.push(fIndexCount);
							fIndexCount++;
						}

						if (i === 3 && isQuad) {
							fIndex.push(aCache[parseInt(items[0])]);
						}
					}
					break;
			}

			posA = posB + 1;
			posB = txt.indexOf("\n", posA);
		}

		return [fIndex, fVert, fNorm, fUV];
	}
}

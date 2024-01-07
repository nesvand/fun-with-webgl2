import { ATTR_NORMAL_LOC, ATTR_POSITION_LOC, ATTR_UV_LOC } from "./globals";
import { mustIndexArray } from "./util";
import type { ExtendedWebGLContext, MeshVAO } from "./webgl2-types";

export function GLInstance(canvasID: string) {
	const canvas = document.getElementById(canvasID) as HTMLCanvasElement | null;
	if (!canvas) throw Error("Invalid canvas element");

	const gl = canvas.getContext("webgl2") as ExtendedWebGLContext | null;

	// Validate WebGL2 context
	if (!gl) {
		throw Error("WebGL context is not available.");
	}
	if (!("style" in gl.canvas)) throw Error("Invalid canvas element");

	gl.mMeshCache = new Map<string, MeshVAO>(); // Cache all the mesh structs, easy to unload buffers if they all exist in one place
	gl.mTextureCache = new Map<string, WebGLTexture | null>();

	//---------------------
	// Setup GL with default configs
	gl.cullFace(gl.BACK);
	gl.frontFace(gl.CCW);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.depthFunc(gl.LEQUAL);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	gl.clearColor(1, 1, 1, 1); // Set clear colour

	// Methods
	gl.fClear = () => {
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		return gl;
	};

	gl.fCreateArrayBuffer = (floatArray, isStatic = true) => {
		const buffer = gl.createBuffer();
		if (!buffer) throw Error("Unable to create buffer.");

		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			floatArray,
			isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW,
		);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		return buffer;
	};

	gl.fCreateMeshVAO = (
		name,
		arrayIndex,
		arrayVert,
		arrayNorm,
		arrayUv,
		vertLength,
	) => {
		const meshVAO: MeshVAO = {
			drawMode: gl.TRIANGLES,
		};

		meshVAO.vao = gl.createVertexArray();
		gl.bindVertexArray(meshVAO.vao);

		if (arrayVert) {
			meshVAO.bufVertices = gl.createBuffer();
			meshVAO.vertexComponentLen = vertLength || 3;
			meshVAO.vertexCount = arrayVert.length / meshVAO.vertexComponentLen;

			gl.bindBuffer(gl.ARRAY_BUFFER, meshVAO.bufVertices);
			gl.bufferData(
				gl.ARRAY_BUFFER,
				new Float32Array(arrayVert),
				gl.STATIC_DRAW,
			);
			gl.enableVertexAttribArray(ATTR_POSITION_LOC);
			gl.vertexAttribPointer(
				ATTR_POSITION_LOC,
				meshVAO.vertexComponentLen,
				gl.FLOAT,
				false,
				0,
				0,
			);
		}

		if (arrayNorm) {
			meshVAO.bufNormals = gl.createBuffer();

			gl.bindBuffer(gl.ARRAY_BUFFER, meshVAO.bufNormals);
			gl.bufferData(
				gl.ARRAY_BUFFER,
				new Float32Array(arrayNorm),
				gl.STATIC_DRAW,
			);
			gl.enableVertexAttribArray(ATTR_NORMAL_LOC);
			gl.vertexAttribPointer(ATTR_NORMAL_LOC, 3, gl.FLOAT, false, 0, 0);
		}

		if (arrayUv) {
			meshVAO.bufUvs = gl.createBuffer();

			gl.bindBuffer(gl.ARRAY_BUFFER, meshVAO.bufUvs);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arrayUv), gl.STATIC_DRAW);
			gl.enableVertexAttribArray(ATTR_UV_LOC);
			gl.vertexAttribPointer(ATTR_UV_LOC, 2, gl.FLOAT, false, 0, 0);
		}

		if (arrayIndex) {
			meshVAO.bufIndex = gl.createBuffer();
			meshVAO.indexCount = arrayIndex.length;

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshVAO.bufIndex);
			gl.bufferData(
				gl.ELEMENT_ARRAY_BUFFER,
				new Uint16Array(arrayIndex),
				gl.STATIC_DRAW,
			);
		}

		// Clean up
		gl.bindVertexArray(null); // Always unbind a VAO when you are done using one
		gl.bindBuffer(gl.ARRAY_BUFFER, null); // Unbind any buffers that may be set

		if (arrayIndex !== null && arrayIndex !== undefined) {
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		}

		gl.mMeshCache.set(name, meshVAO);

		return meshVAO;
	};

	gl.fLoadTexture = (name, image, doYFlip) => {
		const texture = gl.createTexture();

		if (doYFlip) {
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
		}

		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(
			gl.TEXTURE_2D,
			gl.TEXTURE_MIN_FILTER,
			gl.LINEAR_MIPMAP_NEAREST,
		);
		gl.generateMipmap(gl.TEXTURE_2D);

		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.mTextureCache.set(name, texture);

		if (doYFlip) {
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
		}

		return texture;
	};

	gl.fLoadCubeMap = (name, imageArray) => {
		if (imageArray.length !== 6) {
			return null;
		}

		const texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

		for (let i = 0; i < 6; i++) {
			gl.texImage2D(
				gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
				0,
				gl.RGBA,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				mustIndexArray(imageArray, i),
			);
		}

		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);

		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
		gl.mTextureCache.set(name, texture);

		return texture;
	};

	// Setters/Getters

	// Set the size of the canvas html element and the rendering view port
	gl.fSetSize = (w, h) => {
		if (!("style" in gl.canvas)) throw Error("Invalid canvas element");

		gl.canvas.style.width = `${w}px`;
		gl.canvas.style.height = `${h}px`;
		gl.canvas.width = w;
		gl.canvas.height = h;

		// when updating the canvas size we must reset the viewport of the canvas
		// else the reoslution webgl renders at will not change
		gl.viewport(0, 0, w, h);

		return gl;
	};

	gl.fFitScreen = (wp: number, hp: number) =>
		gl.fSetSize(window.innerWidth * (wp || 1), window.innerHeight * (hp || 1));

	return gl;
}

export const GLUtil = {
	rgbArray(...args: number[]) {
		if (args.length === 0) {
			return null;
		}

		return args.reduce((rgbArray: number[], hexVal) => {
			rgbArray.push(
				(hexVal & 0xff0000) >>> 16,
				(hexVal & 0x00ff00) >>> 8,
				hexVal & 0x0000ff,
			);

			return rgbArray;
		}, []);
	},
};

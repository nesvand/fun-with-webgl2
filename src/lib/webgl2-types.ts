// WebGL2 Types
export type BufferDataSource = ArrayBuffer | ArrayBufferView;
export type DOMString = string;
export type Int32List = number[];
export type Float32List = number[];
export type GLint64 = number;
export type GLuint64 = number;
export type TexImageSource =
	| ImageData
	| HTMLVideoElement
	| HTMLImageElement
	| HTMLCanvasElement;
export type Uint32List = Uint32Array | GLuint[];

export interface ExtendedWebGLContext extends WebGL2RenderingContext {
	fClear(): ExtendedWebGLContext;
	fSetSize(w: number, h: number): ExtendedWebGLContext;
	fFitScreen(wp: number, hp: number): ExtendedWebGLContext;
	fCreateArrayBuffer(floatArray: Float32Array, isStatic?: boolean): WebGLBuffer;
	fCreateMeshVAO(
		name: string,
		arrayIndex: NullableNumberArray,
		arrayVert?: NullableNumberArray,
		arrayNorm?: NullableNumberArray,
		arrayUv?: NullableNumberArray,
		vertLen?: number,
	): MeshVAO;
	fLoadTexture(
		name: string,
		image: TexImageSource,
		doYFlip?: boolean,
	): WebGLTexture | null;
	fLoadCubeMap(name: string, imageArray: TexImageSource[]): WebGLTexture | null;
	mMeshCache: Map<string, MeshVAO>;
	mTextureCache: Map<string, WebGLTexture | null>;
}

export interface MeshVAO {
	drawMode?: number;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	vao?: any;
	bufVertices?: WebGLBuffer | null;
	vertexComponentLen?: number;
	vertexCount?: number;
	bufNormals?: WebGLBuffer | null;
	bufUvs?: WebGLBuffer | null;
	bufIndex?: WebGLBuffer | null;
	indexCount?: number;
	indexLength?: number;
	noCulling?: boolean;
	doBlending?: boolean;
}

export interface AttribLocations {
	position: number;
	norm: number;
	uv: number;
}

export interface UniformLocations {
	perspective: WebGLUniformLocation | null;
	modelMatrix: WebGLUniformLocation | null;
	cameraMatrix: WebGLUniformLocation | null;
	mainTexture: WebGLUniformLocation | null;
}

export interface TestUniformLocations extends UniformLocations {
	time: WebGLUniformLocation | null;
}

export interface SkymapUniformLocations extends UniformLocations {
	time: WebGLUniformLocation | null;
	dayTex: WebGLUniformLocation | null;
	nightTex: WebGLUniformLocation | null;
}

export type ExtendedWebGLContextLike = ExtendedWebGLContext | null;
export type RenderLoopCallback = (deltaTime: number) => any;
export type MixedFloat32Array = Float32Array | number[];
export type NullableNumberArray = number[] | null;

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

export type ExtendedWebGLContext = WebGL2RenderingContext & {
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
};

export type MeshVAO = {
	drawMode?: number;
	vao: WebGLVertexArrayObject | null;
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
};

export type AttribLocations = {
	position: number;
	norm: number;
	uv: number;
};

export type UniformLocations = {
	perspective: WebGLUniformLocation | null;
	modelMatrix: WebGLUniformLocation | null;
	cameraMatrix: WebGLUniformLocation | null;
	mainTexture: WebGLUniformLocation | null;
};

export type TestUniformLocations = UniformLocations & {
	time: WebGLUniformLocation | null;
};

export type SkymapUniformLocations = UniformLocations & {
	time: WebGLUniformLocation | null;
	dayTex: WebGLUniformLocation | null;
	nightTex: WebGLUniformLocation | null;
};

export type MixedFloat32Array = Float32Array | number[];
export type NullableNumberArray = number[] | null;

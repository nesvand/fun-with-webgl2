declare module "*.css" {
  const _: string;
  export default _;
}

declare module "*.glsl" {
  const _: string;
  export default _;
}

declare module "*.obj" {
  const _: string;
  export default _;
}

//------------------------------------
// WEBGL2 SPECS - https://www.khronos.org/registry/webgl/specs/latest/2.0/

declare var WebGL2RenderingContext: {
  prototype: WebGL2RenderingContext;
  init(): WebGL2RenderingContext;
  readonly READ_BUFFER: GLenum;
  readonly UNPACK_ROW_LENGTH: GLenum;
  readonly UNPACK_SKIP_ROWS: GLenum;
  readonly UNPACK_SKIP_PIXELS: GLenum;
  readonly PACK_ROW_LENGTH: GLenum;
  readonly PACK_SKIP_ROWS: GLenum;
  readonly PACK_SKIP_PIXELS: GLenum;
  readonly COLOR: GLenum;
  readonly DEPTH: GLenum;
  readonly STENCIL: GLenum;
  readonly RED: GLenum;
  readonly RGB8: GLenum;
  readonly RGBA8: GLenum;
  readonly RGB10_A2: GLenum;
  readonly TEXTURE_BINDING_3D: GLenum;
  readonly UNPACK_SKIP_IMAGES: GLenum;
  readonly UNPACK_IMAGE_HEIGHT: GLenum;
  readonly TEXTURE_3D: GLenum;
  readonly TEXTURE_WRAP_R: GLenum;
  readonly MAX_3D_TEXTURE_SIZE: GLenum;
  readonly UNSIGNED_INT_2_10_10_10_REV: GLenum;
  readonly MAX_ELEMENTS_VERTICES: GLenum;
  readonly MAX_ELEMENTS_INDICES: GLenum;
  readonly TEXTURE_MIN_LOD: GLenum;
  readonly TEXTURE_MAX_LOD: GLenum;
  readonly TEXTURE_BASE_LEVEL: GLenum;
  readonly TEXTURE_MAX_LEVEL: GLenum;
  readonly MIN: GLenum;
  readonly MAX: GLenum;
  readonly DEPTH_COMPONENT24: GLenum;
  readonly MAX_TEXTURE_LOD_BIAS: GLenum;
  readonly TEXTURE_COMPARE_MODE: GLenum;
  readonly TEXTURE_COMPARE_FUNC: GLenum;
  readonly CURRENT_QUERY: GLenum;
  readonly QUERY_RESULT: GLenum;
  readonly QUERY_RESULT_AVAILABLE: GLenum;
  readonly STREAM_READ: GLenum;
  readonly STREAM_COPY: GLenum;
  readonly STATIC_READ: GLenum;
  readonly STATIC_COPY: GLenum;
  readonly DYNAMIC_READ: GLenum;
  readonly DYNAMIC_COPY: GLenum;
  readonly MAX_DRAW_BUFFERS: GLenum;
  readonly DRAW_BUFFER0: GLenum;
  readonly DRAW_BUFFER1: GLenum;
  readonly DRAW_BUFFER2: GLenum;
  readonly DRAW_BUFFER3: GLenum;
  readonly DRAW_BUFFER4: GLenum;
  readonly DRAW_BUFFER5: GLenum;
  readonly DRAW_BUFFER6: GLenum;
  readonly DRAW_BUFFER7: GLenum;
  readonly DRAW_BUFFER8: GLenum;
  readonly DRAW_BUFFER9: GLenum;
  readonly DRAW_BUFFER10: GLenum;
  readonly DRAW_BUFFER11: GLenum;
  readonly DRAW_BUFFER12: GLenum;
  readonly DRAW_BUFFER13: GLenum;
  readonly DRAW_BUFFER14: GLenum;
  readonly DRAW_BUFFER15: GLenum;
  readonly MAX_FRAGMENT_UNIFORM_COMPONENTS: GLenum;
  readonly MAX_VERTEX_UNIFORM_COMPONENTS: GLenum;
  readonly SAMPLER_3D: GLenum;
  readonly SAMPLER_2D_SHADOW: GLenum;
  readonly FRAGMENT_SHADER_DERIVATIVE_HINT: GLenum;
  readonly PIXEL_PACK_BUFFER: GLenum;
  readonly PIXEL_UNPACK_BUFFER: GLenum;
  readonly PIXEL_PACK_BUFFER_BINDING: GLenum;
  readonly PIXEL_UNPACK_BUFFER_BINDING: GLenum;
  readonly FLOAT_MAT2x3: GLenum;
  readonly FLOAT_MAT2x4: GLenum;
  readonly FLOAT_MAT3x2: GLenum;
  readonly FLOAT_MAT3x4: GLenum;
  readonly FLOAT_MAT4x2: GLenum;
  readonly FLOAT_MAT4x3: GLenum;
  readonly SRGB: GLenum;
  readonly SRGB8: GLenum;
  readonly SRGB8_ALPHA8: GLenum;
  readonly COMPARE_REF_TO_TEXTURE: GLenum;
  readonly RGBA32F: GLenum;
  readonly RGB32F: GLenum;
  readonly RGBA16F: GLenum;
  readonly RGB16F: GLenum;
  readonly VERTEX_ATTRIB_ARRAY_INTEGER: GLenum;
  readonly MAX_ARRAY_TEXTURE_LAYERS: GLenum;
  readonly MIN_PROGRAM_TEXEL_OFFSET: GLenum;
  readonly MAX_PROGRAM_TEXEL_OFFSET: GLenum;
  readonly MAX_VARYING_COMPONENTS: GLenum;
  readonly TEXTURE_2D_ARRAY: GLenum;
  readonly TEXTURE_BINDING_2D_ARRAY: GLenum;
  readonly R11F_G11F_B10F: GLenum;
  readonly UNSIGNED_INT_10F_11F_11F_REV: GLenum;
  readonly RGB9_E5: GLenum;
  readonly UNSIGNED_INT_5_9_9_9_REV: GLenum;
  readonly TRANSFORM_FEEDBACK_BUFFER_MODE: GLenum;
  readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: GLenum;
  readonly TRANSFORM_FEEDBACK_VARYINGS: GLenum;
  readonly TRANSFORM_FEEDBACK_BUFFER_START: GLenum;
  readonly TRANSFORM_FEEDBACK_BUFFER_SIZE: GLenum;
  readonly TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: GLenum;
  readonly RASTERIZER_DISCARD: GLenum;
  readonly MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: GLenum;
  readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: GLenum;
  readonly INTERLEAVED_ATTRIBS: GLenum;
  readonly SEPARATE_ATTRIBS: GLenum;
  readonly TRANSFORM_FEEDBACK_BUFFER: GLenum;
  readonly TRANSFORM_FEEDBACK_BUFFER_BINDING: GLenum;
  readonly RGBA32UI: GLenum;
  readonly RGB32UI: GLenum;
  readonly RGBA16UI: GLenum;
  readonly RGB16UI: GLenum;
  readonly RGBA8UI: GLenum;
  readonly RGB8UI: GLenum;
  readonly RGBA32I: GLenum;
  readonly RGB32I: GLenum;
  readonly RGBA16I: GLenum;
  readonly RGB16I: GLenum;
  readonly RGBA8I: GLenum;
  readonly RGB8I: GLenum;
  readonly RED_INTEGER: GLenum;
  readonly RGB_INTEGER: GLenum;
  readonly RGBA_INTEGER: GLenum;
  readonly SAMPLER_2D_ARRAY: GLenum;
  readonly SAMPLER_2D_ARRAY_SHADOW: GLenum;
  readonly SAMPLER_CUBE_SHADOW: GLenum;
  readonly UNSIGNED_INT_VEC2: GLenum;
  readonly UNSIGNED_INT_VEC3: GLenum;
  readonly UNSIGNED_INT_VEC4: GLenum;
  readonly INT_SAMPLER_2D: GLenum;
  readonly INT_SAMPLER_3D: GLenum;
  readonly INT_SAMPLER_CUBE: GLenum;
  readonly INT_SAMPLER_2D_ARRAY: GLenum;
  readonly UNSIGNED_INT_SAMPLER_2D: GLenum;
  readonly UNSIGNED_INT_SAMPLER_3D: GLenum;
  readonly UNSIGNED_INT_SAMPLER_CUBE: GLenum;
  readonly UNSIGNED_INT_SAMPLER_2D_ARRAY: GLenum;
  readonly DEPTH_COMPONENT32F: GLenum;
  readonly DEPTH32F_STENCIL8: GLenum;
  readonly FLOAT_32_UNSIGNED_INT_24_8_REV: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_RED_SIZE: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: GLenum;
  readonly FRAMEBUFFER_DEFAULT: GLenum;
  readonly DEPTH_STENCIL_ATTACHMENT: GLenum;
  readonly DEPTH_STENCIL: GLenum;
  readonly UNSIGNED_INT_24_8: GLenum;
  readonly DEPTH24_STENCIL8: GLenum;
  readonly UNSIGNED_NORMALIZED: GLenum;
  readonly DRAW_FRAMEBUFFER_BINDING: GLenum; /* Same as FRAMEBUFFER_BINDING */
  readonly READ_FRAMEBUFFER: GLenum;
  readonly DRAW_FRAMEBUFFER: GLenum;
  readonly READ_FRAMEBUFFER_BINDING: GLenum;
  readonly RENDERBUFFER_SAMPLES: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: GLenum;
  readonly MAX_COLOR_ATTACHMENTS: GLenum;
  readonly COLOR_ATTACHMENT1: GLenum;
  readonly COLOR_ATTACHMENT2: GLenum;
  readonly COLOR_ATTACHMENT3: GLenum;
  readonly COLOR_ATTACHMENT4: GLenum;
  readonly COLOR_ATTACHMENT5: GLenum;
  readonly COLOR_ATTACHMENT6: GLenum;
  readonly COLOR_ATTACHMENT7: GLenum;
  readonly COLOR_ATTACHMENT8: GLenum;
  readonly COLOR_ATTACHMENT9: GLenum;
  readonly COLOR_ATTACHMENT10: GLenum;
  readonly COLOR_ATTACHMENT11: GLenum;
  readonly COLOR_ATTACHMENT12: GLenum;
  readonly COLOR_ATTACHMENT13: GLenum;
  readonly COLOR_ATTACHMENT14: GLenum;
  readonly COLOR_ATTACHMENT15: GLenum;
  readonly FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: GLenum;
  readonly MAX_SAMPLES: GLenum;
  readonly HALF_FLOAT: GLenum;
  readonly RG: GLenum;
  readonly RG_INTEGER: GLenum;
  readonly R8: GLenum;
  readonly RG8: GLenum;
  readonly R16F: GLenum;
  readonly R32F: GLenum;
  readonly RG16F: GLenum;
  readonly RG32F: GLenum;
  readonly R8I: GLenum;
  readonly R8UI: GLenum;
  readonly R16I: GLenum;
  readonly R16UI: GLenum;
  readonly R32I: GLenum;
  readonly R32UI: GLenum;
  readonly RG8I: GLenum;
  readonly RG8UI: GLenum;
  readonly RG16I: GLenum;
  readonly RG16UI: GLenum;
  readonly RG32I: GLenum;
  readonly RG32UI: GLenum;
  readonly VERTEX_ARRAY_BINDING: GLenum;
  readonly R8_SNORM: GLenum;
  readonly RG8_SNORM: GLenum;
  readonly RGB8_SNORM: GLenum;
  readonly RGBA8_SNORM: GLenum;
  readonly SIGNED_NORMALIZED: GLenum;
  readonly COPY_READ_BUFFER: GLenum;
  readonly COPY_WRITE_BUFFER: GLenum;
  readonly COPY_READ_BUFFER_BINDING: GLenum; /* Same as COPY_READ_BUFFER */
  readonly COPY_WRITE_BUFFER_BINDING: GLenum; /* Same as COPY_WRITE_BUFFER */
  readonly UNIFORM_BUFFER: GLenum;
  readonly UNIFORM_BUFFER_BINDING: GLenum;
  readonly UNIFORM_BUFFER_START: GLenum;
  readonly UNIFORM_BUFFER_SIZE: GLenum;
  readonly MAX_VERTEX_UNIFORM_BLOCKS: GLenum;
  readonly MAX_FRAGMENT_UNIFORM_BLOCKS: GLenum;
  readonly MAX_COMBINED_UNIFORM_BLOCKS: GLenum;
  readonly MAX_UNIFORM_BUFFER_BINDINGS: GLenum;
  readonly MAX_UNIFORM_BLOCK_SIZE: GLenum;
  readonly MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: GLenum;
  readonly MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: GLenum;
  readonly UNIFORM_BUFFER_OFFSET_ALIGNMENT: GLenum;
  readonly ACTIVE_UNIFORM_BLOCKS: GLenum;
  readonly UNIFORM_TYPE: GLenum;
  readonly UNIFORM_SIZE: GLenum;
  readonly UNIFORM_BLOCK_INDEX: GLenum;
  readonly UNIFORM_OFFSET: GLenum;
  readonly UNIFORM_ARRAY_STRIDE: GLenum;
  readonly UNIFORM_MATRIX_STRIDE: GLenum;
  readonly UNIFORM_IS_ROW_MAJOR: GLenum;
  readonly UNIFORM_BLOCK_BINDING: GLenum;
  readonly UNIFORM_BLOCK_DATA_SIZE: GLenum;
  readonly UNIFORM_BLOCK_ACTIVE_UNIFORMS: GLenum;
  readonly UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: GLenum;
  readonly UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: GLenum;
  readonly UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: GLenum;
  readonly INVALID_INDEX: GLenum;
  readonly MAX_VERTEX_OUTPUT_COMPONENTS: GLenum;
  readonly MAX_FRAGMENT_INPUT_COMPONENTS: GLenum;
  readonly MAX_SERVER_WAIT_TIMEOUT: GLenum;
  readonly OBJECT_TYPE: GLenum;
  readonly SYNC_CONDITION: GLenum;
  readonly SYNC_STATUS: GLenum;
  readonly SYNC_FLAGS: GLenum;
  readonly SYNC_FENCE: GLenum;
  readonly SYNC_GPU_COMMANDS_COMPLETE: GLenum;
  readonly UNSIGNALED: GLenum;
  readonly SIGNALED: GLenum;
  readonly ALREADY_SIGNALED: GLenum;
  readonly TIMEOUT_EXPIRED: GLenum;
  readonly CONDITION_SATISFIED: GLenum;
  readonly WAIT_FAILED: GLenum;
  readonly SYNC_FLUSH_COMMANDS_BIT: GLenum;
  readonly VERTEX_ATTRIB_ARRAY_DIVISOR: GLenum;
  readonly ANY_SAMPLES_PASSED: GLenum;
  readonly ANY_SAMPLES_PASSED_CONSERVATIVE: GLenum;
  readonly SAMPLER_BINDING: GLenum;
  readonly RGB10_A2UI: GLenum;
  readonly INT_2_10_10_10_REV: GLenum;
  readonly TRANSFORM_FEEDBACK: GLenum;
  readonly TRANSFORM_FEEDBACK_PAUSED: GLenum;
  readonly TRANSFORM_FEEDBACK_ACTIVE: GLenum;
  readonly TRANSFORM_FEEDBACK_BINDING: GLenum;
  readonly TEXTURE_IMMUTABLE_FORMAT: GLenum;
  readonly MAX_ELEMENT_INDEX: GLenum;
  readonly TEXTURE_IMMUTABLE_LEVELS: GLenum;

  readonly TIMEOUT_IGNORED: GLint64;

  /* WebGL-specific enums */
  readonly MAX_CLIENT_WAIT_TIMEOUT_WEBGL: GLenum;
}

// WebGL2 Interfaces
interface WebGL2RenderingContext extends WebGLRenderingContext {
  /* Buffer objects */
  // WebGL1:
  bufferData(target: GLenum, size: GLsizeiptr, usage: GLenum): void;
  bufferData(target: GLenum, srcData: ArrayBuffer | null, usage: GLenum): void;
  bufferData(target: GLenum, srcData: ArrayBufferView, usage: GLenum): void;
  bufferSubData(target: GLenum, dstByteOffset: GLintptr, srcData: BufferDataSource): void;

  // WebGL2:
  bufferData(target: GLenum, srcData: ArrayBufferView, usage: GLenum, srcOffset: GLuint, length?: GLuint): void;
  bufferSubData(target: GLenum, dstByteOffset: GLintptr, srcData: ArrayBufferView, srcOffset: GLuint, length?: GLuint): void;

  copyBufferSubData(readTarget: GLenum, writeTarget: GLenum, readOffset: GLintptr, writeOffset: GLintptr, size: GLsizeiptr): void;
  // MapBufferRange, in particular its read-only and write-only modes,
  // can not be exposed safely to JavaScript. GetBufferSubData
  // replaces it for the purpose of fetching data back from the GPU.
  getBufferSubData(target: GLenum, srcByteOffset: GLintptr, dstBuffer: ArrayBufferView, dstOffset?: GLuint, length?: GLuint): void;

  /* Framebuffer objects */
  blitFramebuffer(srcX0: GLint, srcY0: GLint, srcX1: GLint, srcY1: GLint, dstX0: GLint, dstY0: GLint, dstX1: GLint, dstY1: GLint, mask: GLbitfield, filter: GLenum): void;
  framebufferTextureLayer(target: GLenum, attachment: GLenum, texture: WebGLTexture | null, level: GLint, layer: GLint): void;
  invalidateFramebuffer(target: GLenum, attachments: GLenum[]): void;
  invalidateSubFramebuffer(target: GLenum, attachments: GLenum[], x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;
  readBuffer(src: GLenum): void;

  /* Renderbuffer objects */
  getInternalformatParameter(target: GLenum, internalformat: GLenum, pname: GLenum): any;
  renderbufferStorageMultisample(target: GLenum, samples: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei): void;

  /* Texture objects */
  texStorage2D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei): void;
  texStorage3D(target: GLenum, levels: GLsizei, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei): void;

  // WebGL1 legacy entrypoints:
  texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pixels?: ArrayBufferView): void;
  texImage2D(target: GLenum, level: GLint, internalformat: GLint, format: GLenum, type: GLenum, source: TexImageSource): void; // May throw DOMException

  texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pixels: ArrayBufferView | null): void;
  texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, format: GLenum, type: GLenum, source: TexImageSource): void; // May throw DOMException

  // WebGL2 entrypoints:
  texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
  texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource): void; // May throw DOMException
  texImage2D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void;

  texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
  texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, source: TexImageSource): void; // May throw DOMException
  texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView | null): void;
  texImage3D(target: GLenum, level: GLint, internalformat: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void;

  texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
  texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, source: TexImageSource): void; // May throw DOMException
  texSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, srcData: ArrayBufferView, srcOffset: GLuint): void;

  texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, pboOffset: GLintptr): void;
  texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, source: TexImageSource): void; // May throw DOMException
  texSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, type: GLenum, srcData: ArrayBufferView | null, srcOffset?: GLuint): void;

  copyTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, x: GLint, y: GLint, width: GLsizei, height: GLsizei): void;

  compressedTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void;
  compressedTexImage2D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, border: GLint, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;

  compressedTexImage3D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, imageSize: GLsizei, offset: GLintptr): void;
  compressedTexImage3D(target: GLenum, level: GLint, internalformat: GLenum, width: GLsizei, height: GLsizei, depth: GLsizei, border: GLint, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;

  compressedTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, imageSize: GLsizei, offset: GLintptr): void;
  compressedTexSubImage2D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, width: GLsizei, height: GLsizei, format: GLenum, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;

  compressedTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, imageSize: GLsizei, offset: GLintptr): void;
  compressedTexSubImage3D(target: GLenum, level: GLint, xoffset: GLint, yoffset: GLint, zoffset: GLint, width: GLsizei, height: GLsizei, depth: GLsizei, format: GLenum, srcData: ArrayBufferView, srcOffset?: GLuint, srcLengthOverride?: GLuint): void;

  /* Programs and shaders */
  getFragDataLocation(program: WebGLProgram, name: DOMString): GLint;

  /* Uniforms */
  uniform1ui(location: WebGLUniformLocation | null, v0: GLuint): void;
  uniform2ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint): void;
  uniform3ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint, v2: GLuint): void;
  uniform4ui(location: WebGLUniformLocation | null, v0: GLuint, v1: GLuint, v2: GLuint, v3: GLuint): void;

  uniform1fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform2fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform3fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform4fv(location: WebGLUniformLocation | null, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;

  uniform1iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform2iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform3iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform4iv(location: WebGLUniformLocation | null, data: Int32List, srcOffset?: GLuint, srcLength?: GLuint): void;

  uniform1uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform2uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform3uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniform4uiv(location: WebGLUniformLocation | null, data: Uint32List, srcOffset?: GLuint, srcLength?: GLuint): void;

  uniformMatrix2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix3x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix4x2fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;

  uniformMatrix2x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix4x3fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;

  uniformMatrix2x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix3x4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;
  uniformMatrix4fv(location: WebGLUniformLocation | null, transpose: GLboolean, data: Float32List, srcOffset?: GLuint, srcLength?: GLuint): void;

  /* Vertex attribs */
  vertexAttribI4i(index: GLuint, x: GLint, y: GLint, z: GLint, w: GLint): void;
  vertexAttribI4iv(index: GLuint, values: Int32List): void;
  vertexAttribI4ui(index: GLuint, x: GLuint, y: GLuint, z: GLuint, w: GLuint): void;
  vertexAttribI4uiv(index: GLuint, values: Uint32List): void;
  vertexAttribIPointer(index: GLuint, size: GLint, type: GLenum, stride: GLsizei, offset: GLintptr): void;

  /* Writing to the drawing buffer */
  vertexAttribDivisor(index: GLuint, divisor: GLuint): void;
  drawArraysInstanced(mode: GLenum, first: GLint, count: GLsizei, instanceCount: GLsizei): void;
  drawElementsInstanced(mode: GLenum, count: GLsizei, type: GLenum, offset: GLintptr, instanceCount: GLsizei): void;
  drawRangeElements(mode: GLenum, start: GLuint, end: GLuint, count: GLsizei, type: GLenum, offset: GLintptr): void;

  /* Reading back pixels */
  // WebGL1:
  readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, dstData: ArrayBufferView | null): void;
  // WebGL2:
  readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, offset: GLintptr): void;
  readPixels(x: GLint, y: GLint, width: GLsizei, height: GLsizei, format: GLenum, type: GLenum, dstData: ArrayBufferView, dstOffset: GLuint): void;

  /* Multiple Render Targets */
  drawBuffers(buffers: GLenum[]): void;

  clearBufferfv(buffer: GLenum, drawbuffer: GLint, values: Float32List, srcOffset?: GLuint): void;
  clearBufferiv(buffer: GLenum, drawbuffer: GLint, values: Int32List, srcOffset?: GLuint): void;
  clearBufferuiv(buffer: GLenum, drawbuffer: GLint, values: Uint32List, srcOffset?: GLuint): void;

  clearBufferfi(buffer: GLenum, drawbuffer: GLint, depth: GLfloat, stencil: GLint): void;

  /* Query Objects */
  createQuery(): WebGLQuery | null;
  deleteQuery(query: WebGLQuery | null): void;
  isQuery(query: WebGLQuery | null): GLboolean;
  beginQuery(target: GLenum, query: WebGLQuery): void;
  endQuery(target: GLenum): void;
  getQuery(target: GLenum, pname: GLenum): WebGLQuery | null;
  getQueryParameter(query: WebGLQuery, pname: GLenum): any;

  /* Sampler Objects */
  createSampler(): WebGLSampler | null;
  deleteSampler(sampler: WebGLSampler | null): void;
  isSampler(sampler: WebGLSampler | null): GLboolean;
  bindSampler(unit: GLuint, sampler: WebGLSampler | null): void;
  samplerParameteri(sampler: WebGLSampler, pname: GLenum, param: GLint): void;
  samplerParameterf(sampler: WebGLSampler, pname: GLenum, param: GLfloat): void;
  getSamplerParameter(sampler: WebGLSampler, pname: GLenum): any;

  /* Sync objects */
  fenceSync(condition: GLenum, flags: GLbitfield): WebGLSync | null;
  isSync(sync: WebGLSync | null): GLboolean;
  deleteSync(sync: WebGLSync | null): void;
  clientWaitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLuint64): GLenum;
  waitSync(sync: WebGLSync, flags: GLbitfield, timeout: GLint64): void;
  getSyncParameter(sync: WebGLSync, pname: GLenum): any;

  /* Transform Feedback */
  createTransformFeedback(): WebGLTransformFeedback | null;
  deleteTransformFeedback(tf: WebGLTransformFeedback | null): void;
  isTransformFeedback(tf: WebGLTransformFeedback | null): GLboolean;
  bindTransformFeedback(target: GLenum, tf: WebGLTransformFeedback | null): void;
  beginTransformFeedback(primitiveMode: GLenum): void;
  endTransformFeedback(): void;
  transformFeedbackVaryings(program: WebGLProgram, varyings: DOMString[], bufferMode: GLenum): void;
  getTransformFeedbackVarying(program: WebGLProgram, index: GLuint): WebGLActiveInfo | null;
  pauseTransformFeedback(): void;
  resumeTransformFeedback(): void;

  /* Uniform Buffer Objects and Transform Feedback Buffers */
  bindBufferBase(target: GLenum, index: GLuint, buffer: WebGLBuffer | null): void;
  bindBufferRange(target: GLenum, index: GLuint, buffer: WebGLBuffer | null, offset: GLintptr, size: GLsizeiptr): void;
  getIndexedParameter(target: GLenum, index: GLuint): any;
  getUniformIndices(program: WebGLProgram, uniformNames: DOMString[]): GLuint[] | null;
  getActiveUniforms(program: WebGLProgram, uniformIndices: GLuint[], pname: GLenum): any;
  getUniformBlockIndex(program: WebGLProgram, uniformBlockName: DOMString): GLuint;
  getActiveUniformBlockParameter(program: WebGLProgram, uniformBlockIndex: GLuint, pname: GLenum): any;
  getActiveUniformBlockName(program: WebGLProgram, uniformBlockIndex: GLuint): DOMString | null;
  uniformBlockBinding(program: WebGLProgram, uniformBlockIndex: GLuint, uniformBlockBinding: GLuint): void;

  /* Vertex Array Objects */
  createVertexArray(): WebGLVertexArrayObject | null;
  deleteVertexArray(vertexArray: WebGLVertexArrayObject | null): void;
  isVertexArray(vertexArray: WebGLVertexArrayObject | null): GLboolean;
  bindVertexArray(array: WebGLVertexArrayObject | null): void;

  // ENUMS
  readonly READ_BUFFER: GLenum;
  readonly UNPACK_ROW_LENGTH: GLenum;
  readonly UNPACK_SKIP_ROWS: GLenum;
  readonly UNPACK_SKIP_PIXELS: GLenum;
  readonly PACK_ROW_LENGTH: GLenum;
  readonly PACK_SKIP_ROWS: GLenum;
  readonly PACK_SKIP_PIXELS: GLenum;
  readonly COLOR: GLenum;
  readonly DEPTH: GLenum;
  readonly STENCIL: GLenum;
  readonly RED: GLenum;
  readonly RGB8: GLenum;
  readonly RGBA8: GLenum;
  readonly RGB10_A2: GLenum;
  readonly TEXTURE_BINDING_3D: GLenum;
  readonly UNPACK_SKIP_IMAGES: GLenum;
  readonly UNPACK_IMAGE_HEIGHT: GLenum;
  readonly TEXTURE_3D: GLenum;
  readonly TEXTURE_WRAP_R: GLenum;
  readonly MAX_3D_TEXTURE_SIZE: GLenum;
  readonly UNSIGNED_INT_2_10_10_10_REV: GLenum;
  readonly MAX_ELEMENTS_VERTICES: GLenum;
  readonly MAX_ELEMENTS_INDICES: GLenum;
  readonly TEXTURE_MIN_LOD: GLenum;
  readonly TEXTURE_MAX_LOD: GLenum;
  readonly TEXTURE_BASE_LEVEL: GLenum;
  readonly TEXTURE_MAX_LEVEL: GLenum;
  readonly MIN: GLenum;
  readonly MAX: GLenum;
  readonly DEPTH_COMPONENT24: GLenum;
  readonly MAX_TEXTURE_LOD_BIAS: GLenum;
  readonly TEXTURE_COMPARE_MODE: GLenum;
  readonly TEXTURE_COMPARE_FUNC: GLenum;
  readonly CURRENT_QUERY: GLenum;
  readonly QUERY_RESULT: GLenum;
  readonly QUERY_RESULT_AVAILABLE: GLenum;
  readonly STREAM_READ: GLenum;
  readonly STREAM_COPY: GLenum;
  readonly STATIC_READ: GLenum;
  readonly STATIC_COPY: GLenum;
  readonly DYNAMIC_READ: GLenum;
  readonly DYNAMIC_COPY: GLenum;
  readonly MAX_DRAW_BUFFERS: GLenum;
  readonly DRAW_BUFFER0: GLenum;
  readonly DRAW_BUFFER1: GLenum;
  readonly DRAW_BUFFER2: GLenum;
  readonly DRAW_BUFFER3: GLenum;
  readonly DRAW_BUFFER4: GLenum;
  readonly DRAW_BUFFER5: GLenum;
  readonly DRAW_BUFFER6: GLenum;
  readonly DRAW_BUFFER7: GLenum;
  readonly DRAW_BUFFER8: GLenum;
  readonly DRAW_BUFFER9: GLenum;
  readonly DRAW_BUFFER10: GLenum;
  readonly DRAW_BUFFER11: GLenum;
  readonly DRAW_BUFFER12: GLenum;
  readonly DRAW_BUFFER13: GLenum;
  readonly DRAW_BUFFER14: GLenum;
  readonly DRAW_BUFFER15: GLenum;
  readonly MAX_FRAGMENT_UNIFORM_COMPONENTS: GLenum;
  readonly MAX_VERTEX_UNIFORM_COMPONENTS: GLenum;
  readonly SAMPLER_3D: GLenum;
  readonly SAMPLER_2D_SHADOW: GLenum;
  readonly FRAGMENT_SHADER_DERIVATIVE_HINT: GLenum;
  readonly PIXEL_PACK_BUFFER: GLenum;
  readonly PIXEL_UNPACK_BUFFER: GLenum;
  readonly PIXEL_PACK_BUFFER_BINDING: GLenum;
  readonly PIXEL_UNPACK_BUFFER_BINDING: GLenum;
  readonly FLOAT_MAT2x3: GLenum;
  readonly FLOAT_MAT2x4: GLenum;
  readonly FLOAT_MAT3x2: GLenum;
  readonly FLOAT_MAT3x4: GLenum;
  readonly FLOAT_MAT4x2: GLenum;
  readonly FLOAT_MAT4x3: GLenum;
  readonly SRGB: GLenum;
  readonly SRGB8: GLenum;
  readonly SRGB8_ALPHA8: GLenum;
  readonly COMPARE_REF_TO_TEXTURE: GLenum;
  readonly RGBA32F: GLenum;
  readonly RGB32F: GLenum;
  readonly RGBA16F: GLenum;
  readonly RGB16F: GLenum;
  readonly VERTEX_ATTRIB_ARRAY_INTEGER: GLenum;
  readonly MAX_ARRAY_TEXTURE_LAYERS: GLenum;
  readonly MIN_PROGRAM_TEXEL_OFFSET: GLenum;
  readonly MAX_PROGRAM_TEXEL_OFFSET: GLenum;
  readonly MAX_VARYING_COMPONENTS: GLenum;
  readonly TEXTURE_2D_ARRAY: GLenum;
  readonly TEXTURE_BINDING_2D_ARRAY: GLenum;
  readonly R11F_G11F_B10F: GLenum;
  readonly UNSIGNED_INT_10F_11F_11F_REV: GLenum;
  readonly RGB9_E5: GLenum;
  readonly UNSIGNED_INT_5_9_9_9_REV: GLenum;
  readonly TRANSFORM_FEEDBACK_BUFFER_MODE: GLenum;
  readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: GLenum;
  readonly TRANSFORM_FEEDBACK_VARYINGS: GLenum;
  readonly TRANSFORM_FEEDBACK_BUFFER_START: GLenum;
  readonly TRANSFORM_FEEDBACK_BUFFER_SIZE: GLenum;
  readonly TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: GLenum;
  readonly RASTERIZER_DISCARD: GLenum;
  readonly MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: GLenum;
  readonly MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: GLenum;
  readonly INTERLEAVED_ATTRIBS: GLenum;
  readonly SEPARATE_ATTRIBS: GLenum;
  readonly TRANSFORM_FEEDBACK_BUFFER: GLenum;
  readonly TRANSFORM_FEEDBACK_BUFFER_BINDING: GLenum;
  readonly RGBA32UI: GLenum;
  readonly RGB32UI: GLenum;
  readonly RGBA16UI: GLenum;
  readonly RGB16UI: GLenum;
  readonly RGBA8UI: GLenum;
  readonly RGB8UI: GLenum;
  readonly RGBA32I: GLenum;
  readonly RGB32I: GLenum;
  readonly RGBA16I: GLenum;
  readonly RGB16I: GLenum;
  readonly RGBA8I: GLenum;
  readonly RGB8I: GLenum;
  readonly RED_INTEGER: GLenum;
  readonly RGB_INTEGER: GLenum;
  readonly RGBA_INTEGER: GLenum;
  readonly SAMPLER_2D_ARRAY: GLenum;
  readonly SAMPLER_2D_ARRAY_SHADOW: GLenum;
  readonly SAMPLER_CUBE_SHADOW: GLenum;
  readonly UNSIGNED_INT_VEC2: GLenum;
  readonly UNSIGNED_INT_VEC3: GLenum;
  readonly UNSIGNED_INT_VEC4: GLenum;
  readonly INT_SAMPLER_2D: GLenum;
  readonly INT_SAMPLER_3D: GLenum;
  readonly INT_SAMPLER_CUBE: GLenum;
  readonly INT_SAMPLER_2D_ARRAY: GLenum;
  readonly UNSIGNED_INT_SAMPLER_2D: GLenum;
  readonly UNSIGNED_INT_SAMPLER_3D: GLenum;
  readonly UNSIGNED_INT_SAMPLER_CUBE: GLenum;
  readonly UNSIGNED_INT_SAMPLER_2D_ARRAY: GLenum;
  readonly DEPTH_COMPONENT32F: GLenum;
  readonly DEPTH32F_STENCIL8: GLenum;
  readonly FLOAT_32_UNSIGNED_INT_24_8_REV: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_RED_SIZE: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: GLenum;
  readonly FRAMEBUFFER_DEFAULT: GLenum;
  readonly DEPTH_STENCIL_ATTACHMENT: GLenum;
  readonly DEPTH_STENCIL: GLenum;
  readonly UNSIGNED_INT_24_8: GLenum;
  readonly DEPTH24_STENCIL8: GLenum;
  readonly UNSIGNED_NORMALIZED: GLenum;
  readonly DRAW_FRAMEBUFFER_BINDING: GLenum; /* Same as FRAMEBUFFER_BINDING */
  readonly READ_FRAMEBUFFER: GLenum;
  readonly DRAW_FRAMEBUFFER: GLenum;
  readonly READ_FRAMEBUFFER_BINDING: GLenum;
  readonly RENDERBUFFER_SAMPLES: GLenum;
  readonly FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: GLenum;
  readonly MAX_COLOR_ATTACHMENTS: GLenum;
  readonly COLOR_ATTACHMENT1: GLenum;
  readonly COLOR_ATTACHMENT2: GLenum;
  readonly COLOR_ATTACHMENT3: GLenum;
  readonly COLOR_ATTACHMENT4: GLenum;
  readonly COLOR_ATTACHMENT5: GLenum;
  readonly COLOR_ATTACHMENT6: GLenum;
  readonly COLOR_ATTACHMENT7: GLenum;
  readonly COLOR_ATTACHMENT8: GLenum;
  readonly COLOR_ATTACHMENT9: GLenum;
  readonly COLOR_ATTACHMENT10: GLenum;
  readonly COLOR_ATTACHMENT11: GLenum;
  readonly COLOR_ATTACHMENT12: GLenum;
  readonly COLOR_ATTACHMENT13: GLenum;
  readonly COLOR_ATTACHMENT14: GLenum;
  readonly COLOR_ATTACHMENT15: GLenum;
  readonly FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: GLenum;
  readonly MAX_SAMPLES: GLenum;
  readonly HALF_FLOAT: GLenum;
  readonly RG: GLenum;
  readonly RG_INTEGER: GLenum;
  readonly R8: GLenum;
  readonly RG8: GLenum;
  readonly R16F: GLenum;
  readonly R32F: GLenum;
  readonly RG16F: GLenum;
  readonly RG32F: GLenum;
  readonly R8I: GLenum;
  readonly R8UI: GLenum;
  readonly R16I: GLenum;
  readonly R16UI: GLenum;
  readonly R32I: GLenum;
  readonly R32UI: GLenum;
  readonly RG8I: GLenum;
  readonly RG8UI: GLenum;
  readonly RG16I: GLenum;
  readonly RG16UI: GLenum;
  readonly RG32I: GLenum;
  readonly RG32UI: GLenum;
  readonly VERTEX_ARRAY_BINDING: GLenum;
  readonly R8_SNORM: GLenum;
  readonly RG8_SNORM: GLenum;
  readonly RGB8_SNORM: GLenum;
  readonly RGBA8_SNORM: GLenum;
  readonly SIGNED_NORMALIZED: GLenum;
  readonly COPY_READ_BUFFER: GLenum;
  readonly COPY_WRITE_BUFFER: GLenum;
  readonly COPY_READ_BUFFER_BINDING: GLenum; /* Same as COPY_READ_BUFFER */
  readonly COPY_WRITE_BUFFER_BINDING: GLenum; /* Same as COPY_WRITE_BUFFER */
  readonly UNIFORM_BUFFER: GLenum;
  readonly UNIFORM_BUFFER_BINDING: GLenum;
  readonly UNIFORM_BUFFER_START: GLenum;
  readonly UNIFORM_BUFFER_SIZE: GLenum;
  readonly MAX_VERTEX_UNIFORM_BLOCKS: GLenum;
  readonly MAX_FRAGMENT_UNIFORM_BLOCKS: GLenum;
  readonly MAX_COMBINED_UNIFORM_BLOCKS: GLenum;
  readonly MAX_UNIFORM_BUFFER_BINDINGS: GLenum;
  readonly MAX_UNIFORM_BLOCK_SIZE: GLenum;
  readonly MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: GLenum;
  readonly MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: GLenum;
  readonly UNIFORM_BUFFER_OFFSET_ALIGNMENT: GLenum;
  readonly ACTIVE_UNIFORM_BLOCKS: GLenum;
  readonly UNIFORM_TYPE: GLenum;
  readonly UNIFORM_SIZE: GLenum;
  readonly UNIFORM_BLOCK_INDEX: GLenum;
  readonly UNIFORM_OFFSET: GLenum;
  readonly UNIFORM_ARRAY_STRIDE: GLenum;
  readonly UNIFORM_MATRIX_STRIDE: GLenum;
  readonly UNIFORM_IS_ROW_MAJOR: GLenum;
  readonly UNIFORM_BLOCK_BINDING: GLenum;
  readonly UNIFORM_BLOCK_DATA_SIZE: GLenum;
  readonly UNIFORM_BLOCK_ACTIVE_UNIFORMS: GLenum;
  readonly UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: GLenum;
  readonly UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: GLenum;
  readonly UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: GLenum;
  readonly INVALID_INDEX: GLenum;
  readonly MAX_VERTEX_OUTPUT_COMPONENTS: GLenum;
  readonly MAX_FRAGMENT_INPUT_COMPONENTS: GLenum;
  readonly MAX_SERVER_WAIT_TIMEOUT: GLenum;
  readonly OBJECT_TYPE: GLenum;
  readonly SYNC_CONDITION: GLenum;
  readonly SYNC_STATUS: GLenum;
  readonly SYNC_FLAGS: GLenum;
  readonly SYNC_FENCE: GLenum;
  readonly SYNC_GPU_COMMANDS_COMPLETE: GLenum;
  readonly UNSIGNALED: GLenum;
  readonly SIGNALED: GLenum;
  readonly ALREADY_SIGNALED: GLenum;
  readonly TIMEOUT_EXPIRED: GLenum;
  readonly CONDITION_SATISFIED: GLenum;
  readonly WAIT_FAILED: GLenum;
  readonly SYNC_FLUSH_COMMANDS_BIT: GLenum;
  readonly VERTEX_ATTRIB_ARRAY_DIVISOR: GLenum;
  readonly ANY_SAMPLES_PASSED: GLenum;
  readonly ANY_SAMPLES_PASSED_CONSERVATIVE: GLenum;
  readonly SAMPLER_BINDING: GLenum;
  readonly RGB10_A2UI: GLenum;
  readonly INT_2_10_10_10_REV: GLenum;
  readonly TRANSFORM_FEEDBACK: GLenum;
  readonly TRANSFORM_FEEDBACK_PAUSED: GLenum;
  readonly TRANSFORM_FEEDBACK_ACTIVE: GLenum;
  readonly TRANSFORM_FEEDBACK_BINDING: GLenum;
  readonly TEXTURE_IMMUTABLE_FORMAT: GLenum;
  readonly MAX_ELEMENT_INDEX: GLenum;
  readonly TEXTURE_IMMUTABLE_LEVELS: GLenum;

  readonly TIMEOUT_IGNORED: GLint64;

  /* WebGL-specific enums */
  readonly MAX_CLIENT_WAIT_TIMEOUT_WEBGL: GLenum;
}

interface WebGLQuery extends WebGLObject {
}

interface WebGLSampler extends WebGLObject {
}

interface WebGLSync extends WebGLObject {
}

interface WebGLTransformFeedback extends WebGLObject {
}

interface WebGLVertexArrayObject extends WebGLObject {
}

// WebGL2 Types
type BufferDataSource = ArrayBuffer | ArrayBufferView;
type DOMString = string;
type Int32List = number[];
type Float32List = number[];
type GLint64 = number;
type GLuint64 = number;
type TexImageSource = ImageData | HTMLVideoElement | HTMLImageElement | HTMLCanvasElement;
type Uint32List = Uint32Array | GLuint[];

interface ExtendedWebGLContext extends WebGL2RenderingContext {
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
    vertLen?: number
  ): MeshVAO;
  fLoadTexture(name: string, image: TexImageSource, doYFlip?: boolean): WebGLTexture | null;
  fLoadCubeMap(name: string, imageArray: TexImageSource[]): WebGLTexture | null
  mMeshCache: Map<string, MeshVAO>;
  mTextureCache: Map<string, WebGLTexture | null>;
}

interface MeshVAO {
  drawMode?: number;
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

interface AttribLocations {
  position: number;
  norm: number;
  uv: number;
}

interface UniformLocations {
  perspective: WebGLUniformLocation | null;
  modelMatrix: WebGLUniformLocation | null;
  cameraMatrix: WebGLUniformLocation | null;
  mainTexture: WebGLUniformLocation | null;
}

interface TestUniformLocations extends UniformLocations {
  time: WebGLUniformLocation | null;
}

interface SkymapUniformLocations extends UniformLocations {
  time: WebGLUniformLocation | null;
  dayTex: WebGLUniformLocation | null;
  nightTex: WebGLUniformLocation | null;
}

type ExtendedWebGLContextLike = ExtendedWebGLContext | null;
type RenderLoopCallback = (deltaTime: number) => any;
type MixedFloat32Array = Float32Array | number[];
type NullableNumberArray = number[] | null;

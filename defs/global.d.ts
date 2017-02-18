declare module "*.css" {
  const _: string;
  export default _;
}

declare module "*.glsl" {
  const _: string;
  export default _;
}

interface ExtendedWebGLContext extends WebGLRenderingContext {
  fClear(): ExtendedWebGLContext;
  fSetSize(w: number, h: number): ExtendedWebGLContext;
  fCreateArrayBuffer(floatArray: Float32Array, isStatic?: boolean): WebGLBuffer;
}

type ExtendedWebGLContextLike = ExtendedWebGLContext | null;
type RenderLoopCallback = (deltaTime: number) => any;

import {
  ATTR_NORMAL_LOC,
  ATTR_NORMAL_NAME,
  ATTR_POSITION_LOC,
  ATTR_POSITION_NAME,
  ATTR_UV_LOC,
  ATTR_UV_NAME
} from './globals';

export default function GLInstance(canvasID: string): ExtendedWebGLContext | null {
  const canvas = <HTMLCanvasElement>document.getElementById(canvasID);
  const gl = <ExtendedWebGLContext>canvas.getContext('webgl2');

  if (!gl) {
    console.error('WebGL context is not available.'); // eslint-disable-line
    return null;
  }

  gl.mMeshCache = {}; // Cache all the mesh structs, easy to unload buffers if they all exist in one place

  // Setup GL - Set all the default configurations we need
  gl.clearColor(1, 1, 1, 1); // Set clear colour

  // Methods
  gl.fClear = function () {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    return gl;
  }

  // Setters/Getters

  // Set the size of the canvas html element and the rendering view port
  gl.fSetSize = function (w, h) {
    gl.canvas.style.width = w + 'px';
    gl.canvas.style.height = h + 'px';
    gl.canvas.width = w;
    gl.canvas.height = h;

    // when updating the canvas size we must reset the viewport of the canvas
    // else the reoslution webgl renders at will not change
    gl.viewport(0, 0, w, h);

    return gl;
  }

  gl.fCreateArrayBuffer = function (floatArray, isStatic = true) {
    const buffer = <WebGLBuffer>gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, floatArray, isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return buffer;
  }

  gl.fCreateMeshVAO = function (name, arrayIndex, arrayVert, arrayNorm, arrayUv) {
    const meshVAO: MeshVAO = {
      drawMode: gl.TRIANGLES
    };

    meshVAO.vao = gl.createVertexArray();
    gl.bindVertexArray(meshVAO.vao);

    if (arrayVert) {
      meshVAO.bufVertices = gl.createBuffer();
      meshVAO.vertexComponentLen = 3;
      meshVAO.vertexCount = arrayVert.length / meshVAO.vertexComponentLen;

      gl.bindBuffer(gl.ARRAY_BUFFER, meshVAO.bufVertices);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arrayVert), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(ATTR_POSITION_LOC);
      gl.vertexAttribPointer(ATTR_POSITION_LOC, 3, gl.FLOAT, false, 0, 0);
    }

    if (arrayNorm) {
      meshVAO.bufNormals = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, meshVAO.bufNormals);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arrayNorm), gl.STATIC_DRAW);
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

      gl.bindBuffer(gl.ARRAY_BUFFER, meshVAO.bufIndex);
      gl.bufferData(gl.ARRAY_BUFFER, new Uint16Array(arrayIndex), gl.STATIC_DRAW);
      gl.vertexAttribPointer(ATTR_UV_LOC, 2, gl.FLOAT, false, 0, 0);
    }

    // Clean updating
    gl.bindVertexArray(null); // Always unbind a VAO when you are done using one
    gl.bindBuffer(gl.ARRAY_BUFFER, null); // Unbind any buffers that may be set

    gl.mMeshCache[name] = meshVAO;


    return meshVAO;
  }

  return gl;
}

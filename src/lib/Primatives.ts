import {
  ATTR_POSITION_LOC,
} from './globals';

import Model from './Model';

class GridAxis {
  static createModel (gl: ExtendedWebGLContext, axis: boolean) {
    return new Model(GridAxis.createMesh(gl, axis));
  }

  static createMesh (gl: ExtendedWebGLContext, axis: boolean) {
    const verts: number[] = [];
    const size = 1.8;
    const div = 10;
    const step = size / div;
    const half = size / 2;

    let p: number;

    for (let i = 0; i <= div; i++) {
      // Vertical Line
      p = -half + (i * step);
      verts.push(p); //x1
      verts.push(0); //y1 verts.push(half);
      verts.push(half); //z1 verts.push(0);
      verts.push(0); //c1

      verts.push(p); //x2
      verts.push(0); //y2 verts.push(-half);
      verts.push(-half); //z2 verts.push(0);
      verts.push(0); //c2 verts.push(1);

      // Horizontal Line
      p = half - (i * step);
      verts.push(-half); //x1
      verts.push(0); //y1 verts.push(p);
      verts.push(p); //z1 verts.push(0);
      verts.push(0); //c1

      verts.push(half); //x2
      verts.push(0); //y2 verts.push(p);
      verts.push(p); //z2 verts.push(0);
      verts.push(0); //c2 verts.push(1);
    }

    if (axis) {
      // x axis
      verts.push(-1.1); //x1
      verts.push(-0); //y1
      verts.push(0); //z1
      verts.push(1); //c1

      verts.push(1.1); //x2
      verts.push(0); //y2
      verts.push(0); //z2
      verts.push(1); //c2

      // y axis
      verts.push(0); //x1
      verts.push(-1.1); //y1
      verts.push(0); //z1
      verts.push(2); //c1

      verts.push(0); //x2
      verts.push(1.1); //y2
      verts.push(0); //z2
      verts.push(2); //c2

      // z axis
      verts.push(0); //x1
      verts.push(0); //y1
      verts.push(-1.1); //z1
      verts.push(3); //c1

      verts.push(0); //x2
      verts.push(0); //y2
      verts.push(1.1); //z2
      verts.push(3); //c2
    }

    const attrColorLoc = 4;
    const mesh = {
      drawMode: gl.LINES,
      vao: gl.createVertexArray(),
      vertexComponentLen: -1,
      vertexCount: -1,
      bufVertices: gl.createBuffer(),
    };

    let strideLen: number;

    mesh.vertexComponentLen = 4;
    mesh.vertexCount = verts.length / mesh.vertexComponentLen;
    strideLen = Float32Array.BYTES_PER_ELEMENT * mesh.vertexComponentLen;

    // Set up our buffer
    gl.bindVertexArray(mesh.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.bufVertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(ATTR_POSITION_LOC);
    gl.enableVertexAttribArray(attrColorLoc);

    gl.vertexAttribPointer(
      ATTR_POSITION_LOC,
      3,
      gl.FLOAT,
      false,
      strideLen,
      0
    );

    gl.vertexAttribPointer(
      attrColorLoc,
      1,
      gl.FLOAT,
      false,
      strideLen,
      Float32Array.BYTES_PER_ELEMENT * 3
    );

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.mMeshCache['grid'] = mesh;

    return mesh;
  }
}

export {
  GridAxis,
}

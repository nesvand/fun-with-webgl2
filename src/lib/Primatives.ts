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
      0,
    );

    gl.vertexAttribPointer(
      attrColorLoc,
      1,
      gl.FLOAT,
      false,
      strideLen,
      Float32Array.BYTES_PER_ELEMENT * 3,
    );

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.mMeshCache['grid'] = mesh;

    return mesh;
  }
}

class Quad {
  static createModel (gl: ExtendedWebGLContext) {
    return new Model(Quad.createMesh(gl));
  }

  static createMesh (gl: ExtendedWebGLContext) {
    const aVert = [
      -0.5, 0.5, 0,
      -0.5, -0.5, 0,
      0.5, -0.5, 0,
      0.5, 0.5, 0,
    ];
    const aUV = [
      0, 0,
      0, 1,
      1, 1,
      1, 0,
    ];
    const aIndex = [
      0, 1, 2,
      2, 3, 0,
    ];
    const mesh = gl.fCreateMeshVAO('Quad', aIndex, aVert, null, aUV);

    mesh.noCulling = true;
    mesh.doBlending = true;

    return mesh;
  }
}

class MultiQuad {
  static createModel (gl: ExtendedWebGLContext) {
    return new Model(MultiQuad.createMesh(gl));
  }

  static createMesh (gl: ExtendedWebGLContext) {
    const aIndex: number[] = [];
    const aUV: number[] = [];
    const aVert: number[] = [];

    for (let i = 0; i < 50; i++) {
      const size = 0.2 + (0.8 * Math.random());
      const half = size * 0.5;
      const angle = Math.PI * 2 * Math.random();
      const dx = half * Math.cos(angle);
      const dy = half * Math.sin(angle);
      const x = -2.5 + (Math.random() * 5);
      const y = -2.5 + (Math.random() * 5);
      const z = -2.5 + (Math.random() * 5);
      const p = i * 4;

      aVert.push(x - dx, y + half, z - dy); // Top Left
      aVert.push(x - dx, y - half, z - dy); // Bottom Left
      aVert.push(x + dx, y - half, z + dy); // Bottom Right
      aVert.push(x + dx, y + half, z + dy); // Top Right

      aUV.push(
        0, 0,
        0, 1,
        1, 1,
        1, 0,
      );

      aIndex.push(
        p, p + 1, p + 2,
        p + 2, p + 3, p,
      );
    }

    const mesh = gl.fCreateMeshVAO('MultiQuad', aIndex, aVert, null, aUV);

    mesh.noCulling = true;
    mesh.doBlending = true;

    return mesh;
  }
}

class Cube {
  static createModel (gl: ExtendedWebGLContext, name: string = 'Cube') {
    return new Model(Cube.createMesh(gl, name, 1, 1, 1, 0, 0, 0));
  }

  static createMesh (
    gl: ExtendedWebGLContext,
    name: string,
    width: number, height: number, depth: number,
    x: number, y: number, z: number,
  ) {
    const w = width * 0.5;
    const h = height * 0.5;
    const d = depth * 0.5;
    let x0 = x - w;
    let x1 = x + w;
    let y0 = y - h;
    let y1 = y + h;
    let z0 = z - d;
    let z1 = z + d;

    const aVert = [
      x0, y1, z1, 0, // Front
      x0, y0, z1, 0,
      x1, y0, z1, 0,
      x1, y1, z1, 0,

      x1, y1, z0, 1, // Back
      x1, y0, z0, 1,
      x0, y0, z0, 1,
      x0, y1, z0, 1,

      x0, y1, z0, 2, // Left
      x0, y0, z0, 2,
      x0, y0, z1, 2,
      x0, y1, z1, 2,

      x0, y0, z1, 3, // Bottom
      x0, y0, z0, 3,
      x1, y0, z0, 3,
      x1, y0, z1, 3,

      x1, y1, z1, 4, // Right
      x1, y0, z1, 4,
      x1, y0, z0, 4,
      x1, y1, z0, 4,

      x0, y1, z0, 5, // Top
      x0, y1, z1, 5,
      x1, y1, z1, 5,
      x1, y1, z0, 5,
    ];

    let aIndex: number[] = [];

    for (let i = 0; i < aVert.length / 4; i += 2) {
      aIndex.push(i, i + 1, (Math.floor(i / 4) * 4) + ((i + 2) % 4));
    }

    let aUV: number[] = [];

    for (let i = 0; i < 6; i++) {
      aUV.push(
        0, 0,
        0, 1,
        1, 1,
        1, 0,
      );
    }

    const aNorm = [
      0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
      0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
      -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
      0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
      1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
      0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
    ];

    const mesh = gl.fCreateMeshVAO(name, aIndex, aVert, aNorm, aUV, 4);

    mesh.noCulling = true;

    return mesh;
  }
}

export {
  GridAxis,
  Quad,
  MultiQuad,
  Cube
}

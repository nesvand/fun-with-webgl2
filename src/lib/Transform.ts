import { Vector3, Matrix4 } from './Math';

export default class Transform {
  position: Vector3;
  scale: Vector3;
  rotation: Vector3;
  matView: Matrix4;
  matNormal: Float32Array;
  forward: Float32Array;
  up: Float32Array;
  right: Float32Array;

  constructor () {
    // Transform vectors
    this.position = new Vector3(0, 0, 0); // Traditional X, Y, Z 3d positioning
    this.scale = new Vector3(1, 1, 1); // How much to scale a mesh. 1 means no scaling
    this.rotation = new Vector3(0, 0, 0); // Hold rotation values based on degrees - object will translate it to radians
    this.matView = new Matrix4(); // Cache the results when calling updateMatrix
    this.matNormal = new Float32Array(9); // This is a Mat3 raw array to hold values - good enough for what it is used for

    // Directional vectors
    this.forward = new Float32Array(4); // When rotating keep track of what the forward direction is
    this.up = new Float32Array(4); // The 'up' direction - invert to get 'bottom'
    this.right = new Float32Array(4); // The 'right' direction - invert to get 'left'
  }

  // ---------------------------
  // METHODS
  updateMatrix () {
    this.matView // ORDER IS IMPORTANT
      .reset()
      .vtranslate(this.position)
      .rotateX(this.rotation.x * Transform.deg2Rad)
      .rotateZ(this.rotation.z * Transform.deg2Rad)
      .rotateY(this.rotation.y * Transform.deg2Rad)
      .vscale(this.scale);

    // Calc the Normal Matrix which doesn't need translate - then transpose and inverse the mat4 to mat3
    Matrix4.normalMat3(this.matNormal, this.matView.raw);

    // Determine direction after all the transformations
    Matrix4.transformVec4(this.forward, [0, 0, 1, 0], this.matView.raw); // Z
    Matrix4.transformVec4(this.up, [0, 1, 0, 0], this.matView.raw); // Y
    Matrix4.transformVec4(this.right, [1, 0, 0, 0], this.matView.raw); // X

    return this.matView.raw;
  }

  updateDirection () {
    Matrix4.transformVec4(this.forward, [0, 0, 1, 0], this.matView.raw); // Z
    Matrix4.transformVec4(this.up, [0, 1, 0, 0], this.matView.raw); // Y
    Matrix4.transformVec4(this.right, [1, 0, 0, 0], this.matView.raw); // X

    return this;
  }

  getViewMatrix () {
    return this.matView.raw;
  }

  getNormalMatrix () {
    return this.matNormal;
  }

  reset () {
    this.position.set(0, 0, 0);
    this.scale.set(1, 1, 1);
    this.rotation.set(0, 0, 0);
  }

  static deg2Rad = Math.PI / 180;
}

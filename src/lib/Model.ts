export default class Model {
  mesh: MeshVAO;

  constructor(meshData: MeshVAO) {
    this.mesh = meshData;
  }

  preRender() { }
}

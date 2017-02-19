import {
  ATTR_NORMAL_LOC,
  ATTR_NORMAL_NAME,
  ATTR_POSITION_LOC,
  ATTR_POSITION_NAME,
  ATTR_UV_LOC,
  ATTR_UV_NAME
} from './globals';

import Model from './Model';

class ShaderUtil {
  static createShader(gl: ExtendedWebGLContext, source: string, type: number): WebGLShader | null {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    // Handle errors if the shader fails to compile
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`Error compiling shader : ${source}`, gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  static createProgram(gl: ExtendedWebGLContext, vShader: WebGLShader, fShader: WebGLShader, doValidate: boolean): WebGLProgram | null {
    // Link shaders together
    const prog = gl.createProgram();
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);

    // Force predefined locations for specific attributes
    // If the attribute isn't used in the shader its location will default to -1
    gl.bindAttribLocation(prog, ATTR_POSITION_LOC, ATTR_POSITION_NAME);
    gl.bindAttribLocation(prog, ATTR_NORMAL_LOC, ATTR_NORMAL_NAME);
    gl.bindAttribLocation(prog, ATTR_UV_LOC, ATTR_UV_NAME);

    gl.linkProgram(prog);

    // Check if successful
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(`Error creating shader program.`, gl.getProgramInfoLog(prog));
      gl.deleteProgram(prog);
      return null;
    }

    // Only do this for additional debugging
    if (doValidate) {
      gl.validateProgram(prog);
      if (!gl.getProgramParameter(prog, gl.VALIDATE_STATUS)) {
        console.error(`Error validating program.`, gl.getProgramInfoLog(prog));
        gl.deleteProgram(prog);
        return null;
      }
    }

    // Can delete the shaders since the program has been made
    gl.detachShader(prog, vShader);
    gl.detachShader(prog, fShader);
    gl.deleteShader(fShader);
    gl.deleteShader(vShader);

    return prog;
  }

  //----------------------
  // HELPER FUNCTIONS
  //----------------------
  static shaderProgram(gl: ExtendedWebGLContext, vShaderTxt: string, fShaderTxt: string, doValidate: boolean): WebGLProgram | null {
    const vShader = ShaderUtil.createShader(gl, vShaderTxt, gl.VERTEX_SHADER);
    if (vShader === null) {
      gl.deleteShader(vShader);
      return null;
    }

    const fShader = ShaderUtil.createShader(gl, fShaderTxt, gl.FRAGMENT_SHADER);
    if (fShader === null) {
      gl.deleteShader(fShader);
      return null;
    }

    return ShaderUtil.createProgram(gl, vShader, fShader, doValidate);
  }

  //----------------------
  // SETTERS / GETTERS
  //----------------------

  static getStandardAttribLocations(gl: ExtendedWebGLContext, program: WebGLProgram): AttribLocations {
    return {
      position: gl.getAttribLocation(program, ATTR_POSITION_NAME),
      norm: gl.getAttribLocation(program, ATTR_NORMAL_NAME),
      uv: gl.getAttribLocation(program, ATTR_UV_NAME),
    }
  }
}

class Shader {
  program: WebGLProgram | null;
  gl: ExtendedWebGLContext;
  attribLoc: AttribLocations;
  uniformLoc: any;

  constructor(gl: ExtendedWebGLContext, vertShaderSource: string, fragmentShaderSource: string) {
    this.program = ShaderUtil.shaderProgram(gl, vertShaderSource, fragmentShaderSource, true);

    if (this.program !== null) {
      this.gl = gl;
      gl.useProgram(this.program);
      this.attribLoc = ShaderUtil.getStandardAttribLocations(this.gl, this.program);
      this.uniformLoc = {};
    }
  }

  //--------------
  // METHODS
  //--------------
  activate() {
    this.gl.useProgram(this.program);
    return this;
  }

  deactivate() {
    this.gl.useProgram(null);
    return this;
  }

  dispose() {
    if (this.gl.getParameter(this.gl.CURRENT_PROGRAM) === this.program) {
      this.gl.useProgram(null);
    }

    this.gl.deleteProgram(this.program);
  }

  //--------------
  // RENDER METHODS
  //--------------

  preRender() { }

  renderModel(model: Model) {
    let vao = model.mesh.vao;
    let indexCount = model.mesh.indexCount;
    let drawMode = model.mesh.drawMode;
    let vertexCount = model.mesh.vertexCount;

    this.gl.bindVertexArray(vao);

    if (drawMode !== undefined) {
      if (indexCount !== undefined) {
        this.gl.drawElements(drawMode, indexCount, this.gl.UNSIGNED_SHORT, 0);
      }
      else {
        if (vertexCount !== undefined) {
          this.gl.drawArrays(drawMode, 0, vertexCount);
        }
      }
    }


    this.gl.bindVertexArray(null);

    return this;
  }
}

export {
  ShaderUtil,
  Shader
}

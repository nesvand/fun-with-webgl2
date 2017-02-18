export default class ShaderUtil {
  public static createShader(
    gl: ExtendedWebGLContext,
    source: string,
    type: number
  ): WebGLShader | null {
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

  public static createProgram(
    gl: ExtendedWebGLContext,
    vShader: WebGLShader,
    fShader: WebGLShader,
    doValidate: boolean
  ): WebGLProgram | null {
    // Link shaders together
    const prog = gl.createProgram();
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
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

  public static shaderProgram(
    gl: ExtendedWebGLContext,
    vShaderTxt: string,
    fShaderTxt: string,
    doValidate: boolean
  ): WebGLProgram | null {
    const vShader = ShaderUtil.createShader(gl, vShaderTxt, gl.VERTEX_SHADER);
    if (!vShader) {
      return null;
    }
    const fShader = ShaderUtil.createShader(gl, fShaderTxt, gl.FRAGMENT_SHADER);
    if (!fShader) {
      return null;
    }

    return ShaderUtil.createProgram(gl, vShader, fShader, doValidate);
  }
}

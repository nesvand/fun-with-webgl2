export default class ShaderUtil {
  // static domShaderSrc(elementID) {
  //   var element = document.getElementById(elementID);
  //   if (!element || element.text == "") {
  //     console.log(`${elementID} shader not found or no text.`);
  //     return null;
  //   }

  //   return element.text;
  // }

  static createShader(gl, source, type) {
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

  static createProgram(gl, vShader, fShader, doValidate) {
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

    return prog
  }
}

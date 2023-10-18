// example.js
let gl = document.getElementById('myCanvas').getContext('webgl');
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  // 设置 webgl 视口，将 -1 到 1 映射为 canvas 上的坐标
let vertexShaderSource = `
attribute vec4 a_position;
attribute vec4 a_color;
uniform mat4 u_projectionMatrix;
uniform mat4 u_modelViewMatrix;
varying vec4 v_color;
void main() {
  gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
  v_color = a_color;
}
`;
let fragmentShaderSource = `
precision mediump float;
varying vec4 v_color;
void main() {
  gl_FragColor = v_color;
}
`;
let program = createProgram(vertexShaderSource, fragmentShaderSource,gl);
// gl.useProgram(program);
let buffer = gl.createBuffer();
let vertices = [
  // positions          // colors
  /* 0.5, -0.5, -0.5,      1, 0, 0, 1, // front bottom right
  -0.5, -0.5, -0.5,     0, 1, 0, 1, // front bottom left
  0.0, 0.5, 0.0,        0, 0, 1, 1, // front top
  -0.5, -0.5, -0.5,     1, 0, 0, 1, // left bottom rear
  -0.5, -0.5, 0.5,      0, 1, 0, 1, // left bottom front
  0.0, 0.5, 0.0,        0, 0, 1, 1, // left top
  0.5, -0.5, -0.5,      1, 0, 0, 1, // rear bottom right
  0.0, -0.5, 0.5,       0, 1, 0, 1, // rear bottom left
  0.0, 0.5, 0.0,        0, 0, 1, 1, // rear top
  0.0, -0.5, 0.5,       1, 0, 0, 1, // right bottom front
  0.5, -0.5, -0.5,      0, 1, 0, 1, // right bottom rear
  0.0, 0.5, 0.0,        0, 0, 1, 1, // right top */
  

            //    v6----- v5
            //   /|      /|
            //  v1------v0|
            //  | |     | |
            //  | |v7---|-|v4
            //  |/      |/
            //  v2------v3
            1, 1, 1, 1,
            1.0, 1.0, 1.0, 1.0,
            -1, 1, 1, 1,
            1.0, 1.0, 1.0, 1.0,
            -1, -1, 1, 1,
            1.0, 1.0, 1.0, 1.0,
            1, 1, 1, 1,
            1.0, 1.0, 1.0, 1.0,
            -1, -1, 1, 1,
            1.0, 1.0, 1.0, 1.0,
            1, -1, 1, 1,
            1.0, 1.0, 1.0, 1.0,  //前面

            1, 1, -1, 1, 0.0, 1.0, 1.0, 1.0, 1, 1, 1, 1, 0.0, 1.0, 1.0, 1.0, 1, -1, 1, 1, 0.0, 1.0, 1.0, 1.0, 1, 1, -1, 1, 0.0, 1.0, 1.0, 1.0, 1, -1, 1, 1, 0.0, 1.0, 1.0, 1.0, 1, -1, -1, 1, 0.0, 1.0, 1.0, 1.0, //右

            -1, 1, -1, 1, 1.0, 0.0, 0.0, 1.0, 1, 1, -1, 1, 1.0, 0.0, 0.0, 1.0, 1, -1, -1, 1, 1.0, 0.0, 0.0, 1.0, -1, 1, -1, 1, 1.0, 0.0, 0.0, 1.0, 1, -1, -1, 1, 1.0, 0.0, 0.0, 1.0, -1, -1, -1, 1, 1.0, 0.0, 0.0, 1.0,//后

            -1, 1, 1, 1, 1.0, 1.0, 1, 1.0, -1, 1, -1, 1, 1.0, 1.0, 1, 1.0, -1, -1, -1, 1, 1.0, 1.0, 1, 1.0, -1, 1, 1, 1, 1.0, 1.0, 1, 1.0, -1, -1, -1, 1, 1.0, 1.0, 1, 1.0, -1, -1, 1, 1, 1.0, 1.0, 1, 1.0,//左

            -1, 1, -1, 1, 0.0, 1.0, 1.0, 1.0, -1, 1, 1, 1, 0.0, 1.0, 1.0, 1.0, 1, 1, 1, 1, 0.0, 1.0, 1.0, 1.0, -1, 1, -1, 1, 0.0, 1.0, 1.0, 1.0, 1, 1, 1, 1, 0.0, 1.0, 1.0, 1.0, 1, 1, -1, 1, 0.0, 1.0, 1.0, 1.0, //上

            -1, -1, 1, 1, 1.0, 1.0, 0, 1.0, -1, -1, -1, 1, 1.0, 1.0, 0, 1.0, 1, -1, -1, 1, 1.0, 1.0, 0, 1.0, -1, -1, 1, 1, 1.0, 1.0, 0, 1.0, 1, -1, -1, 1, 1.0, 1.0, 0, 1.0, 1, -1, 1, 1, 1.0, 1.0, 0, 1.0, //下


];
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

let positionAttribute = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionAttribute);
let colorAttribute = gl.getAttribLocation(program, 'a_color');
gl.enableVertexAttribArray(colorAttribute);
gl.vertexAttribPointer(positionAttribute, 4, gl.FLOAT, false, 32, 0);
gl.vertexAttribPointer(colorAttribute, 4, gl.FLOAT, false, 32, 16);

let projectionMatrix = glMatrix.mat4.perspective(
  glMatrix.mat4.create(),
  Math.PI/4, // field of view
  gl.canvas.width/gl.canvas.height, // aspect ratio
  0.1, // near
  100, // far
);
let modelViewMatrix = glMatrix.mat4.create();
glMatrix.mat4.lookAt({x: 2, y: 2, z: 2}, {x: 0, y: 0, z: 0}, {x: 0, y: 1, z: 0}, modelViewMatrix);
let orbitControls = new OrbitControls(gl.canvas);

orbitControls.addEventListener('change', render);
orbitControls.enableZoom = false;

function render() {
    
  let projectionUniformLocation = gl.getUniformLocation(program, 'u_projectionMatrix');
  gl.uniformMatrix4fv(projectionUniformLocation, false, projectionMatrix);

  let modelViewUniformLocation = gl.getUniformLocation(program, 'u_modelViewMatrix');
  gl.uniformMatrix4fv(modelViewUniformLocation, false, modelViewMatrix);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  gl.drawArrays(gl.TRIANGLES, 0, 12*3);
}
render();
requestAnimationFrame(render);

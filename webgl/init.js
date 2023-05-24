let gl;
let program;
let vertexShader;
let fragmentShader;
function initwebgl() {
    let canvas = document.getElementById("map");
    gl = canvas.getContext("webgl");
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}
const initShader = function () {
    vertexShader = gl.createShader(gl.VERTEX_SHADER) // 创建一个顶点着色器
    gl.shaderSource(vertexShader, `
      attribute vec4 a_position;
      attribute vec4 a_color;
      varying vec4 v_color;

      //创建平移矩阵(沿x轴平移-0.4)
      //1   0   0  -0.4
      //0   1   0    0
      //0   0   1    0
      //0   0   0    1
      mat4 m4 = mat4(1,0,0,0,  0,1,0,0,  0,0,1,0,  -0.4,0,0,1);
      //平移矩阵m4左乘顶点坐标(vec4类型数据可以理解为线性代数中的nx1矩阵，即列向量)
      // 逐顶点进行矩阵变换
      void main() {
        v_color = a_color;
        gl_Position = a_position; //translate矩阵乘以顶点坐标得到新的顶点坐标
        gl_PointSize=8.0;//设置点的大小
      }
    `) // 编写顶点着色器代码
    gl.compileShader(vertexShader) // 编译着色器
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) // 创建一个片元着色器
    gl.shaderSource(fragmentShader, `
        precision mediump float;
        varying vec4 v_color;
        void main() {
            gl_FragColor = v_color; // 设置片元颜色
        }
    `) // 编写片元着色器代码
    gl.compileShader(fragmentShader)
}
const initProgram = function () {
    program = gl.createProgram() // 创建一个程序
    gl.attachShader(program, vertexShader) // 添加顶点着色器
    gl.attachShader(program, fragmentShader) // 添加片元着色器
    gl.linkProgram(program) // 连接 program 中的着色器
    gl.useProgram(program)
}
initwebgl();
initShader();
initProgram();
let position = gl.getAttribLocation(program, 'a_position');
let color=gl.getAttribLocation(program,'a_color');
let positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.2, 0.2, 1,0,0,1,
    0, 0.2, 0,1,0,1,
    0, 0, 1,0,0,1,
    0.2, 0, 0,0,1,1]), gl.STATIC_DRAW);
gl.enableVertexAttribArray(position);
gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 5*4, 0);
gl.enableVertexAttribArray(color);
gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 5*4, 2*4);

// let colorLocation = gl.getUniformLocation(program, 'u_color')
// gl.uniform4f(colorLocation, 0.93, 0, 0.26, 1) // 设置它的值

gl.clearColor(0.2, 1, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
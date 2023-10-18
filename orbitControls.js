// orbitControls.js
function OrbitControls(canvas) {
    let mousePosition = { x: 0, y: 0 };
    let dragStartPosition = { x: 0, y: 0 };
    let dragging = false;
    let radius = 5;
    let theta = Math.PI/2;
    let phi = Math.PI/2;
    
    let handleMouseUp = function(event) {
      dragging = false;
    };
  
    let handleMouseDown = function(event) {
      dragging = true;
      dragStartPosition.x = event.clientX;
      dragStartPosition.y = event.clientY;
    };
  
    let handleMouseMove = function(event) {
      if (dragging) {
        let delta = {
          x: event.clientX - dragStartPosition.x,
          y: event.clientY - dragStartPosition.y,
        };
        theta += delta.x * 0.01;
        phi += delta.y * 0.01;
        phi = Math.min(Math.max(phi, 0), Math.PI);
        dragStartPosition.x = event.clientX;
        dragStartPosition.y = event.clientY;
      }
    };
  
    let handleMouseWheel = function(event) {
      radius += event.deltaY * 0.05;
      radius = Math.min(Math.max(radius, 2), 20);
    };
  
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    canvas.addEventListener('wheel', handleMouseWheel);
  
    this.enableZoom = true;
    this.addEventListener = function(event, callback) {
      canvas.addEventListener(event, callback);
    };
    this.disable = function() {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
      canvas.removeEventListener('wheel', handleMouseWheel);
    };
    this.update = function() {
      let eye = {
          x: radius * Math.sin(phi) * Math.sin(theta),
          y: radius * Math.cos(phi),
          z: radius * Math.sin(phi) * Math.cos(theta),
      };
      let up = { x: 0, y: 1, z: 0 };
      let target = { x: 0, y: 0, z: 0 };
      let viewMatrix = glMatrix.mat4.lookAt(
          glMatrix.mat4.create(),
          eye,
          target,
          up,
      );
      glMatrix.mat4.copy(modelViewMatrix, viewMatrix);
    };
    this.update();
  }
  
  function createShader(sourceCode, type,gl) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
  
  function createProgram(vertexShaderSource, fragmentShaderSource,gl) {
    let vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER,gl);
    let fragmentShader = createShader(fragmentShaderSource, gl.FRAGMENT_SHADER,gl);
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program)
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }
  
  
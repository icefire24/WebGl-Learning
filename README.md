### 获取webgl实例
```javascript
    let canvas = document.getElementById("map");
    gl = canvas.getContext("webgl");
```

设置webgl的视口长宽    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

### 加载纹理


### Camera
webgl默认视点在原点，方向为z轴负轴
设置视点位置-》旋转平移模型操作
### Projection
image.png
test.jpeg
[photo](./test.jpeg)

### api
获取正在使用的uniform变量个数gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); 
获取uniform变量信息  gl.getActiveUniform(program, index)
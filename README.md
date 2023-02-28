### 获取webgl实例
```javascript
    let canvas = document.getElementById("map");
    gl = canvas.getContext("webgl");
```

设置webgl的视口长宽    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

### 加载纹理
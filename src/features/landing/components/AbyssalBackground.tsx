import { useEffect, useRef } from 'react';

export default function AbyssalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isReduced) {
      canvas.style.backgroundColor = '#020607';
      return;
    }

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    let animationFrameId: number;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 a0 = x - floor(x + 0.5);
        float m3 = m.x * (a0.x * x0.x + h.x * x0.y) +
                   m.y * (a0.y * x12.x + h.y * x12.y) +
                   m.z * (a0.z * x12.z + h.z * x12.w);
        return 130.0 * m3;
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;
        
        vec3 color = vec3(0.0078, 0.0235, 0.0275);
        
        float noiseScale = 1.5;
        float noise = snoise(uv * noiseScale + u_time * 0.03);
        float contour = sin(noise * 30.0 + u_time * 0.1);
        contour = smoothstep(0.95, 1.0, contour) * 0.08;
        color += vec3(0.4667, 0.8667, 0.9059) * contour;
        
        float dist = length(p);
        
        float corePulse = 0.5 + 0.5 * sin(u_time * 0.5);
        float coreGlow = smoothstep(0.4, 0.0, dist) * corePulse * 0.15;
        color += vec3(0.0941, 0.2980, 0.3490) * coreGlow;
        
        float ring = fract(dist * 5.0 - u_time * 0.2);
        float ringAlpha = (1.0 - dist) * smoothstep(0.0, 0.1, ring) * (1.0 - smoothstep(0.1, 0.2, ring)) * 0.05;
        color += vec3(0.4667, 0.8667, 0.9059) * ringAlpha;

        for(int i = 0; i < 12; i++) {
          float f = float(i);
          vec2 nodePos = vec2(sin(f * 1.5 + u_time * 0.05), cos(f * 2.3 + u_time * 0.08)) * 0.8;
          float nodeDist = length(p - nodePos);
          float nodeSize = 0.001 / (nodeDist + 0.001);
          float nodePulse = nodeSize * (0.4 + 0.6 * sin(u_time * 1.5 + f));
          color += vec3(0.4667, 0.8667, 0.9059) * nodePulse * 0.3;
        }
        
        color *= 1.1 - smoothstep(0.5, 1.8, dist);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vsShader = compileShader(gl.VERTEX_SHADER, vs);
    const fsShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vsShader || !fsShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vsShader);
    gl.attachShader(prog, fsShader);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(prog));
      return;
    }

    gl.useProgram(prog);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const render = (t: number) => {
      if (!resizeObserver) syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vsShader);
      gl.deleteShader(fsShader);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 opacity-80 pointer-events-none bg-background">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

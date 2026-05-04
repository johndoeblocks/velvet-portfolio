'use client';

import React, { useEffect, useRef } from 'react';

type ShaderBackgroundProps = {
  className?: string;
};

const VS_SOURCE = `
  attribute vec4 aVertexPosition;
  void main() {
    gl_Position = aVertexPosition;
  }
`;

const FS_SOURCE = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;

  const float overallSpeed = 0.2;
  const float gridSmoothWidth = 0.015;
  const float axisWidth = 0.05;
  const float majorLineWidth = 0.025;
  const float minorLineWidth = 0.0125;
  const float majorLineFrequency = 5.0;
  const float minorLineFrequency = 1.0;
  const vec4 gridColor = vec4(0.5);
  const float scale = 5.0;
  const vec4 lineColor = vec4(0.4, 0.2, 0.8, 1.0);
  const float minLineWidth = 0.01;
  const float maxLineWidth = 0.2;
  const float lineSpeed = 1.0 * overallSpeed;
  const float lineAmplitude = 1.0;
  const float lineFrequency = 0.2;
  const float warpSpeed = 0.2 * overallSpeed;
  const float warpFrequency = 0.5;
  const float warpAmplitude = 1.0;
  const float offsetFrequency = 0.5;
  const float offsetSpeed = 1.33 * overallSpeed;
  const float minOffsetSpread = 0.6;
  const float maxOffsetSpread = 2.0;
  const int linesPerGroup = 16;

  #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
  #define drawPeriodicLine(freq, width, t) drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

  float drawGridLines(float axis) {
    return drawCrispLine(0.0, axisWidth, axis)
          + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
          + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
  }

  float drawGrid(vec2 space) {
    return min(1.0, drawGridLines(space.x) + drawGridLines(space.y));
  }

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float horizontalFade, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec4 fragColor;
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

    float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
    float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

    vec4 lines = vec4(0.0);
    vec4 bgColor1 = vec4(0.04, 0.09, 0.08, 1.0);
    vec4 bgColor2 = vec4(0.22, 0.1, 0.34, 1.0);

    for(int l = 0; l < linesPerGroup; l++) {
      float normalizedLineIndex = float(l) / float(linesPerGroup);
      float offsetTime = iTime * offsetSpeed;
      float offsetPosition = float(l) + space.x * offsetFrequency;
      float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
      float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
      float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
      float linePosition = getPlasmaY(space.x, horizontalFade, offset);
      float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

      float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
      float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

      line = line + circle;
      lines += line * lineColor * rand;
    }

    float grid = drawGrid(space) * 0.035;
    fragColor = mix(bgColor1, bgColor2, uv.x);
    fragColor *= verticalFade;
    fragColor.a = 1.0;
    fragColor += lines;
    fragColor += grid * gridColor;

    gl_FragColor = fragColor;
  }
`;

function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error: ', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createShaderProgram(gl: WebGLRenderingContext) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, VS_SOURCE);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, FS_SOURCE);
  if (!vertexShader || !fragmentShader) return null;

  const shaderProgram = gl.createProgram();
  if (!shaderProgram) return null;

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Shader program link error: ', gl.getProgramInfoLog(shaderProgram));
    gl.deleteProgram(shaderProgram);
    return null;
  }

  return shaderProgram;
}

export default function ShaderBackground({
  className = 'fixed left-0 top-0 -z-10 h-full w-full',
}: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      failIfMajorPerformanceCaveat: true,
      powerPreference: 'low-power',
      stencil: false,
    });

    if (!gl) return;

    const shaderProgram = createShaderProgram(gl);
    if (!shaderProgram) return;

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) {
      gl.deleteProgram(shaderProgram);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0]),
      gl.STATIC_DRAW
    );

    const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    const resolution = gl.getUniformLocation(shaderProgram, 'iResolution');
    const time = gl.getUniformLocation(shaderProgram, 'iTime');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const maxPixelRatio = reducedMotion ? 1 : 1.25;

    let animationFrame = 0;
    let startTime = performance.now();
    let lastFrameTime = 0;
    let isVisible = document.visibilityState === 'visible';

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const width = Math.max(1, parent?.clientWidth || canvas.clientWidth || window.innerWidth);
      const height = Math.max(1, parent?.clientHeight || canvas.clientHeight || window.innerHeight);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
      const nextWidth = Math.floor(width * pixelRatio);
      const nextHeight = Math.floor(height * pixelRatio);

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        gl.viewport(0, 0, nextWidth, nextHeight);
      }
    };

    const draw = (elapsedSeconds: number) => {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(shaderProgram);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, elapsedSeconds);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vertexPosition);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const render = (now: number) => {
      if (!isVisible) {
        animationFrame = requestAnimationFrame(render);
        return;
      }

      if (now - lastFrameTime >= 1000 / 30) {
        resizeCanvas();
        draw((now - startTime) / 1000);
        lastFrameTime = now;
      }

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible) {
        startTime = performance.now();
      }
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    resizeCanvas();
    draw(0);

    if (!reducedMotion) {
      animationFrame = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(shaderProgram);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}

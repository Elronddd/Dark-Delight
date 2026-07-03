import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Compact 2D simplex noise (Ashima Arts / Stefan Gustavson, public domain).
const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uSpeed;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * snoise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 p = vUv * vec2(1.5, 3.0) - vec2(0.0, uTime * uSpeed);
    float n = fbm(p) * 0.5 + 0.5;
    n += fbm(p * 2.3 + 10.0) * 0.25;

    // Fade out at the very top and bottom of the plane.
    float edgeFade = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
    // Wisps stay near the vertical center horizontally.
    float horizFade = smoothstep(0.0, 0.4, vUv.x) * smoothstep(1.0, 0.6, vUv.x);

    float alpha = n * edgeFade * horizFade * uOpacity;
    gl_FragColor = vec4(uColor, clamp(alpha, 0.0, 1.0));
  }
`;

const SteamMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color("#F5EDE0"), uOpacity: 0.35, uSpeed: 0.15 },
  vertexShader,
  fragmentShader
);

extend({ SteamMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    steamMaterial: {
      ref?: React.Ref<THREE.ShaderMaterial>;
      transparent?: boolean;
      depthWrite?: boolean;
      blending?: THREE.Blending;
      uTime?: number;
      uColor?: THREE.Color | string;
      uOpacity?: number;
      uSpeed?: number;
    };
  }
}

export default SteamMaterial;

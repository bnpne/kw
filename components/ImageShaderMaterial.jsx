import { extend } from '@react-three/fiber'
import { ShaderMaterial } from 'three'

class ImageShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
      #define PI 3.1415926535897932384626433832795
      varying vec2 vUv;
      varying vec2 progress;
      uniform vec2 dimension;
      uniform vec2 offset;
      uniform vec2 viewportSizes;
      uniform float strength;
      void main() {
        vec4 newPosition = modelViewMatrix * vec4(position.x, position.y, 0.0, 1.0);

        newPosition.z += sin(newPosition.y / viewportSizes.y * PI + PI / 2.0) * -strength;

        vUv = uv;

        gl_Position = projectionMatrix * newPosition;
      }`,
      fragmentShader: `
      uniform sampler2D tex;
      uniform float alpha;
      uniform vec2 imgDim;
      uniform vec2 planeDim;
      varying vec2 vUv;

      void main() {
          vec2 ratio = vec2(
            min((planeDim.x / planeDim.y) / (imgDim.x / imgDim.y), 1.0),
            min((planeDim.y / planeDim.x) / (imgDim.y / imgDim.x), 1.0)
          );

          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );

          gl_FragColor.rgb = texture2D(tex, uv).rgb;
          gl_FragColor.a = alpha;
      }`,
      uniforms: {
        tex: { value: null },
        index: {
          value: 0,
        },
        alpha: {
          value: 0.5,
        },
        imgDim: {
          value: [1, 1],
        },
        planeDim: {
          value: [1, 1],
        },
        offset: {
          value: [0, 0],
        },
        viewportSizes: {
          value: [0, 0],
        },
        strength: {
          value: 0,
        },
      },
    })
  }

  set tex(value) {
    this.uniforms.tex.value = value
  }

  get tex() {
    return this.uniforms.tex.value
  }
  set alpha(value) {
    this.uniforms.alpha.value = value
  }

  get alpha() {
    return this.uniforms.alpha.value
  }

  get imgDim() {
    return this.uniforms.imgDim.value
  }

  set imgDim(value) {
    this.uniforms.imgDim.value = value
  }
  get planeDim() {
    return this.uniforms.planeDim.value
  }

  set planeDim(value) {
    this.uniforms.planeDim.value = value
  }

  get strength() {
    return this.uniforms.strength.value
  }

  set strength(value) {
    this.uniforms.strength.value = value
  }

  get viewportSizes() {
    return this.uniforms.viewportSizes.value
  }

  set viewportSizes(value) {
    this.uniforms.viewportSizes.value = value
  }
}

extend({ ImageShaderMaterial })

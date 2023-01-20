import { extend } from '@react-three/fiber'
import { ShaderMaterial } from 'three'

class ImageShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        u_image: { value: 0 },
      },
      fragmentShader: `
              varying vec2 v_uv;
              uniform sampler2D u_image;
              void main(){
                  vec4 img = texture2D(u_image, v_uv);
                  gl_FragColor = img;
              }`,
      vertexShader: `
              varying vec2 v_uv;
              void main(){
                  v_uv = uv;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
              }`,
    })
  }

  set tex(value) {
    this.uniforms.u_image.value = value
  }

  get tex() {
    return this.uniforms.u_image.value
  }
}

extend({ ImageShaderMaterial })

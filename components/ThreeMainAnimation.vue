<template>
  <div
      class="absolute top-0 left-0 z-10 h-full w-full"
      ref="canvas"
      @mousemove="onMouseMove"
  ></div>
</template>

<script>
import {Clock, PerspectiveCamera, Scene, WebGLRenderer} from 'three'
import * as THREE from 'three'
import TrackballControls from 'three-trackballcontrols'
import ImprovedNoise from 'improved-noise'
import {
  BloomEffect,
  EffectComposer,
  GlitchPass,
  EffectPass,
  RenderPass
} from 'postprocessing'

export default {
  data: function () {
    const scene = new THREE.Scene()
    // const composer = new THREE.EffectComposer(new WebGLRenderer())
    // const effectPass = new THREE.EffectPass(camera, new BloomEffect())
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        20000,
    );
    const renderer = new THREE.WebGLRenderer({antialias: true})
    const light = new THREE.PointLight('hsl(56,100%,50%)', 1, 5)
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({
      side: THREE.FrontSide,
      color: 0x888888,
      matalness: 1,
      roughness: 0,
      wireframe: false
    })
    const cube = new THREE.Mesh(cubeGeometry, material)
    const axes = new THREE.AxesHelper(5)
    const mouse = {
      x: 0,
      y: 0
    }
    const worldWidth = 128, worldDepth = 128, worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;;
    const data = this.generateHeight(worldWidth, worldDepth);
    const worldGeometry = new THREE.PlaneBufferGeometry(7500, 7500, worldWidth - 1, worldDepth - 1);
    const vertices = worldGeometry.attributes.position.array;
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()

    return {
      scene: scene,
      camera: camera,
      controls: [],
      renderer: renderer,
      light: light,
      cube: cube,
      axes: axes,
      speed: 0.01,
      mouse: mouse,
      worldWidth: worldWidth,
      worldDepth: worldDepth,
      worldHalfWidth: worldHalfWidth,
      worldHalfDepth: worldHalfDepth,
      worldData: data,
      worldGeometry: worldGeometry,
      vertices: vertices,
      raycaster: raycaster,
      pointer: pointer,
    }
  },
  created: function () {
    this.scene.add(this.camera)
    this.scene.add(this.light)
    this.scene.add(this.cube)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.light.position.set(0, 0, 2)
    this.camera.position.z = 0
    this.scene.background = new THREE.Color("rgb(10, 10, 10)")
    this.scene.fog = new THREE.FogExp2(new THREE.Color("rgb(255, 255, 255)"), 0.00031);
    this.controls = new TrackballControls(this.camera)
    this.controls.rotateSpeed = 1.0
    this.controls.zoomSpeed = 5
    this.controls.panSpeed = 0.8
    this.controls.noZoom = true
    this.controls.noPan = true
    this.controls.staticMoving = true
    this.controls.dynamicDampingFactor = 0.3
    this.controls.target.y = this.worldData[ this.worldHalfWidth + this.worldHalfDepth * this.worldWidth ] + 500;
    this.camera.position.y = this.controls.target.y + 500;
    this.worldGeometry.rotateX(-Math.PI / 2);

    for (let i = 0, j = 0, l = this.vertices.length; i < l; i++, j += 3) {
      this.vertices[j + 1] = this.worldData[i] * 10;
    }

    let worldMesh = new THREE.Mesh(
        this.worldGeometry,
        new THREE.MeshPhysicalMaterial(
            {
              wireframe: true,
              color: new THREE.Color('#000'),
              roughness: .5,
              reflectivity: .5,
              thickness: 2,
            }
        ) );
    this.scene.add(worldMesh)
    window.addEventListener('resize', this.onResize)
  },
  mounted: function () {
    this.$refs.canvas.appendChild(this.renderer.domElement)
    this.animate()
  },
  methods: {
    animate: function () {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
      this.cube.rotation.y += this.speed
    },
    onMouseMove: function (e) {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      let vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
      vector.unproject(this.camera);
      let dir = vector.sub(this.camera.position).normalize();
      let distance = -this.camera.position.z / dir.z;
      let pos = this.camera.position.clone().add(dir.multiplyScalar(distance));

      this.light.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z + 2));
    },
    onResize: function () {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.renderer.setSize( window.innerWidth, window.innerHeight );
    },
    generateHeight: function (width, height) {
      let seed = Math.PI / 2;
      window.Math.random = function () {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };

      const size = width * height, data = new Uint8Array(size);
      const perlin = new ImprovedNoise(), z = Math.random() * 100;

      let quality = 2;

      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < size; i++) {
          const x = i % width, y = ~~(i / width);
          data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 2);
        }
        quality *= 5;
      }

      return data;
    },
    generateTexture: function (data, width, height) {

      let context, image, imageData, shade;

      const vector3 = new THREE.Vector3(0, 0, 0);

      const sun = new THREE.Vector3(1, 1, 1);
      sun.normalize();

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      context = canvas.getContext('2d');
      context.fillStyle = '#000';
      context.fillRect(0, 0, width, height);

      image = context.getImageData(0, 0, canvas.width, canvas.height);
      imageData = image.data;

      for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {

        vector3.x = data[j - 2] - data[j + 2];
        vector3.y = 2;
        vector3.z = data[j - width * 2] - data[j + width * 2];
        vector3.normalize();

        shade = vector3.dot(sun);

        imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
        imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
        imageData[i + 2] = (shade * 96) * (0.5 + data[j] * 0.007);

      }

      context.putImageData(image, 0, 0);

      // Scaled 4x

      const canvasScaled = document.createElement('canvas');
      canvasScaled.width = width * 4;
      canvasScaled.height = height * 4;

      context = canvasScaled.getContext('2d');
      context.scale(4, 4);
      context.drawImage(canvas, 0, 0);

      image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
      imageData = image.data;

      for (let i = 0, l = imageData.length; i < l; i += 4) {

        const v = ~~(Math.random() * 5);

        imageData[i] += v;
        imageData[i + 1] += v;
        imageData[i + 2] += v;

      }

      context.putImageData(image, 0, 0);

      return canvasScaled;

    }

  },
  computed: {
    rotate: function () {
      if (this.speed === '') {
        return 0
      } else {
        return this.speed
      }
    }
  }
}
</script>
<template>
  <div>
    <div
        class="absolute top-0 left-0 z-10 h-full w-full"
        ref="canvas"
        @mousemove="onMouseMove"
        v-on:moonClick="setColors"
    ></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import TrackballControls from 'three-trackballcontrols'
import ImprovedNoise from 'improved-noise'
import * as TWEEN from '@tweenjs/tween.js'

export default {
  data: function () {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        3000,
    );
    const renderer = new THREE.WebGLRenderer({antialias: true}),
        light = new THREE.PointLight('hsl(56,100%,50%)', 1, 100, 2),
        mouse = new THREE.Vector2(),
        worldWidth = 56,
        worldDepth = 56,
        worldHalfWidth = worldWidth / 2,
        worldHalfDepth = worldDepth / 2,
        data = this.generateHeight(worldWidth, worldDepth),
        worldGeometry = new THREE.PlaneBufferGeometry(3000, 3000, worldWidth - 1, worldDepth - 1),
        vertices = worldGeometry.attributes.position.array,
        raycaster = new THREE.Raycaster(),
        pointer = new THREE.Vector2(),
        clock = new THREE.Clock(),
        sphereGeometry = new THREE.SphereBufferGeometry(4, 16, 16),
        sphereMaterial = new THREE.MeshBasicMaterial({color: 0xffff00}),
        sphere = new THREE.Mesh(sphereGeometry, sphereMaterial),
        planeGeometry = new THREE.PlaneBufferGeometry(10000, 10000, worldWidth - 1, worldDepth - 1),
        planeMaterial = new THREE.MeshBasicMaterial({
          side: THREE.FrontSide,
          opacity: 0,
          transparent: 1,
        }),
        plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // Moon
    const moonGeometry = new THREE.SphereGeometry( 300,60,60 )
    const textureLoader = new THREE.TextureLoader()
    const moonTexture = textureLoader.load("/jpg/moon_texture.jpg")
    const moonDisplacementMap = textureLoader.load("/jpg/moon_displacement.jpg")
    const moonMaterial = new THREE.MeshPhongMaterial (
        { color: 0xffffff ,
          map: moonTexture ,
          displacementMap: moonDisplacementMap,
          displacementScale: 0.06,
          bumpMap: moonDisplacementMap,
          bumpScale: 0.04,
          reflectivity:0,
          shininess :0
        })
    const moon = new THREE.Mesh(moonGeometry, moonMaterial)
    const moonLight = new THREE.DirectionalLight(0xFFFFFF, 0.75)

    return {
      scene: scene,
      camera: camera,
      controls: [],
      renderer: renderer,
      light: light,
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
      sphereGeometry: sphereGeometry,
      sphereMaterial: sphereMaterial,
      sphere: sphere,
      planeGeometry: planeGeometry,
      planeMaterial: planeMaterial,
      plane: plane,
      clock: clock,
      textureLoader: textureLoader,
      moonGeometry: moonGeometry,
      moon: moon,
      moonLight: moonLight,
    }
  },
  created: function () {
    this.scene.add(this.camera)
    this.scene.add(this.light)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.light.position.set(800, 800, 300)
    this.scene.background = new THREE.Color(this.colors.background)
    this.scene.fog = new THREE.FogExp2(new THREE.Color("rgb(220,220,220)"), 0.00051);
    this.controls = new TrackballControls(this.camera)
    this.controls.rotateSpeed = 1.0
    this.controls.zoomSpeed = 5
    this.controls.panSpeed = 0.8
    this.controls.noZoom = true
    this.controls.noPan = true
    this.controls.staticMoving = true
    this.controls.dynamicDampingFactor = 0.3
    this.controls.target.y = this.worldData[this.worldHalfWidth + this.worldHalfDepth * this.worldWidth] + 500;
    this.camera.position.y = this.controls.target.y - 50;
    this.camera.position.x = this.controls.target.x - 100;
    this.camera.position.z = 500;

    this.worldGeometry.rotateX(-Math.PI / 2);
    for (let i = 0, j = 0, l = this.vertices.length; i < l; i++, j += 3) {
      this.vertices[j + 1] = this.worldData[i] * 10;
    }

    const worldMesh = new THREE.Mesh(
        this.worldGeometry,
        new THREE.MeshPhysicalMaterial(
            {
              wireframe: true,
              roughness: .5,
              reflectivity: .5,
              thickness: 1,
            }
        ));

    const worldMeshCopy = new THREE.Mesh(
        this.worldGeometry,
        new THREE.MeshBasicMaterial(
            {
              opacity: 0,
              transparent: 1,
            }
        )
    )

    this.worldMeshCopy = worldMeshCopy
    this.scene.add(this.plane);
    const planePos = new THREE.Vector3(0,0,-2000)
    this.plane.position.copy(planePos)

    this.scene.add(worldMesh)
    this.scene.add(this.worldMeshCopy)

    worldMeshCopy.position.y += 10;

    this.scene.add(this.sphere);

    const moonPos = new THREE.Vector3(0,800,-1500)
    const moonLightPos = new THREE.Vector3(-500,1000,-1100)
    this.scene.add(this.moon)
    this.scene.add(this.moonLight)
    this.moon.position.copy(moonPos)
    this.moonLight.position.copy(moonLightPos)
    this.moonLight.target = this.moon
  },
  mounted: function () {
    this.$refs.canvas.appendChild(this.renderer.domElement)
    this.animate()
    window.addEventListener('resize', this.onResize)
    this.setColors()
  },
  methods: {
    animate: function () {
      requestAnimationFrame(this.animate)
      this.moon.rotation.y += 0.0005
      //this.moon.rotation.y += 0.0001
      this.render()
    },
    render: function () {

      const intersects = this.raycaster.intersectObjects([this.worldMeshCopy, this.plane]);
      this.checkIntersects(intersects)

      this.renderer.render(this.scene, this.camera)
    },
    checkIntersects: function (intersects) {
      this.raycaster.setFromCamera(this.mouse, this.camera)
      if (intersects.length > 0) {
        this.light.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);

        new TWEEN.Tween(this.sphere.position).to(
            this.sphere.position
                .setX(intersects[0].point.x)
                .setY(intersects[0].point.y)
                .setZ(intersects[0].point.z), 200
        ).start()

      }
    },
    onMouseMove: function (e) {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    onResize: function () {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    generateHeight: function (width, height) {
      let seed = Math.PI / 2,
          quality = 1;
      window.Math.random = function () {
        const x = Math.sin(seed++) * 2000;
        return x - Math.floor(x);
      };

      const perlin = new ImprovedNoise(),
          size = width * height, data = new Uint8Array(size),
          z = Math.random() * 100;

      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < size; i++) {
          const x = i % width, y = ~~(i / width);
          data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 2);
        }
        quality *= 5;
      }

      return data;
    },
    setColors: function () {
      this.scene.background.set(this.colors.background)
      this.plane.material.color.set(this.colors.background)
      this.sphere.material.color.set(this.colors.accent)
      this.light.color.set(this.colors.accent)

      if (this.theme === 'light') {
        this.scene.fog.density = 0
      } else {
        this.scene.fog.density = 0
      }
    },

  },
  computed: {
    theme: function () {
      return this.$store.state.theme
    },
    colors: function () {
      return this.$store.state.colors[this.theme]
    },
    rotate: function () {
      if (this.speed === '') {
        return 0
      } else {
        return this.speed
      }
    }
  },
  watch: {
    colors: function () {
      this.setColors()
    },
    theme: function () {
      document.documentElement.classList = []
      document.documentElement.classList.add(this.theme)
    },
  },
}
</script>
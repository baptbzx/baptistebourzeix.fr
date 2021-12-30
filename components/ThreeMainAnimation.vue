<template>
  <div
      class="absolute top-0 left-0 z-10 h-full w-full"
      ref="canvas"
      @mousemove="onMouseMove"
  ></div>
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
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000,
    );
    const renderer = new THREE.WebGLRenderer({antialias: true})
    const light = new THREE.PointLight('hsl(56,100%,50%)', 1, 100, 2)
    const axes = new THREE.AxesHelper(5)
    const mouse = {
      x: 0,
      y: 0
    }
    const worldWidth = 14, worldDepth = 18, worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;;
    const data = this.generateHeight(worldWidth, worldDepth);
    const worldGeometry = new THREE.PlaneBufferGeometry(600, 800, worldWidth - 1, worldDepth - 1);
    const vertices = worldGeometry.attributes.position.array;
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const sphereGeometry = new THREE.SphereBufferGeometry( 2, 8, 8 );
    const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    const planeGeometry = new THREE.PlaneBufferGeometry( window.innerWidth * 1.75, window.innerHeight * 1.75, worldWidth - 1, worldDepth - 1 );
    const planeMaterial = new THREE.MeshBasicMaterial( {side: THREE.FrontSide, opacity: 0, transparent: 1,} );
    const plane = new THREE.Mesh( planeGeometry, planeMaterial );

    return {
      scene: scene,
      camera: camera,
      controls: [],
      renderer: renderer,
      light: light,
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
      sphereGeometry: sphereGeometry,
      sphereMaterial: sphereMaterial,
      sphere: sphere,
      planeGeometry: planeGeometry,
      planeMaterial: planeMaterial,
      plane: plane,
    }
  },
  created: function () {
    this.scene.add(this.camera)
    this.scene.add(this.light)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.light.position.set(800, 800, 300)
    this.scene.background = new THREE.Color("rgb(10,10,10)")
    this.scene.fog = new THREE.FogExp2(new THREE.Color("rgb(220,220,220)"), 0.00101);
    this.controls = new TrackballControls(this.camera)
    this.controls.rotateSpeed = 1.0
    this.controls.zoomSpeed = 5
    this.controls.panSpeed = 0.8
    this.controls.noZoom = true
    this.controls.noPan = true
    this.controls.staticMoving = true
    this.controls.dynamicDampingFactor = 0.3
    this.controls.target.y = this.worldData[ this.worldHalfWidth + this.worldHalfDepth * this.worldWidth ] + 500;
    this.camera.position.y = this.controls.target.y - 350;
    this.camera.position.z = 500;

    this.worldGeometry.rotateX(-Math.PI / 2);
    console.log('vertices::length', this.vertices.length)
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
              thickness: 2,
            }
        ) );

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


    this.scene.add(worldMesh)
    this.scene.add(this.worldMeshCopy)

    worldMeshCopy.position.y += 5;

    this.scene.add( this.sphere );

    this.scene.add( this.plane );
    this.plane.position.z = -400;
    this.plane.position.y = this.camera.position.y;
  },
  mounted: function () {
    this.$refs.canvas.appendChild(this.renderer.domElement)
    this.animate()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    animate: function () {
      requestAnimationFrame(this.animate)
      this.render()
    },
    render: function() {

      const intersects = this.raycaster.intersectObjects( [this.worldMeshCopy, this.plane] );
      this.checkIntersects(intersects)

      this.renderer.render(this.scene, this.camera)
    },
    checkIntersects: function (intersects) {
      if (intersects.length > 0) {
        //this.sphere.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);
        this.light.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);
        this.raycaster.setFromCamera(this.mouse, this.camera)

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
      this.mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    },
    onResize: function () {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix()
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

      let quality = 1;

      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < size; i++) {
          const x = i % width, y = ~~(i / width);
          data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 2);
        }
        quality *= 5;
      }

      return data;
    },
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
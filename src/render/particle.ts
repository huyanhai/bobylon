import { AssetsManager, MeshBuilder, NodeMaterial, ParticleSystem, SolidParticleSystem, Texture, SolidParticle, PointsCloudSystem, PointColor, Color4 } from "babylonjs";
import { Render } from ".";

export class Particle {
  static renderParticle(render: Render) {
    const box = MeshBuilder.CreateBox("box", {});
    // 名称、数量、场景
    const particles = new ParticleSystem("particles", 2000, render.scene);
    particles.particleTexture = new Texture("textures/flare.png");
    particles.emitter = box;
    // particles.minSize = 0.1;
    // particles.maxSize = 1;

    // 起始位置0.1，结束位置0.8
    particles.addSizeGradient(0, 0.1, 0.4); // 0.1和0.4之间随机切换
    particles.addSizeGradient(1, 0.8);

    // 粒子颜色控制
    // particles.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    // particles.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    // particles.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0); // 消失的时候的颜色

    // 渐变色
    particles.addColorGradient(0, new BABYLON.Color4(1, 1, 1, 0), new BABYLON.Color4(1, 0, 1, 0));
    particles.addColorGradient(1.0, new BABYLON.Color4(1, 1, 1, 1), new BABYLON.Color4(1, 0, 1, 1));

    // 发射评率
    particles.emitRate = 100;

    particles.start();
  }

  static renderSPS(render: Render) {
    Particle.loadAssets(render);
  }

  static renderMaterial(render: Render, material: NodeMaterial) {
    // useModelMaterial 开启材质渲染
    // isPickable是否可以被选中
    const sps = new SolidParticleSystem("sps", render.scene, { useModelMaterial: true, isPickable: true, particleIntersection: true });
    const s = MeshBuilder.CreateSphere("s", {});
    const p = MeshBuilder.CreatePolyhedron("s", { type: 2 });

    // 添加材质
    s.material = material;
    p.material = material;

    sps.addShape(s, 20);
    sps.addShape(p, 50);

    // 隐藏
    s.dispose();
    p.dispose();

    // 显示sps网格
    const mesh = sps.buildMesh();

    sps.initParticles = () => {
      // sps.nbParticles sps中粒子数量

      for (let p = 0; p < sps.nbParticles; p++) {
        const particle = sps.particles[p]; // 单个粒子对象
        particle.position.x = BABYLON.Scalar.RandomRange(-50, 50);
        particle.position.y = BABYLON.Scalar.RandomRange(-50, 50);
        particle.position.z = BABYLON.Scalar.RandomRange(-50, 50);

        const angle = BABYLON.Scalar.RandomRange(-Math.PI, Math.PI);
        const range = BABYLON.Scalar.RandomRange(10, 100);
        particle.props = { angle: angle, range: range }; // 给属性上面绑定数据

        particle.color = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
      }
    };

    sps.updateParticle = (particle) => {
      // particle.props.angle += Math.PI / 100;
      // particle.position.y = particle.props.range * (1 + Math.cos(particle.props.angle));
    };

    sps.initParticles();
    sps.setParticles();
    sps.refreshVisibleSize();

    sps.billboard = true;

    let theta = 0;
    render.scene.onBeforeRenderObservable.add(() => {
      sps.setParticles();
      //   theta += Math.PI / 1000;
      //   mesh.rotation.y = theta;
    });

    // 选中粒子
    render.scene.onPointerDown = function (e, pickResult) {
      const pickId = pickResult.faceId;
      if (pickId > 0) {
        const picked = sps.pickedParticle(pickResult);
        var idx = picked!.idx;
        var p: SolidParticle = sps.particles[idx]; // get the actual picked particle
        p.color.r = 1; // turn it red
        p.color.b = 0;
        p.color.g = 0;

        p.velocity.y = -1; // drop it
        sps.setParticles();
      }
    };
  }

  static loadAssets(render: Render) {
    const manager = new AssetsManager(render.scene);
    const jsonStr = manager.addTextFileTask("load_texture", "https://patrickryanms.github.io/BabylonJStextures/Demos/sps/assets/shaders/particleNme.json");
    manager.load();

    manager.onFinish = function (tasks) {
      const material = NodeMaterial.Parse(JSON.parse(jsonStr.text), render.scene);
      material.build(false);
      Particle.renderMaterial(render, material);
    };
  }

  static renderCloudSystem(render: Render) {
    const pcs = new PointsCloudSystem("pcs", 1, render.scene);

    const faceColors = [new Color4(1, 1, 1, 1), new Color4(1, 0, 1, 1), new Color4(1, 1, 0, 1), new Color4(1, 0, 0, 1), new Color4(0.5, 0, 0, 1), new Color4(0.5, 0.6, 0, 1)];
    const box = MeshBuilder.CreateBox("box", { size: 1, faceColors: faceColors }, render.scene);

    pcs.addSurfacePoints(box, 1000, PointColor.Color);

    pcs.buildMeshAsync().then(() => {
      box.dispose();
    });
  }
}

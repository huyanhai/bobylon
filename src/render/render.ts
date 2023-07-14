import { Scene, Engine, Camera, Vector3, HemisphericLight, Light, ArcRotateCamera, UniversalCamera, FollowCamera, FreeCamera } from "babylonjs";

export class Render {
  public engine!: Engine;
  public scene!: Scene;
  public camera!: Camera;
  public light!: Light;
  constructor(el: HTMLCanvasElement) {
    this.engine = new Engine(el);
    this.scene = new Scene(this.engine);

    // 引力场
    this.scene.gravity = new Vector3(0, -10, 0);
    // 开启碰撞
    this.scene.collisionsEnabled = true;

    this.renderCamera(el);
    this.renderLight();
  }

  // 相机
  renderCamera(el: HTMLCanvasElement) {
    // 通用相机
    // this.camera = new UniversalCamera("camera", new Vector3(0, 0, -20), this.scene);

    // 圆弧相机
    this.camera = new FreeCamera("camera", new Vector3(0, 5, -10), this.scene);

    this.camera.setTarget(Vector3.Zero());

    // 跟随相机
    // this.camera = new FollowCamera("camera", new Vector3(0, 0, 0), this.scene);

    this.camera.attachControl(el, true);

    (this.camera as any).applyGravity = true;
    (this.camera as any).ellipsoid = new Vector3(1, 1, 1);
  }

  // 灯光
  renderLight() {
    this.light = new HemisphericLight("light", new Vector3(0, 10, 1), this.scene);

    // 开关灯
    this.light.setEnabled(true);
    // 灯光强度
    this.light.intensity = 0.7;
  }

  render() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener(
      "resize",
      (() => {
        this.engine.resize();
      }).bind(this)
    );
  }
}

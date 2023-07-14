import { Color3, Mesh, MeshBuilder, StandardMaterial, Texture, Vector3, Vector4 } from "babylonjs";
import { Render } from ".";

// 方形
export class Box {
  // Color3 rgb
  // Color4 rgba
  static renderBox(render: Render) {
    const line = MeshBuilder.CreateLines(
      "lines",
      {
        points: [new Vector3(0, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 1, 1)],
      },
      render.scene
    );

    // 物体旋转
    // line
    //   .addRotation(Math.PI / 5, 0, 0)
    //   .addRotation(0, Math.PI / 2, 0)
    //   .addRotation(0, 0, Math.PI / 4);
    const box = MeshBuilder.CreateBox("box", { width: 5, height: 5, depth: 1, faceUV: [new Vector4(1, 1, 1, 1)] }, render.scene);
    const point = MeshBuilder.CreateBox("box1", { size: 0.1 }, render.scene);

    point.position.z = 0.5;
    // 创建材质
    const myMaterial = new StandardMaterial("myMaterial", render.scene);

    // 开启网格
    // myMaterial.wireframe = true;

    myMaterial.diffuseColor = new Color3(1, 0, 0); // 漫反射
    myMaterial.specularColor = new Color3(0, 1, 0); // 镜面反射
    myMaterial.emissiveColor = new Color3(0, 0, 1); // 自发光
    myMaterial.ambientColor = new Color3(1, 1, 0); // 环境光

    // myMaterial.diffuseTexture = new Texture("", render.scene); // 纹理贴图

    point.material = myMaterial;

    Box.animation(box);

    box.checkCollisions = true;
    render.camera.checkCollisions = true;

    // render.scene.beginAnimation(box, 0, 100, true);

    // render.scene.beginWeightedAnimation(box, 0, 89, 1.0, true);

    window.addEventListener("click", function () {
      var pick = render.scene.pick(render.scene.pointerX, render.scene.pointerY);
      // 是否命中物体
      if (pick.hit) {
        // 色孩子point在box表面的位置
        point.position.x = pick.pickedPoint?.x || point.position.x;
        point.position.y = pick.pickedPoint?.y || point.position.y;

        const face = pick.pickedMesh?.getIndices();

        const index1 = face && face[pick.faceId * 3];
        const index2 = face && face[pick.faceId * 3 + 1];
        const index3 = face && face[pick.faceId * 3 + 2];

        console.log(index1, index2, index3);
      }
    });
  }

  static animation(box: Mesh) {
    // 参数1 - 动画的名称;
    // 参数2 - 这个与对象的属性相关，可以是任何物体的属性，具体取决于需要更新的内容，上例中我们要在X轴的方向缩放 Box1，所以这里设置为 scaling.x 。
    // 参数3 - 每秒请求的帧数：动画中可能达到的最高FPS。
    // 参数4 - 数值变化类型。根据参数3的配置，决定要修改的值类型：浮点数（例如x轴位置Position.x），矢量（例如位置Position）还是四元数(例如旋转rotationQuaternion)。 确切的值是：
    // 浮点数：BABYLON.Animation.ANIMATIONTYPE_FLOAT
    // 二维向量：BABYLON.Animation.ANIMATIONTYPE_VECTOR2
    // 三维向量：BABYLON.Animation.ANIMATIONTYPE_VECTOR3
    // 四元数：BABYLON.Animation.ANIMATIONTYPE_QUATERNION
    // 矩阵：BABYLON.Animation.ANIMATIONTYPE_MATRIX
    // 颜色：BABYLON.Animation.ANIMATIONTYPE_COLOR3
    // 参数5 - 动画的在执行完一个周期后，需要执行的行为模式，例如继续运动、从头开始执行还是立即停止，可选三种模式：
    // 相对，相对运动，即：执行完一次，在接着最后的状态，继续执行：BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
    // 循环，动画循环执行，即：执行完一次，从头开始再执行：BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    // 常量，动画执行一次就停止不动了：BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    // const animationBox = new BABYLON.Animation("myAnimation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    // // keys中的frame有顺序要求，必须是升序。
    // const keys = [
    //   {
    //     frame: 0,
    //     value: 1,
    //   },
    //   {
    //     frame: 50,
    //     value: 2,
    //   },
    //   {
    //     frame: 100,
    //     value: 3,
    //   },
    // ];
    // // 把之前定义的keys动画组加入到Animation对象中
    // animationBox.setKeys(keys);
    // box.animations = [];
    // box.animations.push(animationBox as any);
    // const overrides = new BABYLON.AnimationPropertiesOverride();
    // overrides.enableBlending = true;
    // overrides.blendingSpeed = 1.0;
    // box.animationPropertiesOverride = overrides;
    // 创建动画
    // BABYLON.Animation.CreateAndStartAnimation("boxscale", box, "scaling.x", 30, 120, 1.0, 1.5);
  }
}

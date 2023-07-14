import { Color4, MeshBuilder, Vector4 } from "babylonjs";
import { Render } from ".";

// 球体
export class Sphere {
  static renderSphere(render: Render) {
    MeshBuilder.CreateSphere(
      "sphere",
      {
        segments: 10, // 分段数
        diameter: 1, // 直径 diameterX、diameterY、diameterZ
        arc: 0.5, // 半圆，沿Y轴切
        slice: 1, // 半圆，沿X轴切
      },
      render.scene
    );
  }
}

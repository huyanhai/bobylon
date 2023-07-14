import { MeshBuilder } from "babylonjs";
import { Render } from ".";

// 平面
export class Plane {
  static renderPlane(render: Render) {
    const plane = MeshBuilder.CreatePlane(
      "plane",
      {
        size: 1, // 平面长度和高度，统一都是这个值
        height: 10, // 单独设置高度Y，覆盖size的高度
        width: 10, // 单独设置长度X，覆盖size的高度
      },
      render.scene
    );

    // plane.rotation.x = Math.PI / 2;
    plane.rotation.y = Math.PI / 2;
    // plane.rotation.z = Math.PI / 2;
  }
}

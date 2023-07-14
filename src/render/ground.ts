import { MeshBuilder } from "babylonjs";
import { Render } from ".";

// 地面
export class Ground {
  static renderGround(render: Render) {
    MeshBuilder.CreateGround(
      "ground",
      {
        height: 1, // 单独设置高度Y，覆盖size的高度
        width: 1, // 单独设置长度X，覆盖size的高度
        subdivisions: 10, // 细分
      },
      render.scene
    );
  }
}

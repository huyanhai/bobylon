import { Sprite, SpriteManager } from "babylonjs";
import { Render } from ".";

export class Texture {
  static renderTexure(render: Render) {
    const treeTexture = new SpriteManager("treeTexture", "textures/player.png", 3, 64, render.scene);
    const tree = new Sprite("tree", treeTexture);

    // 从0到43帧的顺序播放动画。第三个参数是指动画是否循环播放，true为循环。最后一个参数表示播放速度，值越小，动画播放速度越快
    tree.playAnimation(0, 40, true, 100);

    // tree.width = 1;
    // tree.height = 2;

    // 是否可以被选中
    treeTexture.isPickable = true;
    tree.isPickable = true;

    render.scene.onPointerDown = function () {
      var pickResult = render.scene.pickSprite(this.pointerX, this.pointerY);
      if (pickResult?.hit) {
        pickResult.pickedSprite!.position.x += 0.5;
      }
    };
  }
}

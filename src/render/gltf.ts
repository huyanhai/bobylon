import { KeyboardEventTypes, SceneLoader } from "babylonjs";
import { Render } from ".";
import "babylonjs-loaders";
export class Gltf {
  static renderGltf(render: Render) {
    SceneLoader.Append("https://www.babylonjs.com/Assets/DamagedHelmet/glTF/", "DamagedHelmet.gltf", render.scene, (gltf) => {
    });

    render.scene.onKeyboardObservable.add((keyInfo)=>{
    switch (keyInfo.type) {
      case KeyboardEventTypes.KEYDOWN:
        console.log(keyInfo.event.key)
        break;
    
      default:
        break;
    }
    
    })

    // SceneLoader.Append("", "modules/test.gltf");
  }
}

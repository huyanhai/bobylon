
import { SceneLoader } from "babylonjs";
import { Render } from ".";
import "@babylonjs/loaders/glTF";


export class Gltf {
  static renderGltf(render: Render) {
    // BABYLON.SceneLoader.Append("", "https://www.babylonjs.com/Assets/DamagedHelmet/glTF/DamagedHelmet.gltf");
    BABYLON.SceneLoader.Append("","modules/test.gltf",render.scene,(gltf)=>{
    console.log(gltf);
    
    });
  }
}

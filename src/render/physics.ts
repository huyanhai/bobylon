import { HavokPlugin, MeshBuilder, PhysicsAggregate, PhysicsShapeType, Vector3 } from "babylonjs";
import HavokPhysics from "@babylonjs/havok";
import { Render } from ".";

export class Physics {
  static async renderPhysics(render: Render) {
    const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, render.scene);
    const box = MeshBuilder.CreateBox("box", { size: 2 }, render.scene);
    box.position.y = 5;

    const havokInstance = await HavokPhysics();

    const hk = new HavokPlugin(true, havokInstance);

    render.scene.enablePhysics(new Vector3(0, -10, 0), hk);

    new PhysicsAggregate(box, PhysicsShapeType.BOX, { mass: 0.1, restitution: 0 }, render.scene);
    new PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, render.scene);
  }
}

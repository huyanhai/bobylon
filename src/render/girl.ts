import { ActionManager, ExecuteCodeAction, SceneLoader, ActionEvent, Vector3 } from "babylonjs";
import { Render } from ".";

export class Girl {
  static renderGirl(render: Render) {
    const inputMap: any = {};
    render.scene.actionManager = new ActionManager(render.scene);
    render.scene.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, function (e: ActionEvent) {
        inputMap[e.sourceEvent.key] = e.sourceEvent.type == "keydown";
      })
    );

    render.scene.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, function (e: ActionEvent) {
          inputMap[e.sourceEvent.key] = e.sourceEvent.type == "keydown";
        })
      );

    SceneLoader.ImportMesh("", "modules/", "HVGirl.glb", render.scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
      const girl = newMeshes[0];
      // 移动距离
      let heroSpeed = 0.03;
      let heroSpeedBackwards = 0.01;
      let heroRotationSpeed = 0.1;

      let animating = false;

      girl.scaling.scaleInPlace(0.1);

      const walkAnim = render.scene.getAnimationGroupByName("Walking")!;
      const walkBackAnim = render.scene.getAnimationGroupByName("WalkingBack")!;
      const idleAnim = render.scene.getAnimationGroupByName("Idle")!;
      const sambaAnim = render.scene.getAnimationGroupByName("Samba")!;

      //   sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
      // 停止模型运动
      //   sambaAnim.stop();

      render.scene.onBeforeRenderObservable.add(() => {
        let keydown = false;
        if (inputMap["w"]) {
          girl.moveWithCollisions(girl.forward.scaleInPlace(heroSpeed));
          keydown = true;
        }
        if (inputMap["s"]) {
          girl.moveWithCollisions(girl.forward.scaleInPlace(-heroSpeedBackwards));
          keydown = true;
        }
        if (inputMap["a"]) {
          girl.rotate(Vector3.Up(), -heroRotationSpeed);
          keydown = true;
        }
        if (inputMap["d"]) {
          girl.rotate(Vector3.Up(), heroRotationSpeed);
          keydown = true;
        }
        if (inputMap["b"]) {
          keydown = true;
        }

        if (keydown) {
          if (!animating) {
            animating = true;
            if (inputMap["s"]) {
              walkBackAnim.start(true, 1.0, walkBackAnim.from, walkBackAnim.to, false);
            } else if (inputMap["b"]) {
              sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
            } else {
              walkAnim.start(true, 1.0, walkAnim.from, walkAnim.to, false);
            }
          }
        } else {
          if (animating) {
            idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);

            //Stop all animations besides Idle Anim when no key is down
            sambaAnim.stop();
            walkAnim.stop();
            walkBackAnim.stop();

            //Ensure animation are played only once per rendering loop
            animating = false;
          }
        }
      });
    });
  }
}

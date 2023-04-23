import { Behaviour, Renderer, delay, serializable } from "@needle-tools/engine";
import { Material } from "three";
import { Component } from "@needle-tools/engine"

export class ChangeMaterial extends Behaviour {


    @serializable(Material)
    material?: Material;


    async start() {
        await delay(1000);
        const orig = this.gameObject!.getComponent(Renderer)!.sharedMaterials[0];
        let i = 0;
        setInterval(() => {
            if (this.material) {
                this.gameObject!.getComponent(Renderer)!.sharedMaterials[0] = i++ % 2 === 0 ? this.material : orig;
            }
        }, Math.random() * 500 + 500)
    }

}

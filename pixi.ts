import { Application } from 'pixi.js';
import '@pixi/events';
import "../style/style.css";
import * as PIXI from 'pixi.js';

const containerEl = document.getElementById("container");

const loadingApp = new Application<HTMLCanvasElement>({
  width: window.innerWidth / 2 + 200,
  height: window.innerHeight - 200,
  resolution: 1,
  autoDensity: false,
  antialias: true,
  background: 1118481
})
const loadingContainer = new PIXI.Container();
containerEl.appendChild(loadingApp.view);
loadingApp.stage.addChild(loadingContainer);

class RenderLoading {
  private loadingGraphics: PIXI.Graphics = new PIXI.Graphics();
  private loadingText = new PIXI.Text("Loading", {
    fontSize: 30,
    fill: 16777215
  });

  private minLoadingPercent: number = 0;
  private maxLoadingPercent: number = 100;

  private loadingGraphics_x: number = loadingApp.screen.width / 2 - 250;
  private loadingGraphics_y: number = loadingApp.screen.height / 2;

  private loadingGraphics_height: number = 5;
  private loadingGraphicsPercent_width: number = 0;
  private maxLoadingGraphicsPercent_width: number = 500;

  private loadingText_x: number = loadingApp.screen.width / 2 - 100;
  private loadingText_y: number = loadingApp.screen.height / 2 + 30;

  constructor() {
  }

  public updateItemsStatus() {

    if (this.loadingGraphicsPercent_width < this.maxLoadingGraphicsPercent_width) {
      this.loadingGraphicsPercent_width += 2;
    } else {
      this.loadingGraphicsPercent_width = this.maxLoadingGraphicsPercent_width;
    }

    if (this.minLoadingPercent < this.maxLoadingPercent) {
      this.minLoadingPercent = Math.floor(this.loadingGraphicsPercent_width / 5);
      this.loadingText.text = `Loading ${this.minLoadingPercent} %`;
    }

    this.drawHeaderLoadingAndText();
  }

  protected drawHeaderLoadingAndText () {

    this.loadingGraphics.beginFill(16777215, 0.25);
    this.loadingGraphics.drawRoundedRect(this.loadingGraphics_x, this.loadingGraphics_y, this.loadingGraphicsPercent_width, this.loadingGraphics_height, 10);
    this.loadingGraphics.endFill();

    // Types error
    this.loadingGraphics.eventMode = 'dynamic';

    this.loadingText.x = this.loadingText_x;
    this.loadingText.y = this.loadingText_y;

    // Types error
    this.loadingText.eventMode = 'dynamic';
    //// Types error

    this.loadingText.on("pointerdown", (ev) => {
      console.log(ev);
    })

    loadingContainer.addChild(this.loadingText);
    loadingContainer.addChild(this.loadingGraphics);
  }
}

let loadingRenderer: RenderLoading;
function initLoading () {
  loadingRenderer = new RenderLoading();
}

function animate () {
  const g = requestAnimationFrame(animate);
  loadingRenderer.updateItemsStatus();
  if (g > 2000) {
    cancelAnimationFrame(g);
  }
}
initLoading();
animate();

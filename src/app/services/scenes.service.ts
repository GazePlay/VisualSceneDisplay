import {Injectable} from '@angular/core';
import {Hotspot, Scene} from '../types';
import {ModeService} from "./mode.service";
import {SettingsService} from "./settings.service";

@Injectable({
  providedIn: 'root'
})
export class ScenesService {

  SCENES: Array<Scene> = [];
  openRequest;

  nameHotspot = '';
  colorHotspot = '';
  soundHotspot = '';

  haveAddHotspot = false;

  constructor(public modeService: ModeService,
              public settingsService: SettingsService) {
    this.init();
  }

  addScene(base64data: string, sceneName: string = '', firstimagename: string = '') {
    if (this.SCENES == null || this.SCENES.length == 0) {
      this.SCENES = [{
        name: sceneName,
        images: [
          {name: firstimagename, base64data, canvasData: null, hidden: false, hotspots: Array<Hotspot>()}
        ],
        hidden: false
      }];
    } else {
      this.SCENES.push({
        name: sceneName,
        images: [
          {name: firstimagename, base64data, canvasData: null, hidden: false, hotspots: Array<Hotspot>()}
        ],
        hidden: false
      });
    }
    this.update();
  }

  addImage(base64data: string, sceneNumber: number, imageName: string = '') {
    this.SCENES[sceneNumber].images.push({
      name: imageName,
      base64data,
      canvasData: null,
      hidden: false,
      hotspots: Array<Hotspot>()
    });
    this.update();
  }

  canvasSave(selectedScene: number, selectedImage: number, canvasData: string) {
    this.SCENES[selectedScene].images[selectedImage].canvasData = canvasData;
    this.update();
  }

  getScenes(): Array<Scene> {
    return this.SCENES;
  }

  updateScenes() {
    this.update();
  }

  renameImage(selectedScene: number, selectedImage: number, newImageName: string) {
    this.SCENES[selectedScene].images[selectedImage].name = newImageName;
    this.update();
  }

  renameScene(selectedScene: number, newImageName: string) {
    this.SCENES[selectedScene].name = newImageName;
    this.update();
  }

  removeImage(selectedScene: number, selectedImage: number) {
    if (this.SCENES[selectedScene].images.length >= 2) {
      this.SCENES[selectedScene].images.splice(selectedImage, 1);
      this.update();
    } else {
      this.removeScene(selectedScene);
    }

  }

  removeScene(selectedScene: number) {
    this.SCENES.splice(selectedScene, 1);
    this.update();
  }

  hideImage(selectedScene: number, selectedImage: number) {
    const sceneIsHidden = this.SCENES[selectedScene].images[selectedImage].hidden;
    this.SCENES[selectedScene].images[selectedImage].hidden = !sceneIsHidden;
    // Hides the scene if all it's images are hidden
    let i = 0;
    while (i < this.SCENES[selectedScene].images.length && this.SCENES[selectedScene].images[i].hidden) {
      i++;
    }
    if (i == this.SCENES[selectedScene].images.length) {
      if (!this.SCENES[selectedScene].hidden) {
        this.hideScene(selectedScene);
      }
    }
    else {
      this.SCENES[selectedScene].hidden = false;
    }
    this.update();
  }

  hideScene(selectedScene: number) {
    const sceneIsHidden = this.SCENES[selectedScene].hidden;
    if (sceneIsHidden) {
      this.SCENES[selectedScene].hidden = false;
      // Test if all of the images in the scene are hidden, unhides the first if so.
      let i = 0;
      while (i < this.SCENES[selectedScene].images.length && this.SCENES[selectedScene].images[i].hidden) {
        i++;
      }
      if (i == this.SCENES[selectedScene].images.length) {
        this.hideImage(selectedScene, 0);
      }
    } else {
      this.SCENES[selectedScene].hidden = true;
    }
    this.update();
  }

  changeHotspot(hotspot: Hotspot, selectedScene: number, selectedImage: number, hotspotName: string, svgPath: number[], strokeColor: string, base64sound: string) {
    hotspot.strokeColor = strokeColor;
    hotspot.name = hotspotName;
    hotspot.svgPointArray = svgPath;
    if (base64sound !== null) {
      hotspot.base64sound = base64sound;
    }
    this.updateScenes()
  }

  addHotspot(selectedScene: number, selectedImage: number, hotspotName: string, svgPath: number[], strokeColor: string, base64sound: string) {
    if (this.SCENES[selectedScene].images[selectedImage].hotspots == null) {
      this.SCENES[selectedScene].images[selectedImage].hotspots = [{
        name: hotspotName,
        svgPointArray: svgPath,
        strokeColor,
        base64sound
      }];
    } else {
      this.SCENES[selectedScene].images[selectedImage].hotspots.push({
        name: hotspotName,
        svgPointArray: svgPath,
        strokeColor,
        base64sound
      });
    }
    this.haveAddHotspot = true;
    this.update();
  }

  getImageHotspots(selectedScene: number, selectedImage: number): Array<Hotspot> {

    if (selectedScene != undefined && selectedImage != undefined) {
      return this.SCENES[selectedScene].images[selectedImage].hotspots;
    }
    return [];
  }

  // INITIALISATION
  init() {


    this.openRequest = indexedDB.open('Saves', 2);

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      const gridStore = db.transaction(['Scenes'], 'readwrite').objectStore('Scenes').get(1);
      gridStore.onsuccess = e => {
        this.SCENES = gridStore.result;
      };
      gridStore.onerror = e => {
      };

      const configStore = db.transaction(['Configuration'], 'readwrite').objectStore('Configuration').get(1);
      configStore.onsuccess = e => {
        this.settingsService.setConfiguration(configStore.result);
      };
      configStore.onerror = e => {
      };

    };

    this.openRequest.onupgradeneeded = event => {

      // Creaction of Store
      const db = event.target.result;
      const transaction = event.target.transaction;

      if (!db.objectStoreNames.contains("Scenes")) {
        db.createObjectStore('Scenes', {autoIncrement: true});
        const scenesStore = transaction.objectStore('Scenes');
        scenesStore.add(this.SCENES);
      }

      if (event.oldVersion <= 1) {
        if (!db.objectStoreNames.contains("Configuration")) {
          db.createObjectStore('Configuration', {autoIncrement: true});
          const configurationStore = transaction.objectStore('Configuration');
          configurationStore.add(this.settingsService.getConfiguration());
        }
      }
    };
  }

  update() {


    this.openRequest = indexedDB.open('Saves', 2);

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // UPDATE THE SCENE
      const scenesStore = db.transaction(['Scenes'], 'readwrite');
      const scenesObjectStore = scenesStore.objectStore('Scenes');
      const storeScenesRequest = scenesObjectStore.get(1);
      storeScenesRequest.onsuccess = () => {
        scenesObjectStore.put(this.SCENES, 1);
      };

      // UPDATE THE GRID
      const configurationStore = db.transaction(['Configuration'], 'readwrite');
      const configurationObjectStore = configurationStore.objectStore('Configuration');
      const storeConfigurationRequest = configurationObjectStore.get(1);
      storeConfigurationRequest.onsuccess = () => {
        configurationObjectStore.put(this.settingsService.getConfiguration(), 1);
      };

    };
  }

}

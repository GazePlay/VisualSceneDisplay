import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ScenesService} from '../../services/scenes.service';
import {Hotspot} from '../../types';
import {ModeService} from "../../services/mode.service";
import {MatDialog} from "@angular/material/dialog";
import {HotspotModifyDialogComponent} from "../hotspot-modify-dialog/hotspot-modify-dialog.component";
import {HotspotDeleteDialogComponent} from "../hotspot-delete-dialog/hotspot-delete-dialog.component";
import {DwellCursorService} from "../../services/dwell-cursor.service";
import {SettingsService} from "../../services/settings.service";

declare const SVG: any;

@Component({
  selector: 'app-hotspot-display',
  templateUrl: './hotspot-display.component.html',
  styleUrls: ['./hotspot-display.component.css']
})
export class HotspotDisplayComponent implements OnInit {

  drawing: any;
  @Input() public width: number;
  @Input() public height: number;
  @Input() public selectedScene: number;
  @Input() public selectedImage: number;
  @ViewChild("hotspot", {static: true}) hotspot: ElementRef;

  dwellTimer;

  constructor(
    public scenesService: ScenesService,
    private dialog: MatDialog,
    public dwellCursorService: DwellCursorService,
    public modeService: ModeService,
    public settingsService: SettingsService
  ) {
  }

  getHotspots() {
    if (this.scenesService.getImageHotspots(this.selectedScene, this.selectedImage) != null && this.scenesService.getImageHotspots(this.selectedScene, this.selectedImage).length > 0) {
      return this.scenesService.getImageHotspots(this.selectedScene, this.selectedImage)
    } else {
      return [];
    }
  }

  getPoints(hotspot: Hotspot) {
    let pathStr = "";
    for (let j = 0; j < hotspot.svgPointArray.length - 1; j = j + 2) {

      if ((hotspot.svgPointArray[j] * this.width).toString().toLowerCase() !== "nan" &&
        (hotspot.svgPointArray[j + 1] * this.height).toString().toLowerCase() !== "nan") {

        pathStr += (hotspot.svgPointArray[j] * this.width).toString() + ",";
        pathStr += (hotspot.svgPointArray[j + 1] * this.height).toString() + " ";

      }
    }
    return pathStr
  }

  getPointsInNumber(hotspot: Hotspot) {
    let points = [];
    for (let j = 0; j < hotspot.svgPointArray.length - 1; j = j + 2) {

      if ((hotspot.svgPointArray[j] * this.width).toString().toLowerCase() !== "nan" &&
        (hotspot.svgPointArray[j + 1] * this.height).toString().toLowerCase() !== "nan") {

        let point = {
          x: (hotspot.svgPointArray[j] * this.width),
          y: (hotspot.svgPointArray[j + 1] * this.height)
        };

        points.push(point)
      }
    }
    return points
  }

  ngOnInit(): void {
  }

  PlayAudio(hotspot: Hotspot) {
    let audio = new Audio(hotspot.base64sound);
    audio.load();
    audio.play();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  enterEvent(event, hotspot) {
    event.target.setAttribute("fill", hotspot.strokeColor);
    event.target.setAttribute('fill-opacity', "0.5");
    if (hotspot.name.includes('Center')){
      let textCenter = document.querySelector('#textCenter');
      textCenter.textContent = hotspot.name.replace('Center', '');
      textCenter.setAttribute('x', String(event.offsetX));
      textCenter.setAttribute('y', String(event.offsetY - 10));
      textCenter.setAttribute('class', 'showText');
    }
  };

  leaveEvent(event, hotspot) {
    event.target.setAttribute("fill", '#000000');
    event.target.setAttribute('fill-opacity', "0.0");
    if (hotspot.name.includes('Center')){
      let textCenter = document.querySelector('#textCenter');
      textCenter.setAttribute('class', 'hideText');
    }
  };

  clickEvent(event, hotspot) {
    if (this.modeService.selectedMode === 'hotspot' && this.modeService.currentDrawingTool === 'modify') {
      const dialogRef = this.dialog.open(HotspotModifyDialogComponent, {
        width: '400px',
      });
      dialogRef.componentInstance.selectedScene = this.selectedScene;
      dialogRef.componentInstance.selectedImage = this.selectedImage;
      dialogRef.componentInstance.hotspot = hotspot;

      dialogRef.afterClosed().subscribe(result => {
        this.modeService.selectedMode = 'hotspot';
        this.modeService.soundType ='import';
      });

    } else if (this.modeService.selectedMode === 'hotspot' && this.modeService.currentDrawingTool === 'delete') {
      const dialogRef = this.dialog.open(HotspotDeleteDialogComponent, {
        width: '400px',
      });
      dialogRef.componentInstance.selectedScene = this.selectedScene;
      dialogRef.componentInstance.selectedImage = this.selectedImage;
      dialogRef.componentInstance.poly = event.target;
      dialogRef.componentInstance.hotspot = hotspot;

      dialogRef.afterClosed().subscribe(result => {
        this.modeService.selectedMode = 'hotspot';
        this.modeService.soundType ='import';
      });
    } else {
      this.PlayAudio(hotspot)
    }
  };

  getColor(index) {
    if (this.scenesService.getImageHotspots(this.selectedScene, this.selectedImage) !== undefined && this.scenesService.getImageHotspots(this.selectedScene, this.selectedImage).length > index) {
      return this.scenesService.getImageHotspots(this.selectedScene, this.selectedImage)[index].strokeColor;
    }
    return 'black'
  }

  enter(event: PointerEvent, hotspot: Hotspot) {
    if (this.settingsService.DWELL_TIME_ENABLED) {
      this.dwellCursorService.updatePositionSVGPolygonElement((<HTMLElement>event.target), this.getPointsInNumber(hotspot));
      this.dwellCursorService.playToMax(this.settingsService.DWELL_TIME_TIMEOUT_VALUE);
      this.dwellTimer = window.setTimeout(() => {
        this.PlayAudio(hotspot)
      }, this.settingsService.DWELL_TIME_TIMEOUT_VALUE);
    }
  }

  exit() {
    if (this.settingsService.DWELL_TIME_ENABLED) {
      this.dwellCursorService.stop();
      window.clearTimeout(this.dwellTimer);
    }
  }

}

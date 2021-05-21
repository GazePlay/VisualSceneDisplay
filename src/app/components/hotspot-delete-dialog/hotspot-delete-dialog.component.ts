import {Component, Input, OnInit} from '@angular/core';
import {Hotspot} from "../../types";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ScenesService} from "../../services/scenes.service";
import {ModeService} from "../../services/mode.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-hotspot-delete-dialog',
  templateUrl: './hotspot-delete-dialog.component.html',
  styleUrls: ['./hotspot-delete-dialog.component.css']
})
export class HotspotDeleteDialogComponent implements OnInit {

  @Input() selectedScene: number;
  @Input() selectedImage: number;
  @Input() hotspot: Hotspot;
  @Input() poly;
  form: FormGroup;
  svgPath: number[];

  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private modeService: ModeService,
    private dialogRef: MatDialogRef<HotspotDeleteDialogComponent>
  ) {
  }

  ngOnInit(): void {
  }


  submit() {
    this.deleteHotspot();
    this.scenesService.updateScenes();
    this.dialogRef.close();
  }

  deleteHotspot() {
    if (this.selectedScene != undefined && this.selectedImage != undefined) {
      this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots =
        this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots.filter(x => {
          if ((x.name !== this.hotspot.name) && (x.name !== this.hotspot.name.concat('', 'Center'))){
            return x;
          }
          //return x !== this.hotspot
        });
    }
  }


}

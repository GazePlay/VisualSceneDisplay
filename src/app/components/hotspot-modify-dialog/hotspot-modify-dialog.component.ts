import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScenesService} from '../../services/scenes.service';
import {ModeService} from "../../services/mode.service";
import {Hotspot} from "../../types";
import {AudioRecorderService} from "../../services/audio-recorder.service";

@Component({
  selector: 'app-hotspot-create-dialog',
  templateUrl: './hotspot-modify-dialog.component.html',
  styleUrls: ['./hotspot-modify-dialog.component.css']
})
export class HotspotModifyDialogComponent implements OnInit {

  @Input() selectedScene: number;
  @Input() selectedImage: number;
  @Input() hotspot: Hotspot;
  form: FormGroup;
  selectedSound = null;
  name = '';
  error = '';
  svgPath: number[];

  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    public modeService: ModeService,
    public audioRecorderService: AudioRecorderService,
    private dialogRef: MatDialogRef<HotspotModifyDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      soundSelected: '',
      name: this.hotspot.name,
      color: this.hotspot.strokeColor
    });
  }

  onSoundSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedSound = reader.result;
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
    this.error = '';
  }

  submit(form) {
    this.hotspot.strokeColor = `${form.value.color}`;
    this.hotspot.name = `${form.value.name}`;
    if (this.selectedSound !== '' && this.selectedSound !== null) {
      this.hotspot.base64sound = this.selectedSound;
    }
    if(this.modeService.modifyiedHotspot != null){
      this.hotspot.svgPointArray=this.svgPath;
    }

    let nameCenter = this.scenesService.nameHotspot;
    this.setModifyValues(`${form.value.name}`, `${form.value.color}`, this.selectedSound);

    if (this.scenesService.modeService.currentDrawingTool === 'redraw'){
      this.deleteOldCenterHotspot();
      this.scenesService.haveAddHotspot = true;
    }
    else {
      this.modifyCenterHotspot(nameCenter);
    }

    this.modeService.selectedMode = 'hotspot';
    this.modeService.modifyiedHotspot = null;
    this.modeService.currentDrawingTool ='modify';

    this.scenesService.updateScenes();
    this.dialogRef.close();
  }

  redraw(){
    this.modeService.selectedMode = 'hotspot';
    this.modeService.currentDrawingTool = 'redraw';
    this.modeService.modifyiedHotspot = this.hotspot;
    console.log("redrawing");
  }

  close(){
    this.modeService.selectedMode = 'hotspot';
    this.modeService.modifyiedHotspot = null;
    this.modeService.currentDrawingTool ='modify';
  }

  stop(){
    this.audioRecorderService.stopRecording();
    const file = this.audioRecorderService.getRecord();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedSound = reader.result;
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
    this.error = '';
  }

  setModifyValues(name, color, sound){
    this.scenesService.nameHotspot = name;
    this.scenesService.colorHotspot = color;
    this.scenesService.soundHotspot = sound;
  }

  deleteOldCenterHotspot(){
    if (this.selectedScene != undefined && this.selectedImage != undefined) {
      this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots =
        this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots.filter(x => {
          if (x.name !== this.hotspot.name.concat('', 'Center')){
            return x;
          }
        });
    }
  }

  modifyCenterHotspot(nameCenter){
    this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots =
      this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots.filter(x => {
        if (x.name == nameCenter.concat('', 'Center')){
          x.name = this.scenesService.nameHotspot.concat('', 'Center');
          x.strokeColor = this.scenesService.colorHotspot;
          x.base64sound = this.scenesService.soundHotspot;
          return x;
        }
        else {
          return x;
        }
      });
  }
}

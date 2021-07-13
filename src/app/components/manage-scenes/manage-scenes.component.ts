import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ScenesService} from '../../services/scenes.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {RenameDialogComponent} from '../rename-dialog/rename-dialog.component';
import {ImportScenesDialogComponent} from '../import-scenes-dialog/import-scenes-dialog.component';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-manage-scenes',
  templateUrl: './manage-scenes.component.html',
  styleUrls: ['./manage-scenes.component.css']
})
export class ManageScenesComponent implements OnInit {

  @Input() selectedScene: number;
  @Input() selectedImage: number;
  @Input() imageSelected: boolean;
  @Output() updateScenes = new EventEmitter<string>();

  constructor(private scenesService: ScenesService,
              private dialog: MatDialog,
              public languageService: LanguageService) {
  }

  ngOnInit(): void {
  }

  hide(): void {
    const SCENES = this.scenesService.getScenes();
    if (SCENES != null && SCENES.length !== 0) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: 'Do you want to hide ' +
          (this.imageSelected ? 'the image : ' + SCENES[this.selectedScene].images[this.selectedImage].name : 'the scene : ' + SCENES[this.selectedScene].name) + ' ?'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (this.imageSelected) {
            this.scenesService.hideImage(this.selectedScene, this.selectedImage);
          } else {
            this.scenesService.hideScene(this.selectedScene);
          }
          this.updateScenes.emit('hide');
        }
      });
    }
  }

  remove(): void {
    const SCENES = this.scenesService.getScenes();
    if (SCENES != null && SCENES.length != 0) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: 'Do you confirm the deletion of ' + (this.imageSelected ? 'the image : ' + SCENES[this.selectedScene].images[this.selectedImage].name : 'the scene : ' + SCENES[this.selectedScene].name) + ' ?'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (this.imageSelected == true) {
            this.scenesService.removeImage(this.selectedScene, this.selectedImage);
          } else {
            this.scenesService.removeScene(this.selectedScene);
          }
          this.updateScenes.emit('remove');
        }
      });
    }
  }

  rename(): void {
    const SCENES = this.scenesService.getScenes();
    if (SCENES != null && SCENES.length !== 0) {
      const dialogRef = this.dialog.open(RenameDialogComponent, {
        width: '350px',
      });
      dialogRef.componentInstance.selectedScene = this.selectedScene;
      dialogRef.componentInstance.selectedImage = this.selectedImage;
      dialogRef.componentInstance.imageSelected = this.imageSelected;
      dialogRef.afterClosed().subscribe(result => {
        this.updateScenes.emit('rename');
      });
    }
  }

  export(): void {
    const SCENESjson = JSON.stringify(this.scenesService.getScenes());
    const file = new Blob([SCENESjson], {type: 'text/json'});
    if (window.navigator.msSaveOrOpenBlob) { // IE10+
      window.navigator.msSaveOrOpenBlob(file, 'scenes.json');
    } else { // Others
      const a = document.createElement('a');
      const url = URL.createObjectURL(file);
      a.href = url;
      a.download = 'scenes.json';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  import(): void {
    const dialogRef = this.dialog.open(ImportScenesDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateScenes.emit('import');
    });

  }


}

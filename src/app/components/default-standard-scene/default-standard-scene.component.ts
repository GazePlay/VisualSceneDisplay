import { Component, OnInit } from '@angular/core';
import {ScenesService} from '../../services/scenes.service';
import {LanguageService} from '../../services/language.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogTutorialComponent} from '../dialog-tutorial/dialog-tutorial.component';

@Component({
  selector: 'app-default-standard-scene',
  templateUrl: './default-standard-scene.component.html',
  styleUrls: ['./default-standard-scene.component.css']
})
export class DefaultStandardSceneComponent implements OnInit {

  constructor(public scenesService: ScenesService,
              public languageService: LanguageService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.delay(50).then(r => {
      if (this.scenesService.SCENES.length === 0){
        this.defaultScene();
        this.openDialog();
      }
    });
  }
  defaultScene(){
    const image = 'assets/images/example.jpg';
    this.scenesService.addScene(image, 'Example Scene', 'Example Image');
  }

  openDialog(): void{
    this.dialog.open(DialogTutorialComponent, {
      height: '75%',
      width: '75%'
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

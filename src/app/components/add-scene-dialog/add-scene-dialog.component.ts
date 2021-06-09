import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScenesService} from '../../services/scenes.service';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-add-scene-dialog',
  templateUrl: './add-scene-dialog.component.html',
  styleUrls: ['./add-scene-dialog.component.css']
})
export class AddSceneDialogComponent implements OnInit {

  form: FormGroup;
  selectedFile = null;

  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddSceneDialogComponent>,
    public languageService: LanguageService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      scenename: '',
      firstimagename: ''
    });
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = reader.result;
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };

  }

  submit(form) {
    if (this.selectedFile != null) {
      this.scenesService.addScene(this.selectedFile, `${form.value.scenename}`, `${form.value.firstimagename}`);
    }
    // this.scenesService.addScene(,`${form.value.scenename}`);
    this.dialogRef.close();
  }

}

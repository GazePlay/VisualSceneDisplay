import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MenubarComponent } from './components/menubar/menubar.component';
import { SceneDisplayComponent } from './components/scene-display/scene-display.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { AddSceneDialogComponent } from './components/add-scene-dialog/add-scene-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AddImageDialogComponent } from './components/add-image-dialog/add-image-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageScenesComponent } from './components/manage-scenes/manage-scenes.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { RenameDialogComponent } from './components/rename-dialog/rename-dialog.component';
import { ImportScenesDialogComponent } from './components/import-scenes-dialog/import-scenes-dialog.component';
import { HotspotCreateComponent } from './components/hotspot-create/hotspot-create.component';
import { HotspotCreateDialogComponent } from './components/hotspot-create-dialog/hotspot-create-dialog.component';
import { HotspotDisplayComponent } from './components/hotspot-display/hotspot-display.component';
import {HotspotModifyDialogComponent} from './components/hotspot-modify-dialog/hotspot-modify-dialog.component';
import { HotspotDeleteDialogComponent } from './components/hotspot-delete-dialog/hotspot-delete-dialog.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DwellCursorComponent } from './components/dwell-cursor/dwell-cursor.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DefaultStandardSceneComponent } from './components/default-standard-scene/default-standard-scene.component';
import { DialogTutorialComponent } from './components/dialog-tutorial/dialog-tutorial.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    SceneDisplayComponent,
    CanvasComponent,
    AddSceneDialogComponent,
    AddImageDialogComponent,
    ManageScenesComponent,
    ConfirmationDialogComponent,
    RenameDialogComponent,
    ImportScenesDialogComponent,
    HotspotCreateComponent,
    HotspotCreateDialogComponent,
    HotspotModifyDialogComponent,
    HotspotDisplayComponent,
    HotspotDeleteDialogComponent,
    DwellCursorComponent,
    SettingsComponent,
    DefaultStandardSceneComponent,
    DialogTutorialComponent,
  ],
    imports: [
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient],
        }
      }),
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ScrollingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTableModule,
        MatButtonModule,
        MatSelectModule,
        MatButtonToggleModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddSceneDialogComponent,
    AddImageDialogComponent,
  ]

})
export class AppModule { }

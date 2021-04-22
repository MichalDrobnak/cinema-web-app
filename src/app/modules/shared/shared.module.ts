import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { ShortStringPipe } from './pipes/short-string.pipe';
import { CertainityCheckComponent } from './components/certainity-check/certainity-check.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { FileUploadDndDirective } from './directives/file-upload-dnd.directive';
import { PluralPipe } from './pipes/plural.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    FileUploaderComponent,
    ShortStringPipe,
    CertainityCheckComponent,
    FileSizePipe,
    FileUploadDndDirective,
    PluralPipe,
    NavbarComponent,
  ],
  exports: [
    FileUploaderComponent,
    ShortStringPipe,
    CertainityCheckComponent,
    FileSizePipe,
    FileUploadDndDirective,
    PluralPipe,
    NavbarComponent,
  ],
  imports: [CommonModule, MaterialModule, AppRoutingModule],
})
export class SharedModule {}

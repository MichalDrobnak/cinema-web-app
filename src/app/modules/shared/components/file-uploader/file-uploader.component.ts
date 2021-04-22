import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent {
  @Output() fileChange = new EventEmitter<File>();

  selectedFile: File;

  constructor() {}

  /**
   * Sets file selected in file input to selectedFile variable and emits fileChange event.
   *
   * @param files Selected files.
   */
  handleFileInput(files: FileList): void {
    const tempFiles = Array.from(files);
    this.selectedFile = tempFiles[0];
    this.fileChange.emit(this.selectedFile);
  }

  /**
   * Handles file input change.
   *
   * @param changeEvent Event triggered on file input change.
   */
  handleFileInputChange(changeEvent: Event): void {
    const files = (changeEvent.target as HTMLInputElement).files;
    this.handleFileInput(files);
  }

  /**
   * Sets variables to initial state.
   */
  discardFiles(): void {
    this.selectedFile = undefined;
    this.fileChange.emit(null);
  }
}

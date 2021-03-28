import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-certainity-check',
  templateUrl: './certainity-check.component.html',
})
export class CertainityCheckComponent {
  constructor(public dialogRef: MatDialogRef<CertainityCheckComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

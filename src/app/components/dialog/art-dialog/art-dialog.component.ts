import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ArtObject } from 'src/app/interface/artObject';

@Component({
  selector: 'app-art-dialog',
  templateUrl: './art-dialog.component.html',
  styleUrls: ['./art-dialog.component.css']
})
export class ArtDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ArtObject) {}
}

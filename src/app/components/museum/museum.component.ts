import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, Observable, of } from 'rxjs';
import { ArtObject } from 'src/app/interface/artObject';
import { MuseumService } from 'src/app/services/museum.service';
import { ArtDialogComponent } from '../dialog/art-dialog/art-dialog.component';

@Component({
  selector: 'app-museum',
  templateUrl: './museum.component.html',
  styleUrls: ['./museum.component.css']
})
export class MuseumComponent implements OnInit {
  objectIds: number[] = [];
  delay: number = 10000;
  isLoading = false;
  artObject!: any;
  paused = false;

  constructor(private readonly museumService: MuseumService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.museumService.GetObjectsIds()
      .pipe(
        map(response => response.objectIDs.filter(id => id < 1000)),
        catchError(this.handleError<any[]>('get objects ', []))
      ).subscribe(response => {
        this.objectIds = response;
      });      
      
    for (let i = 0; i < this.objectIds.length; i++) { 
      await this.reloadArtObject(this.objectIds[i], i);
    }
  }

  public openDialog(artObject: ArtObject): void {
    const dialogRef = this.dialog.open(ArtDialogComponent, { data: artObject });

    dialogRef.afterClosed();
  }

  private async reloadArtObject(id: number, iteration: number): Promise<void> {
    setTimeout(async (): Promise<void> => {
      this.setArtObject(id);     
    }, this.delay * iteration);
  };

  private setArtObject(id: number): void {  
    this.isLoading = true;  
    this.museumService.GetObjectsBy(id).subscribe(response => {
      this.artObject = response;
      this.isLoading = false;
    });
  }  
  
  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error('Service error while trying to ', operation, ': ', error);
      return of(result as T);
    };
  }
}

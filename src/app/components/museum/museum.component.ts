import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, Observable, of } from 'rxjs';
import { ArtObject } from 'src/app/interface/artObject';
import { ObjectIdsResponse } from 'src/app/interface/objectIdsResponse';
import { Timer } from 'src/app/models/timer';
import { MuseumService } from 'src/app/services/museum.service';
import { ArtDialogComponent } from '../dialog/art-dialog/art-dialog.component';

@Component({
  selector: 'app-museum',
  templateUrl: './museum.component.html',
  styleUrls: ['./museum.component.css']
})
export class MuseumComponent implements OnInit {
  
  objectIds: number[] = [];
  isLoading = false;
  artObject!: any;
  counter: number = 0;
  timer: any;
  
  constructor(private readonly museumService: MuseumService, public dialog: MatDialog) { }

  public ngOnInit() {
    this.museumService.GetObjectsIds()
    .pipe(
      map((response: ObjectIdsResponse) => response.objectIDs.filter(id => id <= 1000)),
      catchError(this.handleError<any[]>('get objects ', [])),
    ).subscribe((response: number[]) => {
      this.isLoading = true;
      this.objectIds = response;
      this.counter = 0;
      this.timer = new Timer(50);
      this.timer.start();
      this.timer.update.subscribe((timeElapsed: number) => {
      if (timeElapsed % 10000 === 0) {
          const objectId = this.objectIds[this.counter];
          this.setArtObject(objectId);  
        }
      });   
    });
  }

  public openDialog(artObject: ArtObject): void {
    this.timer.pause();
    const dialogRef = this.dialog.open(ArtDialogComponent, { data: artObject });

    dialogRef.afterClosed().subscribe(res => {
      this.timer.start();
    });
  }

  private setArtObject(id: number): void { 
    this.museumService.GetObjectsBy(id)
      .pipe(
        catchError(this.handleError<any>('get objects ids ', []))
      ).subscribe(response => {
        this.artObject = response;
        this.counter++;
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

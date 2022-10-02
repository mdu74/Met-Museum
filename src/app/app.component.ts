import { Component } from '@angular/core';
import { catchError, concatMap, delay, map, Observable, of, switchMap } from 'rxjs';
import { MuseumService } from './services/museum.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  objectIds: number[] = [];
  isLoading = false;
  stats = 0;

  constructor(private readonly museumService: MuseumService) {
    this.isLoading = true;

    this.museumService.GetObjectsIds()
      .pipe(
        concatMap(result => of(result).pipe(delay(8000))),
        catchError(this.handleError<any>('get objects ids ', []))
      ).subscribe(response => {
        this.objectIds = response.objectIDs;
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

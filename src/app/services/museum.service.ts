import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { GlobalComponent } from '../global-constant/global-constant';
import { DepartmentResponse } from '../interface/departmentResponse';
import { ObjectIdsResponse } from '../interface/objectIdsResponse';
import { ObjectResponse } from '../interface/objectResponse';

@Injectable({
  providedIn: 'root'
})
export class MuseumService {
  private objectIds$!: Observable<ObjectIdsResponse>;

  constructor(private readonly http: HttpClient) { }

  public GetObjectsIds(): Observable<ObjectIdsResponse>{
    if(!this.objectIds$){
      this.objectIds$ = this.http.get<ObjectIdsResponse>(`${GlobalComponent.apiUrl}/objects`)
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true })
      ) as Observable<ObjectIdsResponse>;
    }
    
    return this.objectIds$
  }

  public GetDepartments(): Observable<DepartmentResponse>{
    return this.http.get<DepartmentResponse>(`${GlobalComponent.apiUrl}/departments`);
  }

  public GetObjectsBy(id: number): Observable<ObjectResponse>{
    return this.http.get<ObjectResponse>(`${GlobalComponent.apiUrl}/objects/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { App } from '../interfaces/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppsService {

  constructor(private http: HttpClient) {
  }

  getApps(): Observable<App[]> {
    return this.http.get<App[]>('/api/applications')
      .pipe(
        map(apps => {
          return apps.map(app => {
            app.Inventories.sort(
              (a, b) => a.Inventory.Name < b.Inventory.Name ? -1 : 1
            );
            return app;
          });
        })
      );
  }

  destroy(app: App) {
    return this.http.delete(`/api/applications/${app.ID}`);
  }

  save(app: App): Observable<App> {
    if (app.ID) {
      return this.http.put<App>(`/api/applications/${app.ID}`, app);
    }
    return this.http.post<App>('/api/applications', app);
  }

  getApp(id: number): Observable<App> {
    return this.http.get<App>(`/api/applications/${id}`);
  }
}

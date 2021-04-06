import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Profile } from 'src/app/models/profile.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  // crating profiles & profilesRepositories BehaviorSubject to listen for a changes of them.
  private _profiles = new BehaviorSubject<Profile[]>([]);

  //getting profiles
  get profiles() {
    return this._profiles.asObservable();
  }



  constructor(private http: HttpClient) { }

  //getting the array of all profiles urls when getting them making forkjoin to get all the data.
  fetchProfiles() {
    return this.http
      .get<any[]>(
        environment.profilesUrl
      ).pipe(
        tap(profiles => {
          this._profiles.next(profiles);
          console.log(profiles);
        })
      );
  }

}

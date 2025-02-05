import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateLoaderService implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    // List of JSON files to load dynamically (add more as needed)
    const files = ['room', 'dashboard', 'common']; // Add more files as necessary
    console.log(`Loading translations for ${lang}:`, files); // Log the list of files being requested

    // Create an array of HTTP requests for each file
    const requests = files.map(file => {
      console.log(`Requesting: ./assets/translations/${lang}/${file}.json`); // Log each file request
      return this.http.get(`./assets/translations/${lang}/${file}.json`);
    });

    // Combine all responses into one object
    return forkJoin(requests).pipe(
      map(response => {
        console.log(`Successfully loaded translations for ${lang}:`, response); // Log the response
        return Object.assign({}, ...response); // Merge JSON files
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Monster } from '@bm/data/models';
import { Observable } from 'rxjs';

import { DND_BASE_URL } from '../tokens';

Injectable()
export class Monsters {
  constructor(
    private http: HttpClient,
    @Inject(DND_BASE_URL) private baseUrl: string
  ) { }

  get(): Observable<Monster[]> {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
    return this.http.get<Monster[]>(this.baseUrl + 'data/monsters.json', config);
  }

  resolveImage(url: string): string {
    return this.baseUrl + url.replace('/monsters/', '/tokens/').replace('.jpeg', '.png');
  }
}

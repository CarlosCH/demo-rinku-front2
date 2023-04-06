import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private api_server = "http://localhost:9898/roles"
  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllRoles(){
    return this.httpClient.get(this.api_server);
  }
}
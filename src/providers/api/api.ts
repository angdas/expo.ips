import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

@Injectable()
export class ApiProvider {

  private serverUrl = "http://192.168.0.182:9090/MattexWebAPI";
  constructor(public http: Http) {
    console.log('Hello ApiProvider Provider');
  }

  getCountry(soLineList:object): Observable<any>{     
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl + "/getCountries", options)
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) { 
    return res.json() || { };
  }
    
  private handleError (error: Response | any) { 
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from './model/plan';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class DataserviceService {

    private getPlansURL: string;
    private addPlansURL: string;
    private removePlansURL: string;

    constructor(private http: HttpClient) {
        this.getPlansURL = 'http://localhost:3333/plans';
        this.addPlansURL = 'http://localhost:3333/plans/add_plans';
        this.removePlansURL = 'http://localhost:3333/plans/delete_plans/';
    }

    public getAllPlans(): Observable<Plan[]> {
        return this.http.get<Plan[]>(this.getPlansURL);
    }

    public savePlan(plan: Plan) {
        return this.http.post<Plan>(this.addPlansURL, plan);
    }

    public removePlan(id: any) {
        return this.http.delete(this.removePlansURL + id);
    }

}

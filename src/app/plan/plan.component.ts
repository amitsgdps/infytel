import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Plan } from '../model/plan';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
    itemCount: number = 0;
    planText: string;
    localText: any;
    nationalText: any;
    btnText: string = "Add Plan";
    plans: Plan[];
    plan: Plan;
    addNewPlanId: number;

    planForm: FormGroup;
    isSubmitted: boolean = false;

    constructor(private _data: DataserviceService, private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.planForm = this.fb.group({
            name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
            localRate: new FormControl(null, Validators.compose([
                Validators.required,
                Validators.pattern('^[0-9]+$')
            ])),
            nationalRate: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[0-9]+$')
            ]))
        });
    }

    reset() {
        this.isSubmitted = false;
        this.planForm.reset();
    }

    ngOnInit() {
        this.getAllPlans();
    }

    getAllPlans() {
        this._data.getAllPlans().subscribe(res => {
            this.plans = res;
            this.itemCount = res.length;
        });

    }

    addPlan() {

        this.isSubmitted = true;
        if (!this.planForm.valid)
            return;

        this.plan = new Plan();
        this.addNewPlanId = this.plans[this.plans.length - 1].planId;
        this.plan.planId = this.addNewPlanId + 1;
        this.plan.planName = this.planText;
        this.plan.localRate = this.localText;
        this.plan.nationalRate = this.nationalText;

        this.planText = '';
        this.localText = '';
        this.nationalText = '';

        this._data.savePlan(this.plan).subscribe(
            res => {
                this.getAllPlans();
            },
            error => {
                alert('Plan not created successfully, description : ' + error.statusText + ' , status code : ' + error.status);
            });
        this.reset();

    }

    removePlan(i) {
        console.log('plan id :' + i)
        this._data.removePlan(i).subscribe(
            res => {
                this.getAllPlans();
                alert('Plan deleted successfully!');
            },
            error => {
                console.log(error);
                alert('Plan not deleted successfully, description : ' + error.statusText + ' , status code : ' + error.status);
            });
    }

}

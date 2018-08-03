import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { JhiTrackerService } from '../../shared';
import { JhiAlertService } from 'ng-jhipster';
import { MyAlertService } from './alert.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'alert',
    template: `
        <div class="alerts" role="alert">
            <div *ngFor="let alert of alerts" [ngClass]="{\'alert.position\': true, \'toast\': alert.toast}">
                <ngb-alert *ngIf="alert && alert.type && alert.msg" [type]="alert.type" (close)="closeAlert(alert)">
                    <pre [innerHTML]="alert.msg"></pre>
                </ngb-alert>
            </div>
        </div>`,
    styleUrls: [
        'alert.css'
    ]
})

export class MyAlertComponent implements OnInit, OnDestroy {
    alerts: any[] = [];
    private _success = new Subject<string>();
    constructor(
        private alertService: JhiAlertService,
        private trackerService: JhiTrackerService,
        private myAlertService: MyAlertService
    ) { }

    ngOnInit() {
        this.trackerService.receive().subscribe((activity) => {
            // console.log(activity);
            if (activity.message != null) {
                this._success.next(activity.message);
                this.myAlertService.setAlertStatus(true);
            }
        });

        // Adds to alerts
        this._success.subscribe((data) => this.alerts.push({ 'msg': data, 'type': 'success' }));
        // Removes from  pipe
        this._success.pipe(
            debounceTime(5000),
        ).subscribe(() => this.alerts = []);
    }

    showMessage(message: string) {
        // this.alerts.push({ 'msg': message, 'type': 'success', 'timeout': 5000 })
        this._success.next(message);
        this._success.pipe(
            debounceTime(5000)
        ).subscribe(() => this.alerts = []);
    }

    closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    ngOnDestroy() {
        this.alerts = [];
    }

}

import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { JhiTrackerService } from '../../shared';
import { JhiAlertService } from 'ng-jhipster';

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

export class AlertComponent implements OnInit, OnDestroy {
    alerts: any[] = [];
    constructor(private alertService: JhiAlertService, private trackerService: JhiTrackerService) { }

    ngOnInit() {
        this.trackerService.receive().subscribe((activity) => {
          console.log(activity);
          if(activity.message != null){
            this.showMessage(activity.message)
          }
        });
    }

    showMessage(message: string) {
      this.alerts.push({'msg': message, 'type': 'success'})
    }

    closeAlert(alert: any){
      const index: number = this.alerts.indexOf(alert);
      this.alerts.splice(index, 1);
    }

    ngOnDestroy() {
        this.alerts = [];
    }

}

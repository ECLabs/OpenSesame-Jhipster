import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { HistoryOpenSesame } from './history-open-sesame.model';
import { HistoryOpenSesameService } from './history-open-sesame.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-history-open-sesame',
    templateUrl: './history-open-sesame.component.html'
})
export class HistoryOpenSesameComponent implements OnInit, OnDestroy {
histories: HistoryOpenSesame[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private historyService: HistoryOpenSesameService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.historyService.query().subscribe(
            (res: HttpResponse<HistoryOpenSesame[]>) => {
                this.histories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: HistoryOpenSesame) {
        return item.id;
    }
    registerChangeInHistories() {
        this.eventSubscriber = this.eventManager.subscribe('historyListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

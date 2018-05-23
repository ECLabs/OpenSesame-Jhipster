import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { HistoryOpenSesame } from './history-open-sesame.model';
import { HistoryOpenSesameService } from './history-open-sesame.service';

@Component({
    selector: 'jhi-history-open-sesame-detail',
    templateUrl: './history-open-sesame-detail.component.html'
})
export class HistoryOpenSesameDetailComponent implements OnInit, OnDestroy {

    history: HistoryOpenSesame;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private historyService: HistoryOpenSesameService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHistories();
    }

    load(id) {
        this.historyService.find(id)
            .subscribe((historyResponse: HttpResponse<HistoryOpenSesame>) => {
                this.history = historyResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'historyListModification',
            (response) => this.load(this.history.id)
        );
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { DocumentOpenSesame } from './document-open-sesame.model';
import { DocumentOpenSesameService } from './document-open-sesame.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { JhiTrackerService } from '../../shared/tracker/tracker.service';

@Component({
    selector: 'jhi-document-open-sesame',
    templateUrl: './document-open-sesame.component.html'
})
export class DocumentOpenSesameComponent implements OnInit, OnDestroy {

currentAccount: any;
    documents: DocumentOpenSesame[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    documentTimes: Object = {};

    constructor(
        private documentService: DocumentOpenSesameService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private dataUtils: JhiDataUtils,
        private router: Router,
        private eventManager: JhiEventManager,
        private trackerService: JhiTrackerService,
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.documentService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
                (res: HttpResponse<DocumentOpenSesame[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate(['/document-open-sesame'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['/document-open-sesame', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDocuments();
        this.trackerService.subscribe();
    }

    ngOnDestroy() {
        this.trackerService.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DocumentOpenSesame) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInDocuments() {
        this.eventSubscriber = this.eventManager.subscribe('documentListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.documents = data;

        for (const document of this.documents) {
            const timeDiff = new Date().getTime() - document.createdon.getTime();
            const oneDay = 24 * 60 * 60 * 1000;
            const duration = Math.floor((timeDiff) / (oneDay));
            this.documentTimes[document.id] = `${duration} ${duration === 1 ? 'Day' : 'Days'}`;
        }
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

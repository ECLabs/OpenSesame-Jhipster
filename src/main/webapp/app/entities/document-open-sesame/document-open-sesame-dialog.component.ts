import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { JhiTrackerService } from '../../shared';
import { DocumentOpenSesame } from './document-open-sesame.model';
import { DocumentOpenSesamePopupService } from './document-open-sesame-popup.service';
import { DocumentOpenSesameService } from './document-open-sesame.service';
import { VersionOpenSesame, VersionOpenSesameService } from '../version-open-sesame';

@Component({
    selector: 'jhi-document-open-sesame-dialog',
    templateUrl: './document-open-sesame-dialog.component.html'
})
export class DocumentOpenSesameDialogComponent implements OnInit {
    document: DocumentOpenSesame;
    tempDocument: DocumentOpenSesame;
    isSaving: boolean;
    currversions: VersionOpenSesame[];
    createdonDp: any;
    duedateDp: any;
    countries: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private documentService: DocumentOpenSesameService,
        private versionService: VersionOpenSesameService,
        private eventManager: JhiEventManager,
        private trackerService: JhiTrackerService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.versionService
            .query({filter: 'document-is-null'})
            .subscribe((res: HttpResponse<VersionOpenSesame[]>) => {
                if (!this.document.currversionId) {
                    this.currversions = res.body;
                } else {
                    this.versionService
                        .find(this.document.currversionId)
                        .subscribe((subRes: HttpResponse<VersionOpenSesame>) => {
                            this.currversions = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));

            this.countries = require('./countries.json');
            if(!this.document.country){
              this.document.country = this.countries[0].name;
            }
        this.tempDocument = Object.assign({}, this.document);
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        console.log(this.document);
        if (this.document.id !== undefined) {
            this.subscribeToSaveResponse(
                this.documentService.update(this.document));
        } else {
            this.subscribeToSaveResponse(
                this.documentService.create(this.document));
        }
    }

    private checkEquality(oldDocument, currDocument) {
        return JSON.stringify(oldDocument) === JSON.stringify(currDocument);
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DocumentOpenSesame>>) {
        result.subscribe((res: HttpResponse<DocumentOpenSesame>) => {
            this.onSaveSuccess(res.body);
        }, (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DocumentOpenSesame) {
        this.trackerService.sendDocumentActivity("Document " + result.name + " was modified");
        this.eventManager.broadcast({ name: 'documentListModification', content: 'OK'});
        // if (!this.checkEquality(this.tempDocument, this.document)) {
        //     console.log("here");
        //     this.versionService.create(this.document);
        //     this.versionService.query().subscribe((res) => {
        //         console.log(res);
        //     });
        // }
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVersionById(index: number, item: VersionOpenSesame) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-document-open-sesame-popup',
    template: ''
})
export class DocumentOpenSesamePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentPopupService: DocumentOpenSesamePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.documentPopupService
                    .open(DocumentOpenSesameDialogComponent as Component, params['id']);
            } else {
                this.documentPopupService
                    .open(DocumentOpenSesameDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { WindowRef } from '../../shared';
import { DocumentOpenSesame } from './document-open-sesame.model';
import { DocumentOpenSesameService } from './document-open-sesame.service';

@Component({
    selector: 'jhi-document-open-sesame-detail',
    templateUrl: './document-open-sesame-detail.component.html'
})
export class DocumentOpenSesameDetailComponent implements OnInit, OnDestroy {

    document: DocumentOpenSesame;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private window: WindowRef;
    private docxJS: any;
    private files: any;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private documentService: DocumentOpenSesameService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocuments();
    }

    load(id) {
        this.documentService.find(id)
            .subscribe((documentResponse: HttpResponse<DocumentOpenSesame>) => {
                this.document = documentResponse.body;
                this.window = new WindowRef();

                // this.bar = this.window.nativeWindow.docxJS = this.window.nativeWindow.createDocxJS();

                const docxJS = new this.window.nativeWindow.DocxJS();
                const fileURL = `${this.document.file}`;

                const bs = atob(fileURL);
                const buffer = new ArrayBuffer(bs.length);
                const ba = new Uint8Array(buffer);
                for (let i = 0; i < bs.length; i++) {
                    ba[i] = bs.charCodeAt(i);
                }
                const file = new Blob([ba], { type: this.document.fileContentType });

                // File Parsing
                docxJS.parse(
                    file,
                    function() {
                        // After Rendering
                        docxJS.render($('#docxjs-wrapper')[0], function(result) {
                            if (result.isError) {
                                console.log(result.msg);
                            } else {
                                console.log('Success Render');
                            }
                        });
                    }, function(e) {
                        console.log('Error!', e);
                    }
                );
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocuments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'documentListModification',
            (response) => this.load(this.document.id)
        );
    }
}

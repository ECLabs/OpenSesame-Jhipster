/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OpenSesameTestModule } from '../../../test.module';
import { DocumentOpenSesameDialogComponent } from '../../../../../../main/webapp/app/entities/document-open-sesame/document-open-sesame-dialog.component';
import { DocumentOpenSesameService } from '../../../../../../main/webapp/app/entities/document-open-sesame/document-open-sesame.service';
import { DocumentOpenSesame } from '../../../../../../main/webapp/app/entities/document-open-sesame/document-open-sesame.model';
import { VersionOpenSesameService } from '../../../../../../main/webapp/app/entities/version-open-sesame';

describe('Component Tests', () => {

    describe('DocumentOpenSesame Management Dialog Component', () => {
        let comp: DocumentOpenSesameDialogComponent;
        let fixture: ComponentFixture<DocumentOpenSesameDialogComponent>;
        let service: DocumentOpenSesameService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [DocumentOpenSesameDialogComponent],
                providers: [
                    VersionOpenSesameService,
                    DocumentOpenSesameService
                ]
            })
            .overrideTemplate(DocumentOpenSesameDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentOpenSesameDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentOpenSesameService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DocumentOpenSesame(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.document = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'documentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DocumentOpenSesame();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.document = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'documentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

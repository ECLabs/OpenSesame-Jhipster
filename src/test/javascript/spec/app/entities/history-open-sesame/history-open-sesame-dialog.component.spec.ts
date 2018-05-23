/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OpenSesameTestModule } from '../../../test.module';
import { HistoryOpenSesameDialogComponent } from '../../../../../../main/webapp/app/entities/history-open-sesame/history-open-sesame-dialog.component';
import { HistoryOpenSesameService } from '../../../../../../main/webapp/app/entities/history-open-sesame/history-open-sesame.service';
import { HistoryOpenSesame } from '../../../../../../main/webapp/app/entities/history-open-sesame/history-open-sesame.model';
import { DocumentOpenSesameService } from '../../../../../../main/webapp/app/entities/document-open-sesame';

describe('Component Tests', () => {

    describe('HistoryOpenSesame Management Dialog Component', () => {
        let comp: HistoryOpenSesameDialogComponent;
        let fixture: ComponentFixture<HistoryOpenSesameDialogComponent>;
        let service: HistoryOpenSesameService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [HistoryOpenSesameDialogComponent],
                providers: [
                    DocumentOpenSesameService,
                    HistoryOpenSesameService
                ]
            })
            .overrideTemplate(HistoryOpenSesameDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HistoryOpenSesameDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoryOpenSesameService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new HistoryOpenSesame(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.history = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'historyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new HistoryOpenSesame();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.history = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'historyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

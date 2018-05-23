/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OpenSesameTestModule } from '../../../test.module';
import { CommentOpenSesameDialogComponent } from '../../../../../../main/webapp/app/entities/comment-open-sesame/comment-open-sesame-dialog.component';
import { CommentOpenSesameService } from '../../../../../../main/webapp/app/entities/comment-open-sesame/comment-open-sesame.service';
import { CommentOpenSesame } from '../../../../../../main/webapp/app/entities/comment-open-sesame/comment-open-sesame.model';
import { DocumentOpenSesameService } from '../../../../../../main/webapp/app/entities/document-open-sesame';

describe('Component Tests', () => {

    describe('CommentOpenSesame Management Dialog Component', () => {
        let comp: CommentOpenSesameDialogComponent;
        let fixture: ComponentFixture<CommentOpenSesameDialogComponent>;
        let service: CommentOpenSesameService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [CommentOpenSesameDialogComponent],
                providers: [
                    DocumentOpenSesameService,
                    CommentOpenSesameService
                ]
            })
            .overrideTemplate(CommentOpenSesameDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentOpenSesameDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentOpenSesameService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CommentOpenSesame(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.comment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'commentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CommentOpenSesame();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.comment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'commentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

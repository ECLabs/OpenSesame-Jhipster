/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OpenSesameTestModule } from '../../../test.module';
import { CommentOpenSesameDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/comment-open-sesame/comment-open-sesame-delete-dialog.component';
import { CommentOpenSesameService } from '../../../../../../main/webapp/app/entities/comment-open-sesame/comment-open-sesame.service';

describe('Component Tests', () => {

    describe('CommentOpenSesame Management Delete Component', () => {
        let comp: CommentOpenSesameDeleteDialogComponent;
        let fixture: ComponentFixture<CommentOpenSesameDeleteDialogComponent>;
        let service: CommentOpenSesameService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [CommentOpenSesameDeleteDialogComponent],
                providers: [
                    CommentOpenSesameService
                ]
            })
            .overrideTemplate(CommentOpenSesameDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentOpenSesameDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentOpenSesameService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OpenSesameTestModule } from '../../../test.module';
import { DocumentOpenSesameDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/document-open-sesame/document-open-sesame-delete-dialog.component';
import { DocumentOpenSesameService } from '../../../../../../main/webapp/app/entities/document-open-sesame/document-open-sesame.service';

describe('Component Tests', () => {

    describe('DocumentOpenSesame Management Delete Component', () => {
        let comp: DocumentOpenSesameDeleteDialogComponent;
        let fixture: ComponentFixture<DocumentOpenSesameDeleteDialogComponent>;
        let service: DocumentOpenSesameService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [DocumentOpenSesameDeleteDialogComponent],
                providers: [
                    DocumentOpenSesameService
                ]
            })
            .overrideTemplate(DocumentOpenSesameDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentOpenSesameDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentOpenSesameService);
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

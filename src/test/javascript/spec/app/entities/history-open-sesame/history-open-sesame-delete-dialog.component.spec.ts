/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OpenSesameTestModule } from '../../../test.module';
import { HistoryOpenSesameDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/history-open-sesame/history-open-sesame-delete-dialog.component';
import { HistoryOpenSesameService } from '../../../../../../main/webapp/app/entities/history-open-sesame/history-open-sesame.service';

describe('Component Tests', () => {

    describe('HistoryOpenSesame Management Delete Component', () => {
        let comp: HistoryOpenSesameDeleteDialogComponent;
        let fixture: ComponentFixture<HistoryOpenSesameDeleteDialogComponent>;
        let service: HistoryOpenSesameService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [HistoryOpenSesameDeleteDialogComponent],
                providers: [
                    HistoryOpenSesameService
                ]
            })
            .overrideTemplate(HistoryOpenSesameDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HistoryOpenSesameDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoryOpenSesameService);
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

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { OpenSesameTestModule } from '../../../test.module';
import { HistoryOpenSesameDetailComponent } from '../../../../../../main/webapp/app/entities/history-open-sesame/history-open-sesame-detail.component';
import { HistoryOpenSesameService } from '../../../../../../main/webapp/app/entities/history-open-sesame/history-open-sesame.service';
import { HistoryOpenSesame } from '../../../../../../main/webapp/app/entities/history-open-sesame/history-open-sesame.model';

describe('Component Tests', () => {

    describe('HistoryOpenSesame Management Detail Component', () => {
        let comp: HistoryOpenSesameDetailComponent;
        let fixture: ComponentFixture<HistoryOpenSesameDetailComponent>;
        let service: HistoryOpenSesameService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [HistoryOpenSesameDetailComponent],
                providers: [
                    HistoryOpenSesameService
                ]
            })
            .overrideTemplate(HistoryOpenSesameDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HistoryOpenSesameDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoryOpenSesameService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new HistoryOpenSesame(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.history).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

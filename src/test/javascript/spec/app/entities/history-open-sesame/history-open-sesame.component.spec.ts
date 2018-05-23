/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OpenSesameTestModule } from '../../../test.module';
import { HistoryOpenSesameComponent } from '../../../../../../main/webapp/app/entities/history-open-sesame/history-open-sesame.component';
import { HistoryOpenSesameService } from '../../../../../../main/webapp/app/entities/history-open-sesame/history-open-sesame.service';
import { HistoryOpenSesame } from '../../../../../../main/webapp/app/entities/history-open-sesame/history-open-sesame.model';

describe('Component Tests', () => {

    describe('HistoryOpenSesame Management Component', () => {
        let comp: HistoryOpenSesameComponent;
        let fixture: ComponentFixture<HistoryOpenSesameComponent>;
        let service: HistoryOpenSesameService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [HistoryOpenSesameComponent],
                providers: [
                    HistoryOpenSesameService
                ]
            })
            .overrideTemplate(HistoryOpenSesameComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HistoryOpenSesameComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoryOpenSesameService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new HistoryOpenSesame(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.histories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

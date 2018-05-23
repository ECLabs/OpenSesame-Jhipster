/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OpenSesameTestModule } from '../../../test.module';
import { VersionOpenSesameComponent } from '../../../../../../main/webapp/app/entities/version-open-sesame/version-open-sesame.component';
import { VersionOpenSesameService } from '../../../../../../main/webapp/app/entities/version-open-sesame/version-open-sesame.service';
import { VersionOpenSesame } from '../../../../../../main/webapp/app/entities/version-open-sesame/version-open-sesame.model';

describe('Component Tests', () => {

    describe('VersionOpenSesame Management Component', () => {
        let comp: VersionOpenSesameComponent;
        let fixture: ComponentFixture<VersionOpenSesameComponent>;
        let service: VersionOpenSesameService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [VersionOpenSesameComponent],
                providers: [
                    VersionOpenSesameService
                ]
            })
            .overrideTemplate(VersionOpenSesameComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VersionOpenSesameComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VersionOpenSesameService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new VersionOpenSesame(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.versions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

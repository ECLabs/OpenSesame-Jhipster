/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { OpenSesameTestModule } from '../../../test.module';
import { VersionOpenSesameDetailComponent } from '../../../../../../main/webapp/app/entities/version-open-sesame/version-open-sesame-detail.component';
import { VersionOpenSesameService } from '../../../../../../main/webapp/app/entities/version-open-sesame/version-open-sesame.service';
import { VersionOpenSesame } from '../../../../../../main/webapp/app/entities/version-open-sesame/version-open-sesame.model';

describe('Component Tests', () => {

    describe('VersionOpenSesame Management Detail Component', () => {
        let comp: VersionOpenSesameDetailComponent;
        let fixture: ComponentFixture<VersionOpenSesameDetailComponent>;
        let service: VersionOpenSesameService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [VersionOpenSesameDetailComponent],
                providers: [
                    VersionOpenSesameService
                ]
            })
            .overrideTemplate(VersionOpenSesameDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VersionOpenSesameDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VersionOpenSesameService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new VersionOpenSesame(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.version).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

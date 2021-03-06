/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LearnSqlTestModule } from '../../../test.module';
import { ShipperDeleteDialogComponent } from 'app/entities/shipper/shipper-delete-dialog.component';
import { ShipperService } from 'app/entities/shipper/shipper.service';

describe('Component Tests', () => {
    describe('Shipper Management Delete Component', () => {
        let comp: ShipperDeleteDialogComponent;
        let fixture: ComponentFixture<ShipperDeleteDialogComponent>;
        let service: ShipperService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LearnSqlTestModule],
                declarations: [ShipperDeleteDialogComponent]
            })
                .overrideTemplate(ShipperDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ShipperDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShipperService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

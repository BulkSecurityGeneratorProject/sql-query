import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';

import {NgbDateMomentAdapter} from './util/datepicker-adapter';
import {
    LearnSqlSharedLibsModule,
    LearnSqlSharedCommonModule,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective
} from './';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

@NgModule({
    imports: [LearnSqlSharedLibsModule, LearnSqlSharedCommonModule, MDBBootstrapModule.forRoot()],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{provide: NgbDateAdapter, useClass: NgbDateMomentAdapter}],
    entryComponents: [JhiLoginModalComponent],
    exports: [LearnSqlSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LearnSqlSharedModule {
    static forRoot() {
        return {
            ngModule: LearnSqlSharedModule
        };
    }
}

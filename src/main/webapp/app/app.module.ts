import './vendor.ts';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {Ng2Webstorage} from 'ngx-webstorage';
import {NgJhipsterModule} from 'ng-jhipster';

import {AuthInterceptor} from './blocks/interceptor/auth.interceptor';
import {AuthExpiredInterceptor} from './blocks/interceptor/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from './blocks/interceptor/errorhandler.interceptor';
import {NotificationInterceptor} from './blocks/interceptor/notification.interceptor';
import {LearnSqlSharedModule} from 'app/shared';
import {LearnSqlCoreModule} from 'app/core';
import {LearnSqlAppRoutingModule} from './app-routing.module';
import {LearnSqlHomeModule} from './home/home.module';
import {LearnSqlAccountModule} from './account/account.module';
import {LearnSqlEntityModule} from './entities/entity.module';

import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NavigationComponent} from 'app/layouts/navbar/navigation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTreeModule, MatIconModule, MatButtonModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DataService} from 'app/layouts/data.service';
import {LearnSqlTryItModule} from 'app/tryits/tryits.module';
import {LearnSqlDashBoardModule} from 'app/dashboard';
import {FilterPipe} from 'app/layouts/safe-pipe';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        Ng2Webstorage.forRoot({prefix: 'jhi', separator: '-'}),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: true,
            defaultI18nLang: 'en'
        }),
        LearnSqlSharedModule.forRoot(),
        LearnSqlCoreModule,
        LearnSqlHomeModule,
        LearnSqlTryItModule,
        LearnSqlDashBoardModule,
        LearnSqlAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        NgbModule,
        LearnSqlEntityModule,
        LearnSqlAppRoutingModule,
        MDBBootstrapModule.forRoot(),
        MatTreeModule, MatIconModule, MatButtonModule
    ],
    declarations: [
        FilterPipe,
        JhiMainComponent,
        NavbarComponent,
        NavigationComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        },
        DataService
    ],
    bootstrap: [JhiMainComponent]
})
export class LearnSqlAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = {year: moment().year() - 100, month: 1, day: 1};
    }
}

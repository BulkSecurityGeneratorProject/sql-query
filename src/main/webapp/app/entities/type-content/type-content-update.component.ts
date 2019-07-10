import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import * as moment from 'moment';
import {DATE_FORMAT, DATE_TIME_FORMAT} from 'app/shared/constants/input.constants';
import {ITypeContent} from 'app/shared/model/type-content.model';
import {TypeContentService} from './type-content.service';

@Component({
    selector: 'jhi-type-content-update',
    templateUrl: './type-content-update.component.html'
})
export class TypeContentUpdateComponent implements OnInit {
    typeContent: ITypeContent;
    isSaving: boolean;
    createdDate: string;
    updatedDate: string;

    constructor(protected typeContentService: TypeContentService, protected activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({typeContent}) => {
            this.typeContent = typeContent;
            // this.createdDate = this.typeContent.createdDate != null ? this.typeContent.createdDate.format(DATE_FORMAT) : null;
            // this.updatedDate = this.typeContent.updatedDate != null ? this.typeContent.updatedDate.format(DATE_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        // this.typeContent.createdDate = this.createdDate != null ? moment(this.createdDate, DATE_FORMAT) : null;
        // this.typeContent.updatedDate = this.updatedDate != null ? moment(this.updatedDate, DATE_FORMAT) : null;
        if (this.typeContent.id !== undefined) {
            this.subscribeToSaveResponse(this.typeContentService.update(this.typeContent));
        } else {
            this.subscribeToSaveResponse(this.typeContentService.create(this.typeContent));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeContent>>) {
        result.subscribe((res: HttpResponse<ITypeContent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}

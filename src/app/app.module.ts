import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MobileComponent } from './mobile/mobile.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SortableDirective } from './sortable.directive';
import { NgMultiSelectComponent } from './ng-multi-select/ng-multi-select.component';


@NgModule({
  declarations: [
    AppComponent,
    MobileComponent,
    SortableDirective,
    NgMultiSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

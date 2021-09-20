import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CcDataTableComponent } from './cc-data-table/cc-data-table.component';
import { CcPaginatorComponent } from './cc-data-table/cc-paginator/cc-paginator.component';
import { PaginatorService } from './cc-data-table/cc-paginator/service/paginator.service';
import { FilterPipe } from './cc-data-table/pipes/filter.pipe';

@NgModule({
  declarations: [	
    AppComponent,
      CcDataTableComponent,
      CcPaginatorComponent,
      FilterPipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [PaginatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

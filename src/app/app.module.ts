import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ColumnsComponent} from './columns/columns.component';
import {ColumnComponent} from './column/column.component';

@NgModule({
  declarations: [
    AppComponent,
    ColumnsComponent,
    ColumnComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

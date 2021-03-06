import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CardHostComponent } from './grid/card-host/card-host.component';
import { GridComponent } from './grid/grid/grid.component';
import { SampleContentComponent } from './sample-content/sample-content.component';
import { CardHostDirective } from './grid/card-host.directive';

@NgModule({
  declarations: [
    AppComponent,
    CardHostComponent,
    GridComponent,
    SampleContentComponent,
    CardHostDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

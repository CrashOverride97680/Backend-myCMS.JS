import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexLoginComponent } from './pages/index-login/index-login.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LeftbarComponent } from './static components/leftbar/leftbar.component';
import { TopbarComponent } from './static components/topbar/topbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavComponent } from './static components/nav/nav.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faRocket,
  faClipboard,
  faToolbox,
  faChartLine,
  faPlus,
  faAdjust,
  faTachometerAlt,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    IndexLoginComponent,
    AdminPanelComponent,
    NotFoundComponent,
    LeftbarComponent,
    TopbarComponent,
    DashboardComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    library: FaIconLibrary
  ) {
    library
      .addIcons(faRocket);
    library
      .addIcons(faClipboard);
    library
      .addIcons(faToolbox);
    library
      .addIcons(faChartLine);
    library
      .addIcons(faPlus);
    library
      .addIcons(faAdjust);
    library
      .addIcons(faTachometerAlt);
    library
      .addIcons(faChevronLeft);
  }
}

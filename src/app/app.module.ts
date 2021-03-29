import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faRocket,
  faClipboard,
  faToolbox,
  faChartLine,
  faPlus,
  faAdjust,
  faTachometerAlt,
  faChevronLeft,
  faChevronRight,
  faThumbtack,
  faPhotoVideo,
  faPager,
  faCommentAlt,
  faSignOutAlt,
  faCheckCircle,
  faTimesCircle,
  faPlusSquare,
  faPencilAlt,
  faPaperPlane,
  faSave,
  faTimes,
  faBrush,
  faPlusCircle,
  faFeather,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import {IndexLoginModule} from './modules/index-login/index-login.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndexLoginModule,
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
    library
      .addIcons(faChevronRight);
    library
      .addIcons(faThumbtack);
    library
      .addIcons(faPhotoVideo);
    library
      .addIcons(faPager);
    library
      .addIcons(faCommentAlt);
    library
      .addIcons(faSignOutAlt);
    library
      .addIcons(faCheckCircle);
    library
      .addIcons(faTimesCircle);
    library
      .addIcons(faPlusSquare);
    library
      .addIcons(faPaperPlane);
    library
      .addIcons(faPencilAlt);
    library
      .addIcons(faTimes);
    library
      .addIcons(faSave);
    library
      .addIcons(faBrush);
    library
      .addIcons(faRocket);
    library
      .addIcons(faPlusCircle);
    library
      .addIcons(faFeather);
    library
      .addIcons(faTrash);
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { IndexLoginComponent } from './pages/index-login/index-login.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LeftbarComponent } from './static components/leftbar/leftbar.component';
import { TopbarComponent } from './static components/topbar/topbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavComponent } from './static components/nav/nav.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AngularEditorModule } from '@kolkov/angular-editor';
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
  faFeather
} from '@fortawesome/free-solid-svg-icons';
import { PostsComponent } from './pages/posts/posts.component';
import { MediaComponent } from './pages/media/media.component';
import { PagesComponent } from './pages/pages/pages.component';
import { SeoSemComponent } from './pages/seo-sem/seo-sem.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { ChartAllComponent } from './pages/chart-all/chart-all.component';
import { ChartEarningComponent } from './pages/chart-earning/chart-earning.component';
import { ChartSocialComponent } from './pages/chart-social/chart-social.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { WidgetsComponent } from './pages/widgets/widgets.component';
import { MenusComponent } from './pages/menus/menus.component';
import { HeaderComponent } from './pages/header/header.component';
import { UsersComponent } from './pages/users/users.component';
import { AddPluginsComponent } from './pages/add-plugins/add-plugins.component';
import { AddWidgetsComponent } from './pages/add-widgets/add-widgets.component';
import { CreatePostsComponent } from './pages/create-posts/create-posts.component';
import { CategoryComponent } from './pages/category/category.component';
import { ModifyPostComponent } from './pages/modify-post/modify-post.component';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';
import { SpinnerComponent } from './static components/spinner/spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    IndexLoginComponent,
    NotFoundComponent,
    LeftbarComponent,
    TopbarComponent,
    DashboardComponent,
    NavComponent,
    PostsComponent,
    MediaComponent,
    PagesComponent,
    SeoSemComponent,
    CommentsComponent,
    ChartAllComponent,
    ChartEarningComponent,
    ChartSocialComponent,
    ThemesComponent,
    WidgetsComponent,
    MenusComponent,
    HeaderComponent,
    UsersComponent,
    AddPluginsComponent,
    AddWidgetsComponent,
    CreatePostsComponent,
    CategoryComponent,
    ModifyPostComponent,
    CreateCategoryComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ChartsModule,
    Ng2SmartTableModule,
    AngularEditorModule
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
  }
}

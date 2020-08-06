import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexLoginComponent } from './pages/index-login/index-login.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
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
import { GuardService } from '../app/services/auth/guard/guard.service';
import { AddPluginsComponent } from './pages/add-plugins/add-plugins.component';
import { AddWidgetsComponent } from './pages/add-widgets/add-widgets.component';
const routes: Routes =
[
  { path: '', component: IndexLoginComponent },
  { path: 'login', redirectTo: '' },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [GuardService] },
  { path: 'dashboard', component: AdminPanelComponent, canActivate: [GuardService]},
  { path: 'posts', component: PostsComponent, canActivate: [GuardService]},
  { path: 'media', component: MediaComponent, canActivate: [GuardService]},
  { path: 'pages', component: PagesComponent, canActivate: [GuardService]},
  { path: 'seo-sem', component: SeoSemComponent, canActivate: [GuardService]},
  { path: 'comments', component: CommentsComponent, canActivate: [GuardService]},
  { path: 'themes', component: ThemesComponent, canActivate: [GuardService]},
  { path: 'widgets', component: WidgetsComponent, canActivate: [GuardService]},
  { path: 'menus', component: MenusComponent, canActivate: [GuardService]},
  { path: 'header', component: HeaderComponent, canActivate: [GuardService]},
  { path: 'users', component: UsersComponent, canActivate: [GuardService]},
  { path: 'chart-all', component: ChartAllComponent, canActivate: [GuardService]},
  { path: 'chart-earning', component: ChartEarningComponent, canActivate: [GuardService]},
  { path: 'chart-social', component: ChartSocialComponent, canActivate: [GuardService]},
  { path: 'add-plugins', component: AddPluginsComponent, canActivate: [GuardService]},
  { path: 'add-widgets', component: AddWidgetsComponent, canActivate: [GuardService]},
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

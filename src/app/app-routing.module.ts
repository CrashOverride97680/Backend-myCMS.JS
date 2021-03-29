import { NgModule, Component } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexLoginComponent} from './modules/index-login/pages/login/index-login.component';
const routes: Routes =
[
  { path: '', component: IndexLoginComponent },
  { path: 'login', redirectTo: '' },
  /*{ path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard]},
  { path: 'posts', component: PostsComponent, canActivate: [AdminGuard]},
  { path: 'media', component: MediaComponent, canActivate: [AdminGuard]},
  { path: 'pages', component: PagesComponent, canActivate: [AdminGuard]},
  { path: 'seo-sem', component: SeoSemComponent, canActivate: [AdminGuard]},
  { path: 'comments', component: CommentsComponent, canActivate: [AdminGuard]},
  { path: 'themes', component: ThemesComponent, canActivate: [AdminGuard]},
  { path: 'widgets', component: WidgetsComponent, canActivate: [AdminGuard]},
  { path: 'menus', component: MenusComponent, canActivate: [AdminGuard]},
  { path: 'header', component: HeaderComponent, canActivate: [AdminGuard]},
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard]},
  { path: 'category', component: CategoryComponent, canActivate: [AdminGuard]},
  { path: 'createCategory', component: CreateCategoryComponent, canActivate: [AdminGuard]},
  { path: 'chart-all', component: ChartAllComponent, canActivate: [AdminGuard]},
  { path: 'chart-earning', component: ChartEarningComponent, canActivate: [AdminGuard]},
  { path: 'chart-social', component: ChartSocialComponent, canActivate: [AdminGuard]},
  { path: 'add-plugins', component: AddPluginsComponent, canActivate: [AdminGuard]},
  { path: 'add-widgets', component: AddWidgetsComponent, canActivate: [AdminGuard]},
  { path: 'modifyPost/:id', component: ModifyPostComponent, canActivate: [AdminGuard]},
  { path: 'createPosts', component: CreatePostsComponent, canActivate: [AdminGuard]},
  { path: '**', component: NotFoundComponent }*/
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { CategoryListComponent } from './category-list/category-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './not-found.component';
import { CategoryPopupComponent } from './category-list/category-dialog.component';

const appRoutes: Routes = [
    { path: 'category-list', component: CategoryListComponent },
    {
        path: 'category/:id/new',
        component: CategoryPopupComponent,
        data: {
            pageTitle: 'Create Category'
        },
        outlet: 'popup'
    },
    { path: '', redirectTo: '/category-list', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

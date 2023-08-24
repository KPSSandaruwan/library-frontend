import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { BookInventoryComponent } from './components/book-inventory/book-inventory.component';
import { AuthorListComponent } from './components/author-list/author-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'book-inventory',
        redirectTo: 'full',
      },
      {
        path: 'book-inventory',
        component: BookInventoryComponent,
      },
      {
        path: 'author-list',
        component: AuthorListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { FestivalHomeComponent } from './components/festival-home-component/festival-home-component';
import { FestivalListComponent } from './components/festival-list-component/festival-list-component';
import { ExpostantDetailComponent } from './components/expostant-detail-component/expostant-detail-component';

export const routes: Routes = [
    { path: '', component: FestivalHomeComponent },
    { path: 'festivals', component: FestivalListComponent },
    { path: 'exposants/:id', component: ExpostantDetailComponent }
];
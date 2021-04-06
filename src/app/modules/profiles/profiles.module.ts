import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [ProfilesListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfilesRoutingModule,
    DataTablesModule
  ]
})
export class ProfilesModule { }

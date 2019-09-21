import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { UserForm } from '../../../../core/forms/user.form';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ManageTeamsComponentModule } from '../../shared/manage-teams/manage-teams.component';
import { ManagePermissionsComponentModule } from '../../shared/manage-permissions/manage-permissions.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {
  form = new UserForm();

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.usersService.getUser(Number(this.route.snapshot.paramMap.get('id'))).subscribe(user => {
        this.form.patchValue(user);
      });
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    this.usersService.save(this.form.value).subscribe(() => {
      this.router.navigateByUrl('/settings/teams');
    });
  }
}

@NgModule({
  declarations: [EditUserComponent],
  exports: [EditUserComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    RouterModule,
    MatTabsModule,
    ManageTeamsComponentModule,
    ManagePermissionsComponentModule,
  ]
})
export class EditUserComponentModule {
}

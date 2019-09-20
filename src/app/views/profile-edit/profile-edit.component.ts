import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  profileEdit = new FormGroup({
    bio: new FormControl(null)
  });
  status: string;
  constructor(private udS: UserDataService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.udS.changeBio(this.profileEdit.value.bio)
      .then(() => {
        this.status = 'Bio updated!';
      })
      .catch(err => this.status = err);
  }

}

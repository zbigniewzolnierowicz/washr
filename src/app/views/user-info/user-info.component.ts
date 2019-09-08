import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { DocumentData } from '@google-cloud/firestore';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userID: string;
  userInfo: any;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {
    this.route.params.subscribe(params => this.userID = params.id);
  }

  ngOnInit() {
    this.db.doc(`users/${this.userID}`).get().subscribe(user => {
      this.userInfo = user.data();
    });
  }

}

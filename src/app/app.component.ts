import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, RouterEvent, NavigationEnd, NavigationStart, NavigationCancel } from '@angular/router';
import { NsfwService } from './services/nsfw.service';
import { ZoomedImageService } from './services/zoomed-image.service';
import { UserDataService } from './services/user-data.service';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'washr';
  error: string;
  isLoggedIn: boolean;
  showAdult: boolean;
  buttonsHidden = true;
  userInfo: User;
  loading: boolean;

  // tslint:disable-next-line: max-line-length
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private nsfw: NsfwService,
    public showImg: ZoomedImageService,
    public uS: UserDataService
  ) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    this.afAuth.user.subscribe(u => (u ? (this.isLoggedIn = true) : (this.isLoggedIn = false)));
    this.nsfw.nsfwStatus.subscribe(nsfw => (this.showAdult = nsfw));
    this.uS.loggedInUserData().subscribe((user: User) => (this.userInfo = user));
  }

  hideButtons() {
    this.buttonsHidden = !this.buttonsHidden;
  }

  toggleShowAdult() {
    this.nsfw.toggleNsfw();
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['']));
  }

  moveToTimeline() {
    this.router.navigate(['posts']);
  }

  moveToProfileEdit() {
    this.router.navigate(['profile']);
  }
  moveToCredits() {
    this.router.navigate(['about']);
  }
}

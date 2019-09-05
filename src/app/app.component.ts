import { Component, Renderer2 } from '@angular/core';
import { ClogService } from '@nivite/nlib';

@Component({
  selector: 'nivite-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  guest: any;
  invite: any;
  constructor(private clog: ClogService, private rendrer: Renderer2) { }
  loadInviteData(invite: any) {
    this.invite = invite;
    this.clog.log('invite: ' + (invite ? invite.hostName : invite));
    if (invite && invite.photos && invite.photos.length) {
      invite.photos.forEach(photo => {
        if (photo.tags && photo.tags.length) {
          photo.tags.forEach((tag: string) => {
            if (tag && ('bg' === tag.toLowerCase() || 'background' === tag.toLowerCase())) {
              const hstyle = document.querySelector('html');
              this.rendrer.setStyle(hstyle, 'background-image', `url('${photo.url}')`);
              this.rendrer.setStyle(hstyle, 'background-position', `center center`);
              this.rendrer.setStyle(hstyle, 'background-repeat', `no-repeat`);
              this.rendrer.setStyle(hstyle, 'background-attachment', `fixed`);
              this.rendrer.setStyle(hstyle, 'background-size', `cover`);
              return;
            }
          });
        }
      });
    }
  }
  loadUserData(user: any) {
    this.clog.log('user: ' + (user ? user.email : user));
  }
  loadGuestData(guest: any) {
    this.guest = guest;
    this.clog.log('guest: ' + (guest ? guest.email : guest));
  }

}

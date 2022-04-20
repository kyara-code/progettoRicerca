import { interval, Subscription } from 'rxjs';
import { AuthService } from './../service/auth.service';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  @ViewChild('snowman') snowman: ElementRef = null;
  @ViewChild('fire') fire: ElementRef = null;

  canvas;
  ctx;
  img;

  error = null;
  authTriedBefore = false;

  isJumping = false;
  isAnimationOn = true;
  subscribe: Subscription = null;
  isGameOver: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.error = this.authService.error;
    if (this.error.status !== 'Unknown Route') {
      this.authTriedBefore = true;
    }
  }

  onStart() {
    this.isAnimationOn = true;
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.img = new Image(30, 30); // Create new img element
    this.img.src =
      'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chromium_T-Rex-error-offline.png';
    this.ctx.drawImage(this.img, 30, 0);
  }

  @HostListener('keyup.Space') onJump() {
    alert('parto!');
    requestAnimationFrame(() => {
      let cactusImg = new Image();
      cactusImg.src =
        'https://static.wikia.nocookie.net/trex-runner/images/9/96/Cactusdisplay.png/revision/latest/smart/width/250/height/250?cb=20190423055903';
      this.ctx.drawImage(cactusImg, 100, 0);
    });
  }

  onStopAnimation() {
    this.isAnimationOn = !this.isAnimationOn;
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}

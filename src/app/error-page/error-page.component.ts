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
  img1;
  img2;

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
    this.img1 = new Image(30, 30);
    this.img1.src = 'assets/img/dino.png';

    this.img2 = new Image(17, 30);
    this.img2.src = 'assets/img/cactus.png';

    // this.ctx.drawImage(this.img1, 0, 0);
    // this.ctx.globalAlpha = 0.5;
    this.ctx.drawImage(this.img2, 0, 0, 30, 30);
  }

  @HostListener('keyup.Space') onJump() {
    alert('parto!');
    requestAnimationFrame(() => {});
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

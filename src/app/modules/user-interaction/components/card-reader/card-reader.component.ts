import {
  Component,
  DebugElement,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-card-reader',
  templateUrl: './card-reader.component.html',
  styleUrls: ['./card-reader.component.scss'],
})
export class CardReaderComponent implements OnInit {
  @Output() accepted = new EventEmitter<void>();

  @ViewChild('card') card: DebugElement;
  @ViewChild('reader') reader: DebugElement;

  private active = false;
  private initialX: number;
  private timeStart: number;
  private timeEnd: number;

  private soundAccepted = new Audio('/assets/sounds/CardAccepted.mp3');
  private soundDenied = new Audio('/assets/sounds/CardDenied.mp3');

  constructor() {}

  ngOnInit(): void {}

  dragStart(e: MouseEvent | TouchEvent) {
    if (e instanceof TouchEvent) {
      this.initialX = e.touches[0].clientX;
    } else {
      this.initialX = e.clientX;
    }

    this.timeStart = performance.now();
    this.card.nativeElement.classList.remove('slide');
    this.active = true;
  }

  @HostListener('document:mouseup', ['$event'])
  @HostListener('document:touchend', ['$event'])
  dragEnd(e: MouseEvent | TouchEvent) {
    if (!this.active) return;

    let x;
    let status;

    if (e instanceof TouchEvent) {
      x = e.touches[0].clientX - this.initialX;
    } else {
      x = e.clientX - this.initialX;
    }

    if (x < this.reader.nativeElement.offsetWidth) {
      status = 'invalid';
    }

    this.timeEnd = performance.now();
    this.card.nativeElement.classList.add('slide');
    this.active = false;

    this.setTranslate(0);
    this.setStatus(status);
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  drag(e: MouseEvent | TouchEvent) {
    if (!this.active) return;

    e.preventDefault();
    let x;

    if (e instanceof TouchEvent) {
      x = e.touches[0].clientX - this.initialX;
    } else {
      x = e.clientX - this.initialX;
    }

    this.setTranslate(x);
  }

  setTranslate(x: number) {
    if (x < 0) {
      x = 0;
    } else if (x > this.reader.nativeElement.offsetWidth) {
      x = this.reader.nativeElement.offsetWidth;
    }

    x -= this.card.nativeElement.offsetWidth / 2;

    this.card.nativeElement.style.transform = 'translateX(' + x + 'px)';
  }

  setStatus(status: string) {
    if (typeof status === 'undefined') {
      let duration = this.timeEnd - this.timeStart;

      if (duration > 700) {
        status = 'slow';
      } else if (duration < 400) {
        status = 'fast';
      } else {
        status = 'valid';
        this.acceptCard();
      }
    }

    this.reader.nativeElement.dataset.status = status;
    this.playAudio(status);
  }

  playAudio(status: string) {
    this.soundDenied.pause();
    this.soundAccepted.pause();
    this.soundDenied.currentTime = 0;
    this.soundAccepted.currentTime = 0;

    if (status === 'valid') {
      this.soundAccepted.play();
    } else {
      this.soundDenied.play();
    }
  }

  acceptCard(): void {
    this.accepted.emit();
  }
}

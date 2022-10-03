import { map, Observable, Subject, timer } from 'rxjs';

export class Timer {
    private timeElapsed = 0;
    private readonly step: number;  
    update = new Subject<number>();
    private timer!: Observable<number | null>;
    private subscription!: any; 
    constructor(step: number) {
      this.timeElapsed = 0;
      this.step = step;
    }

  start() {
    this.timer = timer(this.step, this.step);
    this.subscription = this.timer.subscribe(() => {
      this.timeElapsed = this.timeElapsed + this.step;
      this.update.next(this.timeElapsed);
    });
  }

  pause() {
    if (this.timer) {
      this.subscription.unsubscribe();
      this.timer = this.timer.pipe(map(()=> null));
    } else {
      this.start();
    }
  }
}
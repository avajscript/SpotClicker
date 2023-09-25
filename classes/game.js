export class Game {
  level = 1;
  points = 0;
  spawn_time = 5000;
  red_percent = 5;
  lives = 10;
  spawn_increase = 200;
  constructor() {}

  increaseLevel() {
    this.level++;
    // reduces time between spawns
    this.spawn_time -= this.spawn_increase;
  }

  increasePoints() {
    this.points++;
  }

  decreasePoints() {
    this.points--;
  }

  getSpawnTime() {
    return this.spawn_time;
  }
}

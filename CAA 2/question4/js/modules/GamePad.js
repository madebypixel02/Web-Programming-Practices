class GamePad {
  #keyList = [];

  get keyList() {
      return this.#keyList;
  }

  init() {
      this.onKeyPressed = this.onKeyPressed.bind(this);
      this.onKeyReleased = this.onKeyReleased.bind(this);
      document.addEventListener('keydown', this.onKeyPressed);
      document.addEventListener('keyup', this.onKeyReleased);
  }

  onKeyPressed(event) {
      const key = event.key;

      if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
          if (!this.#keyList.includes(key)) {
              this.#keyList.push(key);
          }
      }
  }

  onKeyReleased(event) {
      const key = event.key;

      if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
          const index = this.#keyList.indexOf(key);

          if (index !== -1) {
              this.#keyList.splice(index, 1);
          }
      }
  }

  destroy() {
      document.removeEventListener('keydown', this.onKeyPressed);
      document.removeEventListener('keyup', this.onKeyReleased);
  }
}

export { GamePad };
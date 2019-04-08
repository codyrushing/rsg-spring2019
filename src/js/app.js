import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      elapsed: 0,
      currentRoutine: null
    };
  }
  startTimer(){
    this.clearTimer();
    this.timer = setInterval(
      () => this.setState({
        elapsed: this.state.elapsed + 1
      }),
      1000
    );
  }
  clearTimer(){
    if(this.timer){
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  isActive(routine, params){
    const { currentRoutine } = this.state;
    return {
      disabled: routine === currentRoutine,
      onClick: this.onClickRoutineButton(routine, params)
    };
  }
  onClickRoutineButton(routine, params={}){
    const { stopClock, resetClock } = params;
    return async e => {
      e.preventDefault();
      if(stopClock){
        this.clearTimer();
        this.setState({
          elapsed: 0
        });
      }
      else if(resetClock){
        this.startTimer();
      }
      else if(!this.timer){
        this.startTimer();
      }
      // if(routine === '')
      await axios.get(`/api/routine/${routine}`);
      this.setState({
        currentRoutine: routine
      })
    }
  }
  render(){
    const { elapsed } = this.state;
    const min = Math.floor(elapsed/60);
    let sec = elapsed % 60;
    if(sec < 10){
      sec = `0${sec}`;
    }
    return (
      <main>
        <section>
          <p className="right">{min}:{sec}</p>
        </section>
        <section>
          <p>Dancers enter in darkness</p>
        </section>
        <section>
          <button {...this.isActive('concatenation/phase-1', { resetClock: true })}>Phase 1</button>
          <p>
            <strong>0:00</strong>
            Once in place, turn lights on mid low white.
          </p>
        </section>
        <section>
          <button {...this.isActive('concatenation/phase-2')}>Phase 2</button>
          <p>
            <strong>0:10 (at first breath sound)</strong>
            Flicker lights once, end at medium high brightness
          </p>
        </section>
        <section>
          <button {...this.isActive('concatenation/phase-3')}>Phase 3</button>
          <p>
            <strong>8:35 (silence gap in music)</strong>
            After hopscotch series.  Dancers together near front of stage.  Slow transition to warm white
          </p>
        </section>
        <section>
          <button {...this.isActive('concatenation/phase-4')}>Phase 4</button>
          <p>
            <strong>8:45</strong>
            Start random flickering
          </p>
        </section>
        <section>
          <button {...this.isActive('concatenation/phase-5')}>Phase 5</button>
          <p>
            <strong>Very end - after arm circle under light</strong>
            Slow fade down to minimum brightness, then off
          </p>
        </section>
        <section>
          <button {...this.isActive('lib/turn-off', { stopClock: true })}>Turn off</button>
        </section>

      </main>
    )
  }
}

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
    if(this.timer){
      clearInterval(this.timer);
    }
    this.timer = setInterval(
      () => this.setState({
        elapsed: this.state.elapsed + 1
      }),
      1000
    );
  }
  isActive(routine){
    const { currentRoutine } = this.state;
    return {
      disabled: routine === currentRoutine,
      onClick: this.onClickRoutineButton(routine)
    };
  }
  onClickRoutineButton(routine){
    return async e => {
      e.preventDefault();
      if(!this.timer){
        this.startTimer();
      }
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
          <button {...this.isActive('phase-0')}>Phase 0</button>
          <p>On. Mid low brightness.</p>
        </section>
        <section>
          <button {...this.isActive('phase-1')}>Phase 1</button>
          <p>
            <strong>0:00 </strong>
            Fade up to mid high blue
          </p>
        </section>
        <section>
          <button {...this.isActive('phase-2')}>Phase 2</button>
          <p>
            <strong>1:08 </strong>
            Carissa comes to crouch, sizzle sound in music.  Starts 4 second light pulses
          </p>
        </section>
        <section>
          <button {...this.isActive('phase-3')}>Phase 3</button>
          <p>
            <strong>1:55 </strong>
            Start routine with accelerating pulses that fade to magenta.
          </p>
        </section>
        <section>
          <button {...this.isActive('phase-4')}>Phase 4</button>
          <p>
            <strong>4:28 </strong>
            Em is seated legs in front, Carissa begins solo, music hits low point.  Lights are fully magenta.  Start flashing cycle
          </p>
        </section>
        <section>
          <button {...this.isActive('phase-5')}>Phase 5</button>
          <p>
            <strong>6:34 </strong>
            Music dies down, Em exits.  Back to low blue
          </p>
        </section>
        <section>
          <button {...this.isActive('phase-off')}>Phase off</button>
        </section>

      </main>
    )
  }
}

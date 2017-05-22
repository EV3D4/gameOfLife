import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class Userdata extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repo: [],
      repoVal: [],
      generation: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.nextState = this.nextState.bind(this);
    this.startButton = this.startButton.bind(this);
    this.pauseButton = this.pauseButton.bind(this);
    this.setupButton = this.setupButton.bind(this);
    this.displayScreen = this.displayScreen.bind(this);

  }

  componentDidMount () {
       this.intervalId = setInterval(this.nextState.bind(this), 100);

   // store intervalId in the state so it can be accessed later:
}

 componentWillUnmount () {
   // use intervalId from the state to clear the interval
     clearInterval(this.intervalId);
}


  handleClick(event) {

     const squareID=event.target.id;

     var repoTemp = this.state.repo.slice()
     var repoValTemp = this.state.repoVal.slice()


     var replace=<div id={squareID} className="squareR" onClick={this.handleClick}>
            0</div>

    repoTemp.splice(squareID, 1,replace)
    repoValTemp[squareID]=1;

    this.setState({
      repo: repoTemp,
      repoVal: repoValTemp
    })

  }
  startButton(){

       this.intervalId = setInterval(this.nextState.bind(this), 100);
  }

  nextState() {

    this.setState({generation: this.state.generation +1 })

    var repoTemp = this.state.repo.slice()
    var repoValTempPrevious = this.state.repoVal.slice()
    var repoValTemp = this.state.repoVal.slice()

    var squareOn
    var squareOff
    var sum

    for(var i=0;i < repoValTemp.length;i++){

      squareOn=<div id={i} className="squareR" onClick={this.handleClick}>
            1</div>
      squareOff=<div id={i} className="square" onClick={this.handleClick}>
            0</div>

      if(i>35 && i%35!==0 && i<1189){
         sum=repoValTemp[i-1]+repoValTemp[i+1]+repoValTemp[i+35]+repoValTemp[i-35]+repoValTemp[i-36]+repoValTemp[i-34]+repoValTemp[i+36]+repoValTemp[i+34]


        if (sum>3 || sum<2)
          {
        repoValTemp[i]=0
        repoTemp.splice(i, 1,squareOff)
          }
        else if (sum==3)
         {
        repoValTemp[i]=1
        repoTemp.splice(i, 1,squareOn)
          }
      }
      else
            {
        repoValTemp[i]=0
        repoTemp.splice(i, 1,squareOff)
          }
    }

    if(JSON.stringify(repoValTempPrevious)==JSON.stringify(repoValTemp))
      {
        clearInterval(this.intervalId);

      }
    else
      this.setState({
      repo: repoTemp,
      repoVal: repoValTemp

    })


    }

  pauseButton() {
     clearInterval(this.intervalId);
  }

  setupButton() {
     clearInterval(this.intervalId);
     this.setState({generation:0})
    var array = [];
    var narray = [];

    for (var i = 0; i < 1225; i++) {

      array.push(<div id={i} className="square" onClick={this.handleClick}>
            0</div>)
      narray.push(0)
    }

    this.setState({
      repo: array,
      repoVal: narray

    })

  }
  displayScreen() {

    var array = [];
    var narray = [];


      clearInterval(this.intervalId);
    this.setState({generation: 0});

    for (var i = 0; i < 1225; i++) {

      if(Math.floor((Math.random() * 10) + 1)==1){
      array.push(<div id={i} className="squareR" onClick={this.handleClick}>
            1</div>)
        narray.push(1);
      }
      else{
      array.push(<div id={i} className="square" onClick={this.handleClick}>
            0</div>)
        narray.push(0);
    }
    }

    this.setState({
      repo: array,
      repoVal: narray
    })

  }

  render() {
    if (this.state.repo.length == 0)
      this.displayScreen()
    return (
      <div className="mainView">
        <div className="header">
            <div className="title">gameOfLife</div>
            <div className= "buttonGroup">
              <button className= "buttonCSS" onClick={this.startButton}>start</button>
              <button className= "buttonCSS" onClick={this.pauseButton}>pause</button>
              <button className= "buttonCSS" onClick={this.setupButton}>setup</button>
              <button className= "buttonCSS" onClick={this.displayScreen}>random</button>
          </div>

        </div>
        <div className="board">{this.state.repo}</div>
        <div className="generationCount">
            {this.state.generation}
          </div>
      </div>

    );
  };
}



export default Userdata;

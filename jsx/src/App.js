import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class Skill extends Component {
  
  render() {
    return(
      <div className="skill">
          {this.props.detail},&nbsp;
          {console.log("child skill",this.props.detail)}
      </div>
    )
  }
}

class Child extends Component {


  render() {
    this.skills = this.props.detail.skills;
    if (this.props.detail.firstName.toLowerCase().includes(this.props.string.toLowerCase()) || 
    this.props.detail.lastName.toLowerCase().includes(this.props.string.toLowerCase())) {
      return (
      <div className="child">
        <div className="first-name">
          {this.props.detail.firstName}
        </div>
        <div className="last-name">
          {this.props.detail.lastName}
        </div>
        <div className="skills">
          {console.log(this.props.detail.skills)}
          {}
          {console.log("this.props.skill",this.props.detail.skills)}
          {console.log("skill_new",this.skills)}
          {this.skills.map((item, index) => (
              <Skill detail={item} key={index} />
            ))}
        </div>
      </div>
      )
    }
    else {
      return(
        <div>

        </div>
      )
    }
  }
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      skills: "",
    }
    this.addContent = this.addContent.bind(this);
  }

  getFirstName(event) {
    this.setState({
      firstname: event.target.value,
    })
  }

  getLastName(event) {
    this.setState({
      lastname: event.target.value,
    })
  }

  getSkills(event) {
    this.setState({
      skills: event.target.value,
    })
  }

  addContent() {
    this.json = {
      "firstName":this.state.firstname,
      "lastName":this.state.lastname,
      "skills":this.state.skills,
    };
    console.log("my json",this.json);
    this.props.updateJson(this.json);
  }

  render() {
    return (
      <div className="input-area">
        Enter Firstname: 
        <input className="firstname-entry" value={this.state.firstname} onChange={(event) => this.getFirstName(event)}>

        </input>
        Enter Lastname: 
        <input className="lastname-entry" value={this.state.lastname} onChange={(event) => this.getLastName(event)}>

        </input>
        Enter Skills: 
        <textarea className="skills-entry" value={this.state.skills} onChange={(event) => this.getSkills(event)}>

        </textarea>
        <button className="input-button" onClick={this.addContent}>
          Add
        </button>
      </div>
    )
  }
}

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
    this.updateState = this.updateState.bind(this);
  }
  
  updateState(event) {
    this.setState({
      value: event.target.value,
    }, function() {
      this.props.updateString(this.state.value);
    });
    console.log("filter-this.state.value: "+this.state.value)
  }

  render() {
    return (
      <div className="filter">
        Search: <input type="text" onChange={this.updateState} value={this.state.value}></input>
      </div>
    )
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      string: "",
      isLoaded: false,
    }
    this.updateStudents = this.updateStudents.bind(this);
    this.sortFirstName = this.sortFirstName.bind(this);
    this.sortLastName = this.sortLastName.bind(this);
    this.updateString = this.updateString.bind(this);
    this.updateDB = this.updateDB.bind(this);
  }

  updateString(newString) {
    this.setState({
      string: newString,
    }, function() {
      
    })
    console.log("app-this.state.string: " + this.state.string)
  }

  updateStudents(newEntry) {
    let obj = this;
    console.log("data before posting",newEntry)
    axios.post('http://127.0.0.1:8000/create/', newEntry)
      .then(res => {
        console.log(res);
        console.log(res.data);
        obj.updateDB();
      })
    
  }

  sortFirstName() {
    let stateValue = this.state.students;
    stateValue.sort(function(a,b) {return ((a.firstName.toLowerCase()<b.firstName.toLowerCase())?(-1):(1))});
    console.log(stateValue);
    this.setState({
      students: stateValue,
    })
  }

  sortLastName() {
    let stateValue = this.state.students;
    stateValue.sort(function(a,b) {return ((a.lastName.toLowerCase()<b.lastName.toLowerCase())?(-1):(1))});
    console.log(stateValue);
    this.setState({
      students: stateValue,
    })
  }

  updateDB() {
    axios('http://127.0.0.1:8000/students/')
      .then(res => {
        this.setState({
          isLoaded: true,
          students: res.data,
        })
      })
  }

  componentDidMount() {
    this.updateDB();
  }


  render() {
    if (!this.state.isLoaded) {
      return (<div>Loading...</div>);
    }

    else {
      return (
        <div className="App">
          <Input updateJson={this.updateStudents}></Input>
          <Filter updateString={this.updateString}></Filter>
          <div className="content">
            <div className="heading">
              <div className="first-name-heading" onClick={this.sortFirstName}>
                First-name
              </div>
              <div className="last-name-heading" onClick={this.sortLastName}>
                Last-name
              </div>
              <div className="skills-heading">
                Skills
              </div>
            </div>
            {this.state.students.map((item, index) => (
                <Child detail={item} key={index} string={this.state.string} />
              ))}
          </div>
        </div>
      );
    }
  }
}

export default App;

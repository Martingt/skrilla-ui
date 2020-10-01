
import * as React from 'react'
import '../resources/styles/sign-in.scss'
import '../resources/styles/homescreen.scss'
import AuthService from '../utils/AuthService'
import ConsumptionList from '../components/ConsumptionList';
import IconButton from '@material-ui/core/IconButton';
import AddButton from '@material-ui/icons/Add';
const auth = new AuthService()
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddConsumptionForm from '../components/AddConsumptionForm';
import RegisterForm from '../components/RegisterForm';
import TopBar from '../components/TopBar';

export default class Login extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      token:null,
      onRegister: false,
      name: "",
      password:"",
      error:0,
      consumptionItemCreation:false,
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleRegisterClick = this.handleRegisterClick.bind(this);
  }

   handleAddConsumption = () => {
    this.setState({ consumptionItemCreation: !this.state.consumptionItemCreation});
  };

  componentDidMount () {
    this.setState({token: this.getAuthToken()});
  }


  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  handleSubmit (e) {
    e.preventDefault();
    auth.login(this.state.email, this.state.password)
      .then(res => {
        if (res != undefined)
          this.setState({token: res});
        else
          this.setState({error: 1})
        console.log(res);

      })
      .catch(e => console.log(e))
  }

  handleToUpdate(someArg){
    this.setState({token:someArg});
  }

  handleRegisterClick (e) {
    e.preventDefault();
    this.setState({onRegister: true});
  }

  getAuthToken(){
    let token = null;
    if (document.cookie.split(';').some((item) => item.trim().startsWith('token='))) {
      token = document.cookie
        .split("; ")
        .find(row => row.startsWith("token"))
        .split("=")[1];
      }
    return token;
  }



  render() {
    let error = (this.state.error == 1)? <p className="forg-pass">Wrong username or password</p>:null;
    let page = null;
    if(this.state.token !== null){
      page =
        <div id="content">
          <TopBar handleToUpdate = {this.handleToUpdate.bind(this)}/>
          <div className="mainContainer">
            <div className="mainContainerContent">

              <h1 className="containerTopBarTitle">Consumos</h1>
              <div className="containerToolbar">
                
                <IconButton color="primary" onClick={this.handleAddConsumption} >
                  <AddButton />
                </IconButton>
              </div>
              <ConsumptionList />
              <Modal
                aria-labelledby="Agregar Consumo"
                open={this.state.consumptionItemCreation}
                onClose={this.handleAddConsumption}
                closeAfterTransition
                BackdropComponent={Backdrop}
                className="addContsumptionModal"
                BackdropProps={{ timeout: 500 }}>
                <Fade in={this.state.consumptionItemCreation}>
                  <AddConsumptionForm onCancel={this.handleAddConsumption}/>
                </Fade>
              </Modal>
            </div>
          </div>
        </div>
    }
    else if(this.state.onRegister)
    {
      page = <RegisterForm handleToUpdate = {this.handleToUpdate.bind(this)}></RegisterForm>
    }
    else
    {
      page = <div className="loginBody">
        <div className="logo">
          <img src="/images/skrilla-logo-large.png"></img>
        </div>
        <div className="login">
            <form onSubmit={this.handleSubmit} >
                <label className="form-cont" >
                    <p className="text-cont">Email</p>
                    <input className="signIn" type="text" name="email"
                    onChange={this.handleChange} ></input>
                </label>
                <label className="form-cont">
                    <p className="text-cont">Password</p>
                    <input className="signIn"  type="password" name="password"
                    onChange={this.handleChange}></input>
                </label>
                <label className="subm-cont">
                    <input className="signIn" type="submit" value="Log In" ></input>
                </label>
                <label className="subm-cont">
                <input  className="signUp" type="submit" value="Sign Up" onClick={this.handleRegisterClick}></input>
                </label>
            </form>
            {error}
            <p className="forg-pass">Forgot your password?</p>
        </div>
      </div>
    }

    return page;
  }
}

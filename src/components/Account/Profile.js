import React from 'react';
import { connect } from 'react-redux'
import { updateProfile, changePassword, deleteAccount } from '../../actions/auth';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user.email,
      name: props.user.name,
      gender: props.user.gender,
      location: props.user.location,
      website: props.user.website,
      gravatar: props.user.gravatar,
      password: '',
      confirm: ''
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleProfileUpdate(event) {
    event.preventDefault();
    this.props.dispatch(updateProfile(this.state, this.props.token));
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.props.dispatch(changePassword(this.state.password, this.state.confirm, this.props.token));
  }

  handleDeleteAccount(event) {
    event.preventDefault();
    this.props.dispatch(deleteAccount(this.props.token));
  }


  render() {

    return (
      <div className="container">

        <div className="panel">
          <div className="panel-body">
            <form onSubmit={this.handleProfileUpdate.bind(this)} className="form-horizontal">
              <legend>Profile Information</legend>
              <div className="form-group row">
                <label htmlFor="email">Email</label>
                <div class="col-xs-10">
                 <input type="email" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                 </div>
              </div>
              <div className="form-group row">
                <label htmlFor="name" >Name</label>
                <div class="col-xs-10">
                  <input type="text" name="name" id="name" className="form-control" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="form-group row">
                <label>Gender</label>
                <div class="col-xs-10">
                <label className="radio-inline radio col-sm-4">
                  <input type="radio" className="form-check-input" name="gender" value="male" checked={this.state.gender === 'male'} onChange={this.handleChange.bind(this)}/><span>Male</span>
                </label>
                <label className="radio-inline col-sm-4">
                  <input type="radio" className="form-check-input" name="gender" value="female" checked={this.state.gender === 'female'} onChange={this.handleChange.bind(this)}/><span>Female</span>
                </label>
                 </div>
              </div>
              <div className="form-group row">
                <label htmlFor="location" >Location</label>
                <div class="col-xs-10">
                  <input type="text" name="location" id="location" className="form-control" value={this.state.location} onChange={this.handleChange.bind(this)}/>
                  </div>
              </div>
              <div className="form-group row">
                <label htmlFor="website" >Website</label>
                <div class="col-xs-10">
              <input type="text" name="website" id="website" className="form-control" value={this.state.website} onChange={this.handleChange.bind(this)}/>
              </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3">Gravatar</label>
                <div className="col-sm-4">
                  <img src={this.state.gravatar} width="100" height="100" className="profile"/>
                </div>
              </div>
              <div className="form-group">
                  <button type="submit" className="btn btn-success">Update Profile</button>
              </div>
            </form>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <form onSubmit={this.handleChangePassword.bind(this)} className="form-horizontal">
              <legend>Change Password</legend>
              <div className="form-group">
                <label htmlFor="password" >New Password</label>
                <div className="col-sm-7">
                  <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirm" >Confirm Password</label>
                <div className="col-sm-7">
                  <input type="password" name="confirm" id="confirm" className="form-control" value={this.state.confirm} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <div className=" col-sm-offset-3">
                  <button type="submit" className="btn btn-success">Change Password</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="panel">
          <div className="panel-body">
            <form onSubmit={this.handleDeleteAccount.bind(this)} className="form-horizontal">
              <legend>Delete Account</legend>
              <div className="form-group">
                <p className="col-sm-offset-3 col-sm-9">You can delete your account, but keep in mind this action is irreversible.</p>
                <div className="col-sm-offset-3 col-sm-9">
                  <button type="submit" className="btn btn-danger">Delete my account</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Profile);

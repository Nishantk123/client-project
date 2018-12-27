import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { updateUser } from '../../actions/authActions';

class UpdateUser extends Component {
    constructor() {
        super();
        this.state={
            firstName:"" ,
            lastName:""
        }
        this.firstNameHandler = this.firstNameHandler.bind(this);
        this.lastNameHandler = this.lastNameHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillMount(){
        let userDetailDatas=this.props.location.state.detail;
        let firstName=userDetailDatas&&userDetailDatas.first_name?userDetailDatas.first_name:"";
        let lastName=userDetailDatas&&userDetailDatas.last_name?userDetailDatas.last_name:"";
        this.setState({firstName:firstName, lastName:lastName })
    }
    firstNameHandler(e) {
      this.setState({firstName: e.target.value });
    }
    lastNameHandler(e) {
      this.setState({lastName: e.target.value });
    }
    onSubmit(e) {
      e.preventDefault();
  
      const newUser = {
        firstName: this.state.firstName,
        lastName:this.state.lastName
      };
  
      this.props.updateUser(newUser, this.props.history);
    }
    render() {
        return(
     <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg')}
                    placeholder="Name"
                    name="name"
                    value={this.state.firstName}
                    onChange={this.firstNameHandler}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg')}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.lastName}
                    onChange={this.lastNameHandler}
                  />
                </div>
    
                <input type="submit" className="btn btn-info btn-block mt-2" />
                <button  className="btn btn-info btn-block mt-2"  onClick={() =>this.props.history.push('/userlist')}>CANCEL</button>
              </form>
            </div>
          </div>
        </div>
     </div>
        )
    }
}
//export default UpdateUser;
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { updateUser })(withRouter(UpdateUser));

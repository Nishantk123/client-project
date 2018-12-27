import React, { Component } from 'react';
import { connect } from 'react-redux';
import { singleUser } from '../../actions/authActions';
class UserDetail extends Component {
    
    componentWillMount(){
        let userId=this.props.location.state.userId;
        const newUserId = {
            id: userId
          };
        this.props.singleUser(newUserId);
    }
    render() {
        var singleUserDetail=this.props.userList;
        var UserImage = singleUserDetail&&singleUserDetail.data&&singleUserDetail.data.avatar? singleUserDetail.data.avatar:""
        return(
     <div className="register">
        <div className="container">
          <div className="row">
          <div className="col-md-4 m-auto ">
            <div className="user-detail-profile-container">
                <img  className="user-detail-image" src={UserImage} />
            </div>
           </div>
            <div className="col-md-4 m-auto">
            <div className="row user-detail-Name">
            First Name: { singleUserDetail&&singleUserDetail.data&&singleUserDetail.data.first_name? singleUserDetail.data.first_name:""} 
            </div>
            <div className="row row user-detail-Name">
            Last Name: { singleUserDetail&&singleUserDetail.data&&singleUserDetail.data.last_name? singleUserDetail.data.last_name:""} 
            </div>
            

            </div>
            <div className="col-md-2 m-auto">
        <button  className="btn btn-info btn-block mt-2"  onClick={() =>this.props.history.push('/userlist')}>BACK</button>

            </div>
            
          </div>
          
        </div>
     </div>
        )
    }
}
const mapStateToProps = state => ({
    userList: state.singleUser
  });
  
  export default connect(mapStateToProps, { singleUser })(UserDetail);
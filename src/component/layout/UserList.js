import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { listUser, deleteUser } from '../../actions/authActions';

class UserList extends Component {

    constructor() {
        super();
        this.state={
            userListData:[]
        }
        this.handleUpdate=this.handleUpdate.bind(this);
        this.handleUserDetail=this.handleUserDetail.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.searchHandle = this.searchHandle.bind(this);
    }
    componentWillMount(){
        this.props.listUser();
        this.setState()
    }
    handleDelete(data){
        this.props.deleteUser(data.id);
    }
    handleUserDetail(data){
        this.props.history.push({
            pathname:'/userdetail',
            state:{ userId:data.id }
          })
        
    }
    searchHandle(e){
        let currentList = [];
        let newList = [];
        this.finalList = [];
       
        if (e.target.value !== "") {
            currentList=this.props.list&&this.props.list.data?this.props.list.data:"";
            newList = currentList.filter(item => {
            const lc = item&&item.first_name?item.first_name.toLowerCase():"";
            const filter = e.target.value.toLowerCase();
            var datass=lc.includes(filter);
            if(datass){
                this.finalList.push(
                    item
                );
            }
       
      });
    
        }
        else{
            this.finalList=this.props.list&&this.props.list.data?this.props.list.data:"";
        }
        this.setState({userListData:this.finalList})

    }
    handleUpdate(data){
        this.props.history.push
            ({
                pathname:'/updateuser',
                state:{ detail:data }
              })
    };
    render() {
        var userData =this.state.userListData&&this.state.userListData.length>0?this.state.userListData:(this.props.list&&this.props.list.data?this.props.list.data:"");
        var listData=[];
        if(userData&&userData.length>0){
            userData.forEach((object, index) => {
                listData.push(
                    <div className="row user-detail-conatiner">
                        <div className="col-sm-2 user-id">
                        {object.id} {"."}
                        </div>
                        <div className="col-sm-3 " onClick={() => this.handleUserDetail(object)}>
                            <div className="profile-container">
                            <img  className="profile-img"src={object.avatar} />
                            </div>
                        </div>
                        <div className="col-sm-3 user-name" onClick={() => this.handleUserDetail(object)}>{  object.first_name + " " + object.last_name}</div>
                        <div className="col-sm-2 buttons">
                        <button className="btn btn-info btn-block mt-2" onClick={() => this.handleUpdate(object)}> UPDATE</button>
                        </div>
                        <div className="col-sm-2 buttons">
                        <button className="btn btn-info btn-block mt-2" onClick={() => this.handleDelete(object)}> DELETE</button>
                        </div>
                    </div>
                )
            });
        }
        
        return(
            <div className="login">
                <div className="container">
                     <div className="row header-section">
                        <div className="col-md-4">
                            <button  className="btn btn-info btn-block mt-2"  onClick={() =>this.props.history.push('/createuser')}>CREATE NEW USER</button>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className={classnames('form-control form-control-lg search-field')}
                                placeholder="Search by User Name"
                                name="name"
                                onChange={this.searchHandle}
                            />
                        </div>
                    </div>
                    {listData}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    list: state.list
  });
  
  export default connect(mapStateToProps, { listUser, deleteUser })(UserList);
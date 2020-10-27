import React from 'react';
import { connect } from 'react-redux';
import{ bindActionCreators } from 'redux';
import {utilities} from '../components/utilities'
import { Button, Modal, Form,Col } from 'react-bootstrap'
import "./style.css"
import {listManager,searchTypes,addManager} from './action';
class Manager extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:false,
            radioSelect:'',
            typeName:'',
            currentPage: 1,
            todosPerPage: 20,
            isLoader:true
        }
    }
    componentDidMount(){
        this.props.listManager()
    }
    handleShow=(e)=>{
        this.setState({
            show:true
        })
    }
    handleClose=(e)=>{
        this.setState({
            show:false
        })
    }

    formTypes=(e)=>{
       this.setState({
        radioSelect:e.target.value,
       })
    }
    typeName=(e)=>{
        this.setState({
            typeName:e.target.value
           })
    }
    getSearch=(res)=>{
        let{radioSelect,typeName,currentPage,todosPerPage}=this.state;
        this.props.searchTypes(radioSelect,typeName,currentPage,todosPerPage+res);
        utilities.showToast('List of'+ radioSelect)
    }
    searchTypes=(e)=>{
        e.preventDefault();
        this.getSearch(0)
    }
    handleManager=(e,manager)=>{
        this.setState({
            show:false
        });
        this.props.addManager(manager);
        utilities.showToast('Add to manager')
    }
    handleClickPagination=event=>{
        this.getSearch(20)
    }
    render() {
        let{managerList,searchList} =this.props;
        let{show, currentPage, todosPerPage}=this.state;
        return(
            <div className='list-items'>
              <div className='list-head'>
                <h5>Bookmark-manager</h5>
                <Button  onClick={this.handleShow}  size="sm">
                    Add Manager
                </Button>
              </div>
               {managerList.map((mgList,key)=>(
                   <div className='manager-list'>
                        <p>{mgList.full_name}</p>
                    </div>
               ))}
               <Modal show={show} onHide={this.handleClose} dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title">
                <Modal.Body>
                    <Form>
                        <center>
                            <Modal.Title className="heading">ADD Manager</Modal.Title>
                        </center>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Row controlId="formBasicCheckbox" onChange={this.formTypes}>
                                <Form.Check  type="radio" label="Users"
                                    name="formHorizontalRadios"
                                    id="users"  value="users" />
                                <Form.Check  type="radio" label="Repositories"
                                    name="formHorizontalRadios"
                                    id="repositories"  value="repositories" />
                            </Form.Row>
                            <Form.Row className="align-items-center">
                                <Col sm={8} className="my-1">
                                <Form.Control id="inlineFormInputName"  onChange={this.typeName}/>
                                </Col>
                                <Button type="submit" onClick={this.searchTypes}>Submit</Button>
                            </Form.Row>
                        </Form.Group>
                    </Form>
                    <div>
                    <>
                    {searchList && searchList.map((mgList,key)=>(
                    <>
                    <div className='manager-list'>
                        <div className='list-details'>
                            <p>{mgList.login || mgList.full_name}</p>
                            <p>{mgList.type || mgList.name}</p>
                        </div>
                        <div className='button=list'>
                            <button onClick={(e)=>this.handleManager(e,mgList)}>Add to Manager</button>
                        </div>
                    </div>
                    </>
                ))}
                </>
                {searchList && <button onClick={this.handleClickPagination}>Load More</button>}
                </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return Object.assign({
        dispatch
    },bindActionCreators({listManager,searchTypes,addManager},dispatch))
}

const mapStateToProps=(state)=>{
    return{
        managerList:state.managerList && state.managerList.itemsList,
        searchList:state && state.searchTypes && state.searchTypes.items && state.searchTypes.items.data && state.searchTypes.items.data.items
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Manager)
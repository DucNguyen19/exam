import React, { Component } from 'react';
import { Button, Container, Row, Col, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './App.css';
import { UncontrolledDropdown,
            DropdownToggle,
            DropdownMenu,
            DropdownItem } from 'reactstrap';


class App extends Component {
      constructor(props){
            super(props)    
            this.state = {
                  data: [],
                  user: {},
                  status: false,
                  modal: false,
                  authorEdit: [],
                  cmtEdit: [],
            
            }
      }
 
      componentDidMount(){
            this.getData();
      }
      getData(){
            //data = [] user-> author
            //user =
            let user = {
                  id: '1',
                  name: 'Hoang Long'
            }

            let data = 
                  [
                        {
                              author: 'Le Tuan',
                              content: 'We have made th inredhemselves. ',
                              text : '',
                              editContent : '',
                              updated: false,
                              editCommented: false,
                              comments: [
                                    {
                                          user: 'Hoang Long',
                                          content: 'You can now view training in the browser.',
                                          like: false,
                                          deleted: true,
                                    },
                                    {
                                          user: 'Ngoc Huyen',
                                          content: 'Note that the development build is not optimized.',
                                          like: false,
                                    },
                              ]
                              },
                              {
                              author: 'Loki',
                              content: 'We have found some problems.',
                              text : '',
                              editContent : '',
                              updated: false,
                              editCommented: false,
                              comments: [
                                    {
                                          user: 'Jonathan',
                                          content: 'Local:  http://localhost:3000.',
                                          like: false,
                                    },
                                    {
                                          user: 'John',
                                          content: 'To create a production build, use npm run build.',
                                          like: false,
                                    },
                                    
      
                                    ]
                                    }
                      ]
                  
            this.setState({
                  data,
                  user
            });

      }
      likeComment = (ev, i, r) => {
            let data = this.state.data;
            data[i].comments[r].like = !data[i].comments[r].like; 

            this.setState({
                  data
            });
            
            
      }
      
      onChangeText = (ev, i) => {
            let data = this.state.data;
            data[i].text = ev.target.value;
            this.setState({
                  data
            });
      }
      onSubmit = (e, i) => {
            let { data, user } = this.state;
            let obj = {
                  user: user.name,
                  content: data[i].text,
            }

            data[i].comments.push(obj);
            data[i].text = '';
            this.setState({
                  data,
            });
            

      }
      
      toggle = () => {
            this.setState({
                  modal: !this.state.modal
            })
      }
      onClickEditPost = (ev, i) => {
            let {data, authorEdit} = this.state;
            authorEdit = data[i];
            authorEdit.editContent = data[i].content;
            this.toggle();
            this.setState({
                  data,
                  authorEdit,
            })
      }
      onChangeEditPost = (ev, i) => {
            let authorEdit = this.state.authorEdit;
            authorEdit.editContent = ev.target.value;
            this.setState({
                  authorEdit
            });
      }
      clickUpdatePost = (e, i) => {
            this.toggle();
            let {data,authorEdit} = this.state;
            authorEdit.updated = 'true';
            authorEdit.content = authorEdit.editContent; 
            this.setState({
                  data,
                  authorEdit,
            })
      }
      clickEditCmt = (e, i, r) => {
            let {data, cmtEdit} = this.state;
            data[i].editCommented = true;
            cmtEdit = data[i].comments[r];
            // console.log(cmtEdit, 'data edit');
            data[i].text = cmtEdit.content;
            this.setState({
                  data,
                  cmtEdit
            })
      }
      clickUpdateCmt = (e, i) => {
            let { data, cmtEdit } = this.state;
            data[i].editCommented = !data[i].editCommented;
            cmtEdit.content = data[i].text;
            // console.log(cmtEdit);
            data[i].text = '';
            this.setState({
                  data,
                  cmtEdit
            })
      }
      cancelUpdateCmt = (e, i) => {
            let { data, cmtEdit } = this.state;
            data[i].editCommented = false;
            data[i].text = '';
            this.setState({
                  data,
                  cmtEdit
            })
      }
      deleteComment = (e, i, r) => {
            let data = this.state.data;
            console.log(data[i].comments[r]);
            // data.filter((e, i, r) => {
                  // return(

                  // )
            // })



            this.setState({
                  data
            })
      }
      render() {
            let { data, user, modal, authorEdit } = this.state;
            let arr = data ? data: [];
            
            let item = arr.map((c, i) => {
                  let arrComments = c.comments ? c.comments : [];
                  
                  let itemComments = arrComments.map((d, r) => {
                        return ( 
                              <div className="comment" >
                                          <div className="user"> 
                                                {d.user}
                                          </div>
                                          <div className="content">          
                                                {d.content}
                                          </div>
                                          <div className={d.like ? 'like' : 'liked'} onClick={ev => this.likeComment(ev, i ,r)}> <span className="material-icons">thumb_up</span>
                                          </div>
                                          <div > 
                                                <UncontrolledDropdown >
                                                <DropdownToggle nav >
                                                <span className="material-icons">
                                                      more_vert
                                                </span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                      <DropdownItem>Re-Comment</DropdownItem>
                                                      <DropdownItem>Hide Comment</DropdownItem>
                                                </DropdownMenu>
                                                <DropdownMenu style = {{'display': d.user === user.name ? '' : 'none'}}>
                                                <DropdownItem>Re-Comment</DropdownItem>
                                                <DropdownItem onClick = {e => this.clickEditCmt(e, i, r)} >
                                                      Edit Comment
                                                </DropdownItem>
                                                <DropdownItem onClick = {e => this.cancelUpdateCmt(e, i)}>
                                                      Cancel Edit Comment
                                                </DropdownItem>
                                                <DropdownItem onClick = {e => this.deleteComment(e, i, r)}>
                                                      Delete Comment
                                                </DropdownItem>
                                                </DropdownMenu>
                                                </UncontrolledDropdown>
                                          </div>
                                    </div>
                        )
                  })
            return (
                  <div>
                        <Row >
                              <Col xs="2">
                              </Col>
                              <Col className="box-shadow" xs="6">
                                    <div>
                                          <h3 style={{  'color' : '#1e8c97', 'textAlign': 'left', 'paddingLeft' : '30px' }}> {c.author} </h3>
                                    </div>
                                    <p> {c.updated ? c.editContent : c.content} </p>
                                    
                                    <div>
                                          <Button style = {{'display': c.author === user.name ? 'block' : 'none', 'float' : 'right'}} onClick={ev => this.onClickEditPost(ev, i)}>Edit Post</Button>
                                          <Modal isOpen={modal}>
                                          <ModalHeader>Edit Post Of {authorEdit.author} </ModalHeader>
                                          <ModalBody>
                                                <Input value = {authorEdit.editContent} type = "text" placeholder = "Write the new content......." onChange = {ev => this.onChangeEditPost(ev, i)} />
                                          </ModalBody>
                                          <ModalFooter>
                                          <Button color="primary" onClick={e => this.clickUpdatePost(e, i)}>Update</Button>{' '}
                                          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                          </ModalFooter>
                                          </Modal>
                                    </div>
                              </Col>
                        </Row>
                        <Row>
                              <Col xs={{ 'size' : '6', 'offset' : '2' }} >
                                    {itemComments}
                              </Col>
                        </Row>
                        <Row>
                              <Col xs={{ 'size' : '6' , 'offset' : '2' }} style={{ 'display' :
                              'flex', 'paddingTop' : '20px' }}>
                                    <Input value = {c.text} onChange={ev => this.onChangeText(ev, i)} 
                                    name="text" className="text" type="text" placeholder="Write something......." />
                                    {data[i].editCommented ? (
                                          <Button onClick = {e => this.clickUpdateCmt(e, i)} >Update</Button> 
                                    ) : (
                                          <Button onClick = {e => this.onSubmit(e, i)}>Comment</Button>
                                    )}
                              </Col>
                        </Row>
                  
                  </div>
            )
            })

            return (
                  <div className="App" style={{ 'paddingTop': '40px' }}>
                        <Container>
                              {item}
                        </Container>
                        
                  </div>
                  
            );
      }
}

export default App;
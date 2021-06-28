import React, { Component , Fragment} from 'react';
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
                  indexComment: -1,
                  indexPost: -1
            
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
                  name: 'Le Tuan'      
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
                              // deleted: false,
                              comments: [
                                    {
                                          user: 'Hoang Long',
                                          content: 'You can now view training in the browser.',
                                          like: false,
                                          // deleted: false,
                                          reComment: [
                                                {
                                                      user: 'userName',
                                                      content: 'QWERT',
                                                      like: false,
                                                }
                                          ]
                                    },
                                    {
                                          user: 'Ngoc Huyen',
                                          content: 'Note that the development build is not optimized.',
                                          like: false,
                                          // deleted: false,
                                          reComment: [
                                                {
                                                      user: 'userName1',
                                                      content: 'QWERT1',
                                                      like: false,
                                                }
                                          ]
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
                              // deleted: false,
                              comments: [
                                    {
                                          user: 'Jonathan',
                                          content: 'Local:  http://localhost:3000.',
                                          like: false,
                                          // deleted: false,
                                          reComment: [
                                                {
                                                      user: 'userName2',
                                                      content: 'QWERT2',
                                                      like: false,
                                                }
                                          ]
                                    },
                                    {
                                          user: 'John',
                                          content: 'To create a production build, use npm run build.',
                                          like: false,
                                          // deleted: false,
                                          reComment: [
                                                {
                                                      user: 'userName3',
                                                      content: 'QWERT3',
                                                      like: false,
                                                }
                                          ]
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
            let {data, indexPost}= this.state;
            // authorEdit = data[i]; // [] 
            // authorEdit.editContent = data[i].content;
            indexPost = i;
            data[indexPost].editContent = data[indexPost].content;
            
            this.toggle();
            this.setState({
                  data,
                  indexPost,
            })
            
      }
      onChangeEditPost = (ev, i) => {
            let { data, indexPost} = this.state;
            data[indexPost].editContent = ev.target.value;
            // console.log(data[indexPost].editContent, 'edit content');
            // console.log(data[indexPost].author, 'author');
            // console.log(indexPost, 'indexPost');
            this.setState({
                  data
            });
      }
      clickUpdatePost = (e, i) => {
            this.toggle();
            let {data, indexPost} = this.state;
            data[indexPost].updated = true;
            data[indexPost].content = data[indexPost].editContent;
            this.setState({
                  data,
                  indexPost
            })
      }
      clickEditCmt = (e, i, r) => {
            let {data, indexComment} = this.state;
            data[i].editCommented = true;
            indexComment = r;
            // console.log(cmtEdit, 'data edit');
            data[i].text = data[i].comments[indexComment].content;
            this.setState({
                  data,
                  indexComment
            })
      }
      clickUpdateCmt = (e, i) => {
            let { data, indexComment } = this.state;
            data[i].editCommented = !data[i].editCommented;
            data[i].comments[indexComment].content = data[i].text;
            // console.log(cmtEdit);
            data[i].text = '';
            this.setState({
                  data,
                  indexComment
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
                  

                  this.setState({
                        data
                  })
            }
      render() {
            let { data, user, modal, indexPost } = this.state;
            let arr = data ? data: [];
            let editC = data[indexPost] ? data[indexPost] : '';
            let item = arr.map((c, i) => {
                  let arrComments = c.comments ? c.comments : [];
                  
                  let itemComments = arrComments.map((d, r) => {
                        let cmt = d.reComment ? d.reComment : []
                        let reCmt = cmt.map((x, z) => {
                              return (
                                    <div className = "reComment">
                                          <div className="user"> 
                                                      {x.user}
                                          </div>
                                          <div className="content">          
                                                {x.content}
                                          </div>
                                          <div> 
                                                <span className="material-icons">thumb_up</span>
                                          </div>
                                          
                                    </div>
                              )
                        })
                        return ( 
                              <div>
                              <div className="comment">
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
                                                <DropdownItem>
                                                      Delete Comment
                                                </DropdownItem>
                                                </DropdownMenu>
                                                </UncontrolledDropdown>
                                          </div>
                                          
                                    </div>
                                          <div className = "reCmt">
                                                {reCmt}
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
                                          <Fragment>
                                          <Button className = "button" onClick = {e => this.clickUpdateCmt(e, i)} >Update</Button> 
                                          <Button className = "button" onClick = {e => this.cancelUpdateCmt(e, i)}>Cancel</Button>
                                          </Fragment>
                                    ) : (
                                          <Button className = "button" onClick = {e => this.onSubmit(e, i)}>Comment</Button>
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
                        <div>
                                          <Modal isOpen={modal}>
                                          <ModalHeader>Edit Post Of { editC ? data[indexPost].author : ''  }   </ModalHeader>
                                          <ModalBody>
                                                <Input style = {{"height" : "200px"}} value = {editC ? data[indexPost].editContent : '' } type="textarea" placeholder = "Write the new content......." onChange = {ev => this.onChangeEditPost(ev)} />
                                          </ModalBody>
                                          <ModalFooter>
                                          <Button color="primary" onClick={e => this.clickUpdatePost(e)}>Update</Button>{' '}
                                          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                          </ModalFooter>
                                          </Modal>
                        </div>
                  </div>
                  
            );
      }
}

export default App;
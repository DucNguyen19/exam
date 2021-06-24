import React, { Component } from 'react';
import {  Button, Container, Row, Col, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './App.css';



class App extends Component {
      constructor(props){
            super(props)    
            this.state = {
                  data: [],
                  user: {},
                  status: false,
                  modal: false,
                  authorEdit: [],
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
                        comments: [
                              {
                                    user: 'Hoang Long',
                                    content: 'You can now view training in the browser.',
                                    like: false,
                              },
                              {
                                    user: 'Ngoc Huyen',
                                    content: 'Note that the development build is not optimized.',
                                    like: false,
                              },
                            

                            ]
                          },
                          {
                            author: 'Trong Duc',
                            content: 'We have found some problems.',
                            text : '',
                            editContent : '',
                            updated: false,
                            comments: [
                                  {
                                        user: 'Hoang Long',
                                        content: 'Local:            http://localhost:3000.',
                                        like: false,
                                  },
                                  {
                                        user: 'Ngoc Huyen',
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
      clickToggle = (ev, i) => {
            let {data, authorEdit} = this.state;
            this.toggle();
            // console.log(data[i].author, 'author....');
            authorEdit = data[i];
            
            // console.log(authorEdit.editContent, 'authorEdit....');
            this.setState({
                  data,
                  authorEdit,
            })
      }
      onChangeEdit = (ev, i) => {
            let authorEdit = this.state.authorEdit;
            authorEdit.editContent = ev.target.value;
            // console.log(authorEdit.editContent, 'authorEdit');
            this.setState({
                  authorEdit
            });
      }
      updateEdit = (e, i) => {
            this.toggle();
            let {authorEdit} = this.state;
            authorEdit.updated = 'true';
            // console.log(authorEdit, 'Authr');
            this.setState({
                  authorEdit,
            })
      }

      render() {
            let { data, user, modal, authorEdit } = this.state;
            let arr = data ? data: [];
            
            let item = arr.map((c, i) => {
                  let arrComments = c.comments ? c.comments : [];
                  
                  let itemComments = arrComments.map((d, r) => {
                        return ( 
                              <div className="comment">
                                          <div className="user"> 
                                                {d.user}
                                          </div>
                                          <div className="content">          
                                                {d.content}
                                          </div>
                                          <div className={d.like ? 'like' : 'liked'} onClick={ev => this.likeComment(ev, i ,r)}> <span class="material-icons">thumb_up</span>
                                          </div>
                                          <div className="edit"><span style = {{'display': d.user === user.name ? 'block' : 'none', 'float' : 'right'}} class="material-icons">edit_note</span>
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
                                          <Button style = {{'display': c.author === user.name ? 'block' : 'none', 'float' : 'right'}} onClick={ev => this.clickToggle(ev, i)}>Edit Post</Button>
                                          <Modal isOpen={modal} toggle={this.clickToggle}>
                                          <ModalHeader>Edit Post Of {authorEdit.author} </ModalHeader>
                                          <ModalBody>
                                                <Input value = {authorEdit.editContent} type = "text" placeholder = "Write the new content......." onChange = {ev => this.onChangeEdit(ev, i)} />
                                          </ModalBody>
                                          <ModalFooter>
                                          <Button color="primary" onClick={e => this.updateEdit(e, i)}>Update</Button>{' '}
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
                              <Col xs={{ 'size' : '6' , 'offset' : '2' }} style={{ 'display' : 'flex', 'paddingTop' : '20px' }}>
                                    <Input value = {c.text} onChange={ev => this.onChangeText(ev, i)}  name="text" className="text" type="text" placeholder="Write something......." />
                                    <Button onClick={e => this.onSubmit(e, i)}>Comment</Button>
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
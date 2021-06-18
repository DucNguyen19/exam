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
      // // clickToggle = (ev, i) => {
      // //       let {data, modal} = this.state;
      // //       console.log(data[i].author);
      // //       modal = !modal;
      // //       console.log(modal, 'modal');
      // //       this.setState({
      // //             data,
      // //             modal
            
      // //       });
              
      // }
      toggle = () => {
            this.setState({
                modal: !this.state.modal
            })
        }
      

      render() {
            let { data, user } = this.state;
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
                                    <div className={d.like ? 'like' : 'liked'} onClick={ ev => this.likeComment(ev, i ,r)}> <span class="material-icons">thumb_up</span>
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
                          <p> {c.content} </p>
                          
                          <div>
                          <Button style = {{'display': c.author === user.name ? 'block' : 'none', 'float' : 'right'}} onClick={this.toggle}>Edit Post</Button>
                              
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
                        <div>
                              <Modal isOpen={modal} toggle={this.toggle}>
                                    <ModalHeader toggle={this.toggle}>Modal Title</ModalHeader>
                                    <ModalBody>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </ModalBody>
                                    <ModalFooter>
                                    <Button color="primary" onClick={this.toggle}>Update</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                    </ModalFooter>
                              </Modal>
                        </div>
                  </div>
                  
            );
      }
}

export default App;

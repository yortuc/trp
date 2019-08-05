import React from 'react';
import Topics from './components/Topics';
import Entries from './components/Entries';
import { Modal, Button, Row, Col, Navbar, NavItem } from 'react-materialize';

const trigger = <Button>Open Modal</Button>;


function App(props) {
  return (
    <div className="App">
      <Navbar brand={<a />} alignLinks="right">
        <NavItem href="">
          Getting started
        </NavItem>
        <NavItem href="components.html">
          Components
        </NavItem>
      </Navbar>

      <Row>
        <Col s={3}>
          <Topics topics={ props.topics } />
        </Col>
        <Col s={9}>
          <Entries topic={ props.currentTopic } entries={ props.entries } />
        </Col>
      </Row>
      <Modal header="Modal Header" trigger={trigger}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Modal>
    </div>
  );
}

export default App;

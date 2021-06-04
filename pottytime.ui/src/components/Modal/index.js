/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

const AppModal = (props) => {
  const {
    buttonLabel,
    className,
    btnStyle,
    title,
    plus
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <button className={btnStyle} onClick={toggle}>{plus} {buttonLabel}</button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {props.children}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AppModal;

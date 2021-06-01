import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { getBabies } from '../../helpers/data/babyData';
import getUid from '../../helpers/data/authData';

const MyNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [babies, setBabies] = useState([]);

  const getAllBabies = (userId) => {
    getBabies(userId).then((response) => {
      setBabies(response);
    })
      .catch((err) => console.warn('no babies', err));
  };

  useEffect(() => {
    const userId = getUid();

    getAllBabies(userId);
  }, []);

  const showBabies = () => (
    babies.map((baby) => <DropdownItem key={baby.id}>
      <NavLink href={`/calendar/${baby.id}`}>{baby.firstName} {baby.lastName}</NavLink>
  </DropdownItem>)
  );

  return (
    <div>
      <Navbar light expand="md" className=" elNav justify-content-between">
        <NavbarBrand className="navTitle" href="/"> <p className="navName"><i className="fas fa-baby fa-xs"></i> It&apos;s Potty Time</p></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="links">
          <Nav className=" mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Calendar
              </DropdownToggle>
              <DropdownMenu right>
                {showBabies()}
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Pictures
              </DropdownToggle>
              <DropdownMenu right>
                {showBabies()}
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Statistics
              </DropdownToggle>
              <DropdownMenu right>
                {showBabies()}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MyNav;

import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {


    render() {
        return (
          <div className='app-head'>
            <div className='navbar'>
              <div>
                <Link
                  to="/"
                  activeOnlyWhenExact
                  activeClassName="active"
                  className='menu-item'
                >
                Home
                </Link>
              </div>
              <div>
                <Link
                  to="/neighborhoods"
                  activeOnlyWhenExact
                  activeClassName="active"
                  className='menu-item'
                >
                Neighborhoods
                </Link>
              </div>
              <div>
                <Link
                  to="/contact"
                  activeOnlyWhenExact
                  activeClassName="active"
                  className='menu-item'
                >
                Contact
                </Link>
              </div>
            </div>

          </div>
        );
    }
}

export default Header;

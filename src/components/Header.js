import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {


    render() {
        return (
          <div className='app-head'>
            <h1>Herer</h1>
            <h2>What's good around herer?</h2>
            <ul>
              <li>
                <Link
                  to="/"
                  activeOnlyWhenExact
                  activeClassName="active"
                >
                Home
                </Link>
              </li>
              <li>
                <Link
                  to="/neighborhoods"
                  activeOnlyWhenExact
                  activeClassName="active"
                >
                Neighborhoods
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  activeOnlyWhenExact
                  activeClassName="active"
                >
                Contact
                </Link>
              </li>
            </ul>
          </div>
        );
    }
}

export default Header;

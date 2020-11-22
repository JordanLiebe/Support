import React, { FC } from 'react';
import AhAhAh from '../../images/AhAhAh_NoBG.png';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Unauthorized: FC = () => {
  return (
    <div>
      <br />
      <h1>Unauthorized</h1>
      <iframe
        style={{ display: 'none' }}
        width="0"
        height="0"
        src="https://www.youtube.com/embed/g_vZasFzMN4?&autoplay=1"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      <div id="View">
        <div id="Float">
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <img src={AhAhAh} alt="Ah Ah Ah" />
          </a>
        </div>
      </div>
      <Link to="/Login" className="btn btn-primary">
        Login
      </Link>
    </div>
  );
};

export default Unauthorized;

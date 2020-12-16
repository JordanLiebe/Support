import React, { FC, useState } from 'react';
import { getGlobalStats } from '../../api-connections/Stats';
import { GlobalStat } from '../../interfaces/Stats';
import { Toast } from 'react-bootstrap';
import { useEffect } from 'react';

const Home: FC = () => {
  const [globalStats, setGlobalStats] = useState<GlobalStat[] | undefined>(
    undefined,
  );
  useEffect(() => {
    const getGlobalStatsAsync = async () => {
      let response: GlobalStat[] | undefined = await getGlobalStats();
      setGlobalStats(response);
    };
    getGlobalStatsAsync();
  }, []);
  return (
    <div id="HomePage">
      <div id="StatSection">
        <h1 style={{ padding: '20px' }}>Home</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            padding: '50px',
          }}
        >
          {globalStats &&
            globalStats.map((stat) => (
              <Toast key={'stat' + stat.id}>
                <Toast.Header closeButton={false}>
                  <strong style={{ margin: 'auto', fontSize: '30px' }}>
                    {stat.name}
                  </strong>
                </Toast.Header>
                <Toast.Body style={{ color: 'black', fontSize: '64px' }}>
                  {stat.value}
                </Toast.Body>
              </Toast>
            ))}
        </div>
      </div>
      <div>
        <h1>Thank you for visiting!</h1>
        <p style={{ fontSize: '22px' }}>
          If you would like to request support or a change to this site, feel
          free to register and create a support ticket.{' '}
        </p>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';

import Main from '../components/Main';
import LoggedInName from '../components/LoggedInName';

const MainPage = () =>
{

    return(
      <div>
        <LoggedInName />
        <Main />
      </div>
    );
};

export default MainPage;

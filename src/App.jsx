import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useDispatch, Provider } from 'react-redux';
import axios from 'axios';

import store from "./utils/store.js"
import Header from './Header.jsx';
import Activities from './components/Activities/Activities.jsx';
import Modal from './components/Modal/Modal.jsx';

const AppContainer = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(`${API_URL}/activities`);
        if (response.status == 200) {
            dispatch({ type: "ACTIVITIES_SET_LIST", payload: { data: response.data } })
        } else {
            // setAllActivities({ ...allActivities, error: "Somthing went wrong!", loading: false });
        }
      } catch(e) {
        // setAllActivities({ ...allActivities, error: "Somthing went wrong!", loading: false });
      }
    })();
  }, []);

  return (
    <div className='container overflow-hidden'>
      <Header activeTab={setActiveTab}/>
      <div className="container-view height-100">
        <Activities tab={activeTab}/>
      </div>
      <Modal />
    </div>
  );
};

createRoot(document.getElementById('app')).render(<AppContainer />);

export default App;

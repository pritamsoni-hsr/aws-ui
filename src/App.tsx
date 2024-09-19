import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import your Redux store
import Header from './components/Header';
import CloudWatchPage from './pages/cloudwatch/page';
// Import the Header component
import EC2Page from './pages/ec2/page';
import IAMGroupsPage from './pages/iam/groups';
import IAMPage from './pages/iam/page';
import IAMPoliciesPage from './pages/iam/policies';
import IAMRolesPage from './pages/iam/roles';
import RDSPage from './pages/rds/page';
import S3Page from './pages/s3/page';
import SecurityGroupPage from './pages/security-group/page';
import SubnetPage from './pages/subnet/page';
import VPCPage from './pages/vpc/page';
import store from './store';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Header /> {/* Add the Header component here */}
          <Routes>
            <Route path='/ec2' element={<EC2Page />} />
            <Route path='/vpc' element={<VPCPage />} />
            <Route path='/s3' element={<S3Page />} />
            <Route path='/rds' element={<RDSPage />} />
            <Route path='/cloudwatch' element={<CloudWatchPage />} />
            <Route path='/iam' element={<IAMPage />} />
            <Route path='/iam/policies' element={<IAMPoliciesPage />} />
            <Route path='/iam/groups' element={<IAMGroupsPage />} />
            <Route path='/iam/roles' element={<IAMRolesPage />} />
            <Route path='/subnet' element={<SubnetPage />} />
            <Route path='/security-group' element={<SecurityGroupPage />} />
          </Routes>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;

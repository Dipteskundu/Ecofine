import { createBrowserRouter } from 'react-router';
import MainLayout from '../MainLayout/MainLayout';
import AddIssues from '../pages/AddIssues';
import Home from '../pages/Home';
import IssueDetails from '../pages/IssueDetails';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children:[
            {
                index: true,
                element: <Home />
            },
            {
                path: '/addIssues',
                element: <AddIssues></AddIssues>
            },
            {
                path: '/issue-details',
                element: <IssueDetails />
            }
        ]
    }
])

export default Routes;
import { createBrowserRouter } from 'react-router';
import MainLayout from '../MainLayout/MainLayout';
import AddIssues from '../pages/AddIssues';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children:[
            {
                path: '/addIssues',
                element: <AddIssues></AddIssues>
            }
        ]
    }
])

export default Routes;
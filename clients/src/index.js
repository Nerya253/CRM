import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ViewProvider } from './context/viewContext.js';
import { ProtectedLayout } from './layouts/protectedLayout.js';
import { About } from './pages/about.js';
import { Clients } from './pages/clients.js';
import { Login } from './pages/login.js';
import { Register } from './pages/register.js';
import { Users } from './pages/users.js';
import { ViewClient } from './pages/ViewClient.js';
import { ViewUser } from './pages/viewUser.js';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ViewProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedLayout roles={['admin', 'user']} />}>
            <Route path="/clients" element={<Clients />} />
            <Route path="/client/:id" element={<ViewClient />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route element={<ProtectedLayout roles={['admin']} />}>
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:id" element={<ViewUser />} />
          </Route>
        </Routes>
      </ViewProvider>
    </BrowserRouter>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);

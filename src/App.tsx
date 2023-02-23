import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes/routes';

const App:FC = () => {
  const routing = useRoutes(routes);

  return (
    <div>
      {routing}
    </div>
  );
}

export default App;

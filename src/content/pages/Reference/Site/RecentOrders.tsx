import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { SiteData } from 'src/models/models';

function RecentOrders() {
  const sites: SiteData[] = [
    {
      id: 1,
      type: 'reference',
      name: 'OpenWeatherMap',
      description: 'Open Weather API',
      url: 'https://openweathermap.org/',
    },
    {
      id: 2,
      type: 'useful',
      name: 'Codepen',
      description: 'Execute HTML, CSS, JS Code',
      url: 'https://codepen.io/',
    }
  ];

  return (
    <Card>
      <RecentOrdersTable sites={sites} />
    </Card>
  );
}

export default RecentOrders;

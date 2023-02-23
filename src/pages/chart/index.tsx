import { Card, Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import './Chart.css';
import PageHeader from '../../components/commons/pageHeader';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartsPage = () => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Month',
        data: [12, 14, 9, 18, 24, 23, 44],
        backgroundColor: '#071D49D1',
      },
    ],
  };

  const reportData = {
    labels: ['Day Off', 'Vacation', 'Ill', 'Total Attended'],
    datasets: [
      {
        label: '# of employee',
        data: [4, 3, 2, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(138, 93, 36, 0.2)',
          'rgba(14, 59, 150, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(138, 93, 36, 1)',
          'rgba(14, 59, 150, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <PageHeader title='Charts' />
      <Row gutter={[20, 20]}>
        <Col sm={24} md={12}>
          <Card>
            <div className='chart-header'>
              <Typography.Title level={5}>Employees Joined</Typography.Title>
            </div>
            <Bar options={options} data={data} />
          </Card>
        </Col>
        <Col sm={24} md={8}>
          <Card>
            <div className='chart-header'>
              <Typography.Title level={5}>Daily Report</Typography.Title>
            </div>
            <div className='doughnut-container'>
              <div className='doughnut-box'>
                <Doughnut data={reportData} options={{ 
                    responsive: true, 
                    plugins: { 
                      legend: { 
                        position: 'bottom',
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ChartsPage;
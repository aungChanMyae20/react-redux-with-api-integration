import { useState, useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getDecadeReports, selectDecadeReports } from '../../features/reports/reportsSlice';
import { DecadeReportsProps } from '../../interfaces/reports';
import { shallowEqual } from 'react-redux';

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
  const dispatch = useAppDispatch();

  const [decades, setDecades] = useState({});
  const [labels, setLabels] = useState<Array<string>>([]);
  const [values, setValues] = useState<Array<string | number>>([])

  const decadeReports = async () => {
    await dispatch(getDecadeReports())
  }

  useEffect(() => {
    decadeReports()
  }, [])

  const decadeReportsRes = useAppSelector(selectDecadeReports, shallowEqual);

  useEffect(() => {
    if (decadeReportsRes) {
      setDecades(decadeReportsRes.data);
    }
  }, [decadeReportsRes])

  useEffect(() => {
    if (decades) {
      setLabels(Object.keys(decades))
      setValues(Object.values(decades))
    }
  }, [decades])

  const decadeReportOptions = {
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
  
  const decadeData = {
    labels,
    datasets: [
      {
        label: '# of employees',
        data: values,
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
            <Bar 
              options={decadeReportOptions} 
              data={decadeData} 
            />
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
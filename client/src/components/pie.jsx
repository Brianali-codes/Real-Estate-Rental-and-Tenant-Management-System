import React, { useEffect } from 'react';

const PieChart = () => {
  useEffect(() => {
    // Load the Google Charts library
    const loadGoogleCharts = () => {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = () => {
        // Initialize and draw the chart
        window.google.charts.load('current', { packages: ['corechart'] });
        window.google.charts.setOnLoadCallback(drawChart);
      };
      document.body.appendChild(script);
    };

    const drawChart = () => {
      const data = window.google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7],
      ]);

      const options = {
        title: 'My Daily Activities',
      };

      const chart = new window.google.visualization.PieChart(
        document.getElementById('piechart')
      );
      chart.draw(data, options);
    };

    loadGoogleCharts();
  }, []);

  return <div id="piechart" style={{ width: '900px', height: '500px' }} />;
};

export default PieChart;

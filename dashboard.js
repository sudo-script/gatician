     // Initialize all charts globally so we can access them later
     let expensesChart, caloriesChart, dailyExpensesChart, visitorsChart, pageViewsChart;

     // Function to initialize all charts
     function initializeCharts() {
         const darkMode = {
             backgroundColor: '#18181b',
             gridColor: '#27272a',
             textColor: '#9ca3af'
         };
     
         // Monthly Expenses Chart
         expensesChart = new Chart(document.getElementById('expensesChart'), {
             type: 'line',
             data: {
                 labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                 datasets: [{
                     label: 'Income',
                     data: [5200, 5400, 5300, 5500, 5200, 5600, 5300],
                     borderColor: '#3b82f6',
                     tension: 0.4,
                     borderWidth: 2,
                     fill: false
                 }, {
                     label: 'Expenses',
                     data: [5000, 5300, 5100, 5200, 5400, 5300, 5100],
                     borderColor: '#a855f7',
                     tension: 0.4,
                     borderWidth: 2,
                     fill: false
                 }]
             },
             options: {
                 responsive: true,
                 maintainAspectRatio: false,
                 plugins: {
                     legend: {
                         display: true,
                         position: 'bottom',
                         labels: {
                             color: darkMode.textColor,
                             usePointStyle: true,
                             padding: 20
                         }
                     }
                 },
                 scales: {
                     y: { display: false },
                     x: { display: false }
                 }
             }
         });
     
         // Calories Doughnut Chart
         caloriesChart = new Chart(document.getElementById('caloriesChart'), {
             type: 'doughnut',
             data: {
                 datasets: [{
                     data: [1623, 377],
                     backgroundColor: ['#3b82f6', '#27272a'],
                     borderWidth: 0
                 }]
             },
             options: {
                 responsive: true,
                 maintainAspectRatio: false,
                 cutout: '85%',
                 plugins: { legend: { display: false } }
             }
         });
     
         // Daily Expenses Bar Chart
         dailyExpensesChart = new Chart(document.getElementById('dailyExpensesChart'), {
             type: 'bar',
             data: {
                 labels: Array(12).fill(''),
                 datasets: [{
                     data: [5400, 5200, 4800, 5600, 5300, 4900, 4700, 5500, 5100, 4800, 5200, 4900],
                     backgroundColor: '#fff',
                     barThickness: 8
                 }, {
                     label: 'Previous',
                     data: [5200, 5000, 4600, 5400, 5100, 4700, 4500, 5300, 4900, 4600, 5000, 4700],
                     backgroundColor: '#27272a',
                     barThickness: 8
                 }]
             },
             options: {
                 responsive: true,
                 maintainAspectRatio: false,
                 plugins: { legend: { display: false } },
                 scales: {
                     y: { display: false },
                     x: { display: false }
                 }
             }
         });
     
         // Visitors Line Chart
         visitorsChart = new Chart(document.getElementById('visitorsChart'), {
             type: 'line',
             data: {
                 labels: Array(10).fill(''),
                 datasets: [{
                     data: [40000, 42000, 45000, 48000, 50000, 52000, 54000, 56000, 55000, 56404],
                     borderColor: '#fff',
                     tension: 0.4,
                     borderWidth: 2,
                     fill: {
                         target: 'origin',
                         above: 'rgba(255, 255, 255, 0.1)'
                     }
                 }]
             },
             options: {
                 responsive: true,
                 maintainAspectRatio: false,
                 plugins: { legend: { display: false } },
                 scales: {
                     y: { display: false },
                     x: { display: false }
                 }
             }
         });
     
         // Page Views Line Chart
         pageViewsChart = new Chart(document.getElementById('pageViewsChart'), {
             type: 'line',
             data: {
                 labels: Array(10).fill(''),
                 datasets: [{
                     data: [280000, 285000, 290000, 295000, 298000, 300000, 303000, 305000, 307000, 308874],
                     borderColor: '#a855f7',
                     tension: 0.4,
                     borderWidth: 2,
                     fill: {
                         target: 'origin',
                         above: 'rgba(168, 85, 247, 0.1)'
                     }
                 }]
             },
             options: {
                 responsive: true,
                 maintainAspectRatio: false,
                 plugins: { legend: { display: false } },
                 scales: {
                     y: { display: false },
                     x: { display: false }
                 }
             }
         });
     }
     
     // Modal functions
     function openModal() {
         document.getElementById('dataModal').style.display = 'block';
         document.body.style.overflow = 'hidden';
     }
     
     function closeModal() {
         document.getElementById('dataModal').style.display = 'none';
         document.body.style.overflow = 'auto';
     }
     
     // Handle form submission
     function handleFormSubmit(event) {
         event.preventDefault();
         const formData = new FormData(event.target);
         
         // Update expenses chart with new income and expenses
         const income = parseFloat(formData.get('income'));
         const expenses = parseFloat(formData.get('expenses'));
         
         expensesChart.data.datasets[0].data.shift();
         expensesChart.data.datasets[0].data.push(income);
         expensesChart.data.datasets[1].data.shift();
         expensesChart.data.datasets[1].data.push(expenses);
         expensesChart.update();
     
         // Update calories chart
         const calories = parseFloat(formData.get('calories'));
         const remainingCalories = 2000 - calories;
         caloriesChart.data.datasets[0].data = [calories, remainingCalories];
         caloriesChart.update();
     
         // Update health stats display
         document.querySelector('.calories-value').textContent = `${calories}/2000 kcal`;
         document.querySelector('.steps-value').textContent = `${formData.get('steps')}/10,000`;
         document.querySelector('.exercise-value').textContent = `${formData.get('exercise')}/120min`;
     
         // Update savings progress bars
         updateSavingProgress('house', formData.get('houseSaving'), 150000);
         updateSavingProgress('laptop', formData.get('laptopSaving'), 1150);
         updateSavingProgress('trip', formData.get('tripSaving'), 15000);
         updateSavingProgress('scooter', formData.get('scooterSaving'), 350);
     
         // Update visitors and page views
         const visitors = parseFloat(formData.get('visitors'));
         const pageViews = parseFloat(formData.get('pageViews'));
         
         visitorsChart.data.datasets[0].data.shift();
         visitorsChart.data.datasets[0].data.push(visitors);
         visitorsChart.update();
         
         pageViewsChart.data.datasets[0].data.shift();
         pageViewsChart.data.datasets[0].data.push(pageViews);
         pageViewsChart.update();
     
         // Close modal after submission
         closeModal();
         event.target.reset();
     }
     
     // Update saving progress bars
     function updateSavingProgress(type, current, total) {
         const percentage = (current / total) * 100;
         const progressBar = document.querySelector(`#${type}Progress .progress-fill`);
         const amountText = document.querySelector(`#${type}Progress .progress-amount`);
         
         progressBar.style.width = `${percentage}%`;
         amountText.textContent = `$${current.toLocaleString()} of $${total.toLocaleString()}`;
     }
     
     // Initialize everything when the page loads
     document.addEventListener('DOMContentLoaded', () => {
         initializeCharts();
         
         // Close modal when clicking outside
         window.onclick = function(event) {
             const modal = document.getElementById('dataModal');
             if (event.target === modal) {
                 closeModal();
             }
         }
     });
             const darkMode = {
                 backgroundColor: '#18181b',
                 gridColor: '#27272a',
                 textColor: '#9ca3af'
             };
     
             // Monthly Expenses Chart
             new Chart(document.getElementById('expensesChart'), {
                 type: 'line',
                 data: {
                     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                     datasets: [{
                         label: 'Income',
                         data: [5200, 5400, 5300, 5500, 5200, 5600, 5300],
                         borderColor: '#3b82f6',
                         tension: 0.4,
                         borderWidth: 2,
                         fill: false
                     }, {
                         label: 'Expenses',
                         data: [5000, 5300, 5100, 5200, 5400, 5300, 5100],
                         borderColor: '#a855f7',
                         tension: 0.4,
                         borderWidth: 2,
                         fill: false
                     }]
                 },
                 options: {
                     responsive: true,
                     maintainAspectRatio: false,
                     plugins: {
                         legend: {
                             display: true,
                             position: 'bottom',
                             labels: {
                                 color: darkMode.textColor,
                                 usePointStyle: true,
                                 padding: 20
                             }
                         }
                     },
                     scales: {
                         y: { display: false },
                         x: { display: false }
                     }
                 }
             });
     
             // Calories Doughnut Chart
             new Chart(document.getElementById('caloriesChart'), {
                 type: 'doughnut',
                 data: {
                     datasets: [{
                         data: [1623, 377],
                         backgroundColor: ['#3b82f6', '#27272a'],
                         borderWidth: 0
                     }]
                 },
                 options: {
                     responsive: true,
                     maintainAspectRatio: false,
                     cutout: '85%',
                     plugins: { legend: { display: false } }
                 }
             });
     
             // Daily Expenses Bar Chart
             new Chart(document.getElementById('dailyExpensesChart'), {
                 type: 'bar',
                 data: {
                     labels: Array(12).fill(''),
                     datasets: [{
                         data: [5400, 5200, 4800, 5600, 5300, 4900, 4700, 5500, 5100, 4800, 5200, 4900],
                         backgroundColor: '#fff',
                         barThickness: 8
                     }, {
                         data: [5200, 5000, 4600, 5400, 5100, 4700, 4500, 5300, 4900, 4600, 5000, 4700],
                         backgroundColor: '#27272a',
                         barThickness: 8
                     }]
                 },
                 options: {
                     responsive: true,
                     maintainAspectRatio: false,
                     plugins: { legend: { display: false } },
                     scales: {
                         y: { display: false },
                         x: { display: false }
                     }
                 }
             });
     
             // Visitors Line Chart
             new Chart(document.getElementById('visitorsChart'), {
                 type: 'line',
                 data: {
                     labels: Array(10).fill(''),
                     datasets: [{
                         data: [40000, 42000, 45000, 48000, 50000, 52000, 54000, 56000, 55000, 56404],
                         borderColor: '#fff',
                         tension: 0.4,
                         borderWidth: 2,
                         fill: {
                             target: 'origin',
                             above: 'rgba(255, 255, 255, 0.1)'
                         }
                     }]
                 },
                 options: {
                     responsive: true,
                     maintainAspectRatio: false,
                     plugins: { legend: { display: false } },
                     scales: {
                         y: { display: false },
                         x: { display: false }
                     }
                 }
             });
     
             // Page Views Line Chart
             new Chart(document.getElementById('pageViewsChart'), {
                 type: 'line',
                 data: {
                     labels: Array(10).fill(''),
                     datasets: [{
                         data: [280000, 285000, 290000, 295000, 298000, 300000, 303000, 305000, 307000, 308874],
                         borderColor: '#a855f7',
                         tension: 0.4,
                         borderWidth: 2,
                         fill: {
                             target: 'origin',
                             above: 'rgba(168, 85, 247, 0.1)'
                         }
                     }]
                 },
                 options: {
                     responsive: true,
                     maintainAspectRatio: false,
                     plugins: { legend: { display: false } },
                     scales: {
                         y: { display: false },
                         x: { display: false }
                     }
                 }
             });
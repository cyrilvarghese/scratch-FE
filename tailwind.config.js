/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    // Add other content sources as needed
  ],
  theme: {
    extend: {
      colors: {
        'enterprise-blue': {
          DEFAULT: '#007ace',
          '50': '#f0faff',
          '100': '#e0f2fe',
          '200': '#b0d8fd',
          '300': '#80bdfc',
          '400': '#509ffb',
          '500': '#007ace',
          '600': '#005ea6',
          '700': '#003d75',
          '800': '#002254',
          '900': '#000e34',
        },
        'error': {
          DEFAULT: '#ff4757',
          '50': '#ffebee',
          '100': '#ffcdd2',
          '200': '#ef9a9a',
          '300': '#e57373',
          '400': '#ef5350',
          '500': '#f44336',
          '600': '#e53935',
          '700': '#d32f2f',
          '800': '#c62828',
          '900': '#b71c1c',
        },
        'warning': {
          DEFAULT: '#ffa502',
          '50': '#fff3e0',
          '100': '#ffe0b2',
          '200': '#ffcc80',
          '300': '#ffb74d',
          '400': '#ffa726',
          '500': '#ff9800',
          '600': '#fb8c00',
          '700': '#f57c00',
          '800': '#ef6c00',
          '900': '#e65100',
        },
        'information': {
          DEFAULT: '#1e90ff',
          '50': '#e3f2fd',
          '100': '#bbdefb',
          '200': '#90caf9',
          '300': '#64b5f6',
          '400': '#42a5f5',
          '500': '#2196f3',
          '600': '#1e88e5',
          '700': '#1976d2',
          '800': '#1565c0',
          '900': '#0d47a1',
        },
        'success': {
          DEFAULT: '#2ed573',
          '50': '#e8f5e9',
          '100': '#c8e6c9',
          '200': '#a5d6a7',
          '300': '#81c784',
          '400': '#66bb6a',
          '500': '#4caf50',
          '600': '#43a047',
          '700': '#388e3c',
          '800': '#2e7d32',
          '900': '#1b5e20',
        },
        'neutral': {
          '50': '#f4f8fb', // Very light neutral
          '100': '#e9f1f7',
          '200': '#d3e3ef',
          '300': '#bdcde7',
          '400': '#a7b7df',
          '500': '#91a1d7', // Neutral base (gray with the hue of primary color)
          '600': '#7b8bcf',
          '700': '#6575c7',
          '800': '#4f5fbf',
          '900': '#3949b7'  // Dark neutral
        },
      },
    },
  },
  plugins: [],
}


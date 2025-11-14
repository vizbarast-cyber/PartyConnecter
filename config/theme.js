// Dark Purple Glowy Theme
export const theme = {
  colors: {
    primary: '#9D4EDD', // Purple
    primaryDark: '#7B2CBF', // Darker purple
    primaryLight: '#C77DFF', // Lighter purple
    secondary: '#E0AAFF', // Light purple
    accent: '#FF6B9D', // Pink accent
    background: '#0A0A0F', // Very dark background
    surface: '#1A1A2E', // Dark surface
    surfaceLight: '#2A2A3E', // Lighter surface
    text: '#FFFFFF', // White text
    textSecondary: '#B8B8D1', // Light gray text
    textMuted: '#6B6B8A', // Muted text
    border: '#3A3A4E', // Border color
    error: '#FF6B6B', // Error red
    success: '#4ECDC4', // Success teal
    warning: '#FFD93D', // Warning yellow
    info: '#6C5CE7', // Info purple
    
    // Glow effects
    glow: {
      primary: '#9D4EDD',
      secondary: '#E0AAFF',
      accent: '#FF6B9D',
    },
  },
  
  gradients: {
    primary: ['#9D4EDD', '#7B2CBF'],
    secondary: ['#E0AAFF', '#C77DFF'],
    accent: ['#FF6B9D', '#E63946'],
    background: ['#0A0A0F', '#1A1A2E'],
  },
  
  shadows: {
    glow: {
      shadowColor: '#9D4EDD',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 10,
    },
    glowStrong: {
      shadowColor: '#9D4EDD',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 20,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 999,
  },
  
  typography: {
    h1: {
      fontSize: 42,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    h2: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    body: {
      fontSize: 16,
      color: '#B8B8D1',
    },
    caption: {
      fontSize: 14,
      color: '#6B6B8A',
    },
  },
};

export default theme;


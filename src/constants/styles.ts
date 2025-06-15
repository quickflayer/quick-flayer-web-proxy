const styles = {
  transition: {
    modeTransition: 'background-color 0.6s ease-in-out, color 0.6s ease-in-out',
  },

  resetIconStyle: {
    svg: {
      transform: 'rotate(0deg)',
      transition: 'transform 0.6s ease-in-out',
    },
    ':focus': {
      svg: {
        animation: 'rotateAnimation 0.6s ease-in-out',
      },
    },
    '@keyframes rotateAnimation': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(-720deg)' },
    },
  },
};

export default styles;

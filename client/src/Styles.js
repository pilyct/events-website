export const themeStyles = (darkTheme) => ({
  backgroundColor: darkTheme ? '#1f1f2f' : '#fff',
  color: darkTheme ? '#fff' : '#1f1f1f',
  boxShadow: darkTheme ? 'rgba(5, 5, 5, 0.9) 0px 2px 6px 2px' : 'rgba(99, 99, 99, 0.3) 0px 2px 8px 0px',
  fill: darkTheme ? '#fff' : '#1f1f1f',
});

export const appBackgroundStyles = (darkTheme) => ({
  backgroundColor: darkTheme ? '#111' : '#eaeaea',
});

export const eventBackgroundStyles = (darkTheme) => ({
  backgroundColor: darkTheme ? '#6488ea' : '#1c1c1c',
});

export const bannerStyles = (darkTheme) => ({
  backgroundColor: darkTheme ? '#eac664' : '#e74e77',
  color: darkTheme ? '#000' : '#fff',
});

export const deleteButtonStyle = (darkTheme) => ({
  fill: darkTheme ? '#fff' : '#1f1f1f',
  stroke: 'none',
});

export const editButtonStyle = (darkTheme) => ({
  stroke: darkTheme ? '#fff' : '#1f1f1f',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'none',
});

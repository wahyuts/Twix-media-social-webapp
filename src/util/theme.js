// const themeFile = (theme) => {
//   return({
export default {
    palette:{
        primary:{
          light:'#ec407a',
          main:'#ec407a',
          dark:'#c2185b',
          contastText:'#fff'
        },
        secondary:{
          light:'#9575cd',
          main:'#673ab7',
          dark:'#4527a0',
          contastText:'#fff'
        }
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 767,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },

      invisibleSeperator:{
        border: "none",
        margin: 4
      },
      visibleSeperator:{
          width:'100%',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          marginBottom: 20
      },
      typography: {
        useNextVariants: true
      }
  // })
}

// export default themeFile;
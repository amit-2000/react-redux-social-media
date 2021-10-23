import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
function Page404(props) {
  return (
    <div>
      {/* <h2>page not found!</h2> */}
      <Box width="50%" m={10}>
        <Alert severity="info" variant="outlined">
          You are on the Wrong route !
        </Alert>
      </Box>
    </div>
  );
}

export default Page404;

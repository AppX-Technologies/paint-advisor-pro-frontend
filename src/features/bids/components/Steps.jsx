import { Box, Chip } from '@mui/material';
import React, { useState } from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const Steps = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  return (
    <Box sx={{ width: '100%', border: '1px solid lightgray', borderRadius: '40px' }} ml={3} mt={1}>
      <Box p={3}>
        {Array(10)
          .fill(0)
          .map((_, idx) => {
            return (
              <>
                {idx !== 0 && (
                  <ArrowCircleRightOutlinedIcon sx={{ width: '15px', height: '15px' }} mt={1} />
                )}
                <Chip
                  label={`Chip Filled (${idx + 1})`}
                  sx={{ margin: '5px' }}
                  size='small'
                  variant={selectedStep === idx ? 'filled' : 'outlined'}
                  onClick={() => setSelectedStep(idx)}
                />
              </>
            );
          })}
      </Box>
    </Box>
  );
};

export default Steps;

import { Box, Chip } from '@mui/material';
import React from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const Steps = ({ selectedStep, onSelctedStepChange }) => {
  return (
    <Box sx={{ width: '100%', border: '1px solid lightgray', borderRadius: '15px' }} ml={1}>
      <Box p={1}>
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
                  sx={{ margin: '1px 2px 2px 2px' }}
                  size='small'
                  variant={selectedStep === idx ? 'filled' : 'outlined'}
                  onClick={() => onSelctedStepChange(idx)}
                />
              </>
            );
          })}
      </Box>
    </Box>
  );
};

export default Steps;

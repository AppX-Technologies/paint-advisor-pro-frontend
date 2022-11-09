import { Box, Chip } from '@mui/material';
import React from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { bidsStages } from '../../../helpers/bidsStages';
import { convertStringCase } from '../../../helpers/stringCaseConverter';

const Steps = ({ selectedStep, onSelectedStepChange }) => {
  return (
    <Box sx={{ border: '1px solid lightgray', borderRadius: '15px' }} ml={1} bgcolor='white'>
      <Box p={1}>
        {bidsStages.map((bidStage, idx) => {
          return (
            <>
              {idx !== 0 && (
                <ArrowCircleRightOutlinedIcon sx={{ width: '15px', height: '15px' }} mt={1} />
              )}
              <Chip
                label={convertStringCase(bidStage)}
                sx={{ margin: '3px 2px 2px 2px' }}
                size='small'
                variant={selectedStep === bidStage ? 'filled' : 'outlined'}
                onClick={() => onSelectedStepChange(bidStage)}
              />
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export default Steps;

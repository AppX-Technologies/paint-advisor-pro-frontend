import { Box, Card, Chip } from '@mui/material';
import React from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { convertStringCase } from '../../../helpers/stringCaseConverter';
import { BIDS_STAGES } from '../../../helpers/contants';

const Steps = ({ selectedStep, onSelectedStepChange }) => {
  return (
    <Card>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
        bgcolor='white'>
        <Box p={1}>
          {BIDS_STAGES.map((bidStage, idx) => {
            return (
              <>
                {idx !== 0 && (
                  <ArrowCircleRightOutlinedIcon sx={{ width: '15px', height: '15px' }} style={{marginBottom:'-4px'}} />
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
    </Card>
  );
};

export default Steps;

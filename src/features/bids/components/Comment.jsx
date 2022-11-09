import { Box, Divider, TextareaAutosize, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import React, { useState } from 'react';

const Comment = () => {
  return (
    <>
      <Box>
        <Typography sx={{ mt: 1, flex: 1, fontSize: '16px', ml: 3 }} variant='h6' component='div'>
          Comments
        </Typography>
        {Array(5)
          .fill('abc')
          .map((_, idx) => {
            return (
              <>
                <Box
                  sx={{
                    mt: idx === 0 ? 1 : 3,
                    ml: 1,
                    border: '1px solid lightgray',
                    borderRadius: '20px'
                  }}>
                  <Typography
                    sx={{
                      ml: 1,
                      mt: 1,
                      flex: 1,
                      fontSize: '16px',
                      fontWeight: '800',
                      color: '#F66E8D'
                    }}
                    variant='h6'
                    component='div'>
                    User Name
                  </Typography>
                  <Typography
                    sx={{ ml: 1, mb: 1, flex: 1, fontSize: '14px' }}
                    variant='h3'
                    component='div'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta et quod, quo
                    odit, quae, voluptas velit numquam aspernatur eligendi quaerat cum eveniet
                    ducimus. Exercitationem obcaecati sit voluptas, doloribus praesentium eos.
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    float: 'right',
                    fontSize: '12px',
                    color: 'gray',
                    marginRight: '10px',
                    marginTop: '5px'
                  }}
                  variant='h2'
                  component='div'>
                  On November 11th 2022,12:34 pm
                </Typography>
              </>
            );
          })}
        <TextareaAutosize
          minRows={4}
          aria-label='maximum height'
          placeholder='Type your comment here'
          style={{
            width: '98.8%',
            borderRadius: '15px',
            marginLeft: '11px',
            marginTop: '5px',
            border: '1px solid lightgray'
          }}
        />
        <Button sx={{ ml: 1, mt: 1 }} variant='contained' color='primary'>
          Comment
        </Button>
      </Box>
    </>
  );
};

export default Comment;

import { Box, Divider, TextareaAutosize, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import React, { useState } from 'react';

const Comment = () => {
  return (
    <>
      <Divider />
      <Box>
        <Typography sx={{ ml: 2, mt: 1, flex: 1, fontSize: '16px' }} variant='h6' component='div'>
          Comments
        </Typography>
        {Array(5)
          .fill('abc')
          .map(() => {
            return (
              <>
                <Box sx={{ mt: 2, ml: 2, border: '1px solid lightgray', borderRadius: '20px' }}>
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
                  sx={{ float: 'right', fontSize: '13px', color: 'gray' }}
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
            width: '99%',
            borderRadius: '20px',
            marginLeft: '10px',
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

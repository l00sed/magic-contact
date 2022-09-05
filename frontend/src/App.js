import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './assets/styles/App.css';
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: 'center',
  },
  imgBox: {
    maxWidth: "80%",
    maxHeight: "80%",
    margin: "10px"
  },
  img: {
    height: "inherit",
    maxWidth: "inherit",
  },
  input: {
    display: "none"
  }
}));

function App() {
  const classes = useStyles();
  const [source, setSource] = useState("");
  const formData = new FormData();
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const tempURL = URL.createObjectURL(file);
        setSource(tempURL);
        formData.append('name', 'File');
        formData.append('image', file);
        /*
        // Display the key/value pairs
        for (var pair of formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]);
        }
        */
        // Upload the image
        axios({
          method: 'POST',
          url: 'http://192.168.0.104:8000/api/upload/',
          data: formData,
          headers: {
            'content-type': 'multipart/form-data'
          },
        }).then((res) => {
          console.log(res);
        });
      }
    }
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <h5>Capture your image</h5>
          {
          source &&
          <Box display="flex" justifyContent="center" border={1} className={classes.imgBox}>
            <img src={source} alt={"snap"} className={classes.img}></img>
          </Box>
          }
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            capture="environment"
            onChange={(e) => handleCapture(e.target)}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCameraRoundedIcon fontSize="large" color="primary" />
            </IconButton>
          </label>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

